import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { presetQuestions, chatResponses, type ChatMessage } from '../data/chatbotResponses';
import { useI18n } from '../i18n/context';
import MarkdownRenderer from './MarkdownRenderer';
import { streamChatCompletion, type LLMMessage } from '../services/llmService';

export default function ChatbotTab() {
  const { t, lang } = useI18n();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: t('chatWelcome'),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const streamingContentRef = useRef('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update welcome message when language changes and chat is empty
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === 'assistant') {
        return [{ role: 'assistant', content: t('chatWelcome') }];
      }
      return prev;
    });
  }, [lang, t]);

  const buildHistory = (currentMessages: ChatMessage[]): LLMMessage[] => {
    // Skip the welcome message, include only real conversation
    // Map 'assistant' -> 'model' for Gemini API
    return currentMessages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({
        role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
        content: m.content,
      }));
  };

  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setIsTyping(false);
  }, []);

  const callLLM = useCallback(
    async (userContent: string, currentMessages: ChatMessage[]) => {
      console.log('[callLLM] userContent:', userContent);
      setError(null);
      setIsTyping(true);
      setIsStreaming(true);

      // Add user message
      const withUser = [...currentMessages, { role: 'user' as const, content: userContent }];
      setMessages(withUser);

      // Add empty assistant placeholder
      const withAssistant = [...withUser, { role: 'assistant' as const, content: '' }];
      setMessages(withAssistant);

      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      streamingContentRef.current = '';

      try {
        const history = buildHistory(withUser);
        console.log('[callLLM] history:', JSON.stringify(history));
        await streamChatCompletion(
          history,
          lang,
          {
            onChunk: (chunk) => {
              streamingContentRef.current += chunk;
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last.role === 'assistant') {
                  last.content = streamingContentRef.current;
                }
                return updated;
              });
            },
            onDone: () => {
              console.log('[callLLM] stream done');
              setIsTyping(false);
              setIsStreaming(false);
              abortControllerRef.current = null;
            },
            onError: (err) => {
              console.error('[callLLM] stream error:', err.message);
              setIsTyping(false);
              setIsStreaming(false);
              abortControllerRef.current = null;
              setError(err.message);
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last.role === 'assistant') {
                  last.content = streamingContentRef.current || t('chatError');
                }
                return updated;
              });
            },
          },
          abortController.signal
        );
      } catch (err) {
        console.error('[callLLM] catch error:', err);
        setIsTyping(false);
        setIsStreaming(false);
        abortControllerRef.current = null;
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === 'assistant') {
            last.content = t('chatError');
          }
          return updated;
        });
      }
    },
    [lang, t]
  );

  // Simulate typing effect for preset responses (local, fast)
  const simulateTyping = (text: string, callback: () => void) => {
    setIsTyping(true);
    const chars = text.split('');
    let currentText = '';
    let index = 0;

    const typeChar = () => {
      if (index < chars.length) {
        currentText += chars[index];
        index++;
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === 'assistant') {
            lastMsg.content = currentText;
          }
          return newMessages;
        });
        setTimeout(typeChar, 12);
      } else {
        setIsTyping(false);
        callback();
      }
    };

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    setTimeout(typeChar, 300);
  };

  const handlePresetSend = useCallback(
    (responseKey: string, displayLabel: string) => {
      if (isTyping || isStreaming) return;

      console.log('[handlePresetSend] responseKey:', responseKey);
      setMessages((prev) => [...prev, { role: 'user', content: displayLabel }]);

      const response =
        chatResponses[lang]?.[responseKey] ||
        chatResponses['zh']?.[responseKey] ||
        t('genericResponse');

      console.log('[handlePresetSend] response length:', response.length);

      setTimeout(() => {
        simulateTyping(response, () => {});
      }, 400);
    },
    [isTyping, isStreaming, lang, t]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping || isStreaming) return;

    const question = inputValue.trim();
    setInputValue('');
    console.log('[handleSubmit] question:', question);

    // Check if input exactly matches a preset label (case-insensitive)
    const matchedPreset = presetQuestions.find((p) => {
      const label = t(p.labelKey as any);
      return question.toLowerCase() === label.toLowerCase();
    });

    if (matchedPreset) {
      console.log('[handleSubmit] matched preset:', matchedPreset.id);
      handlePresetSend(matchedPreset.responseKey, t(matchedPreset.labelKey as any));
      return;
    }

    // Otherwise, call LLM
    console.log('[handleSubmit] calling LLM');
    callLLM(question, messages);
  };

  const statusText = isStreaming
    ? t('chatThinking')
    : isTyping
      ? t('chatTyping')
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-180px)] flex flex-col">
      {/* Preset Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-amber-accent" size={16} />
          <span className="text-sm font-medium text-gray-300">{t('chatQuickQuestions')}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presetQuestions.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSend(preset.responseKey, t(preset.labelKey as any))}
              disabled={isTyping || isStreaming}
              className="px-3 py-1.5 rounded-full bg-navy-700 border border-navy-600 text-sm text-gray-300 hover:border-amber-accent/50 hover:text-amber-accent transition-colors disabled:opacity-50"
            >
              {t(preset.labelKey as any)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"
          >
            {t('chatConnectionError')}: {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-cyan-accent/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-cyan-accent" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  message.role === 'user'
                    ? 'bg-amber-accent/20 text-amber-accent border border-amber-accent/30'
                    : 'bg-navy-700 text-gray-200 border border-navy-600'
                }`}
              >
                {message.role === 'assistant' && isTyping && index === messages.length - 1 && !isStreaming ? (
                  <span className="whitespace-pre-wrap">{message.content}</span>
                ) : (
                  <MarkdownRenderer text={message.content} />
                )}
                {message.role === 'assistant' && isTyping && index === messages.length - 1 && !isStreaming && (
                  <span className="typewriter-cursor" />
                )}
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-amber-accent/20 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-amber-accent" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Status indicator */}
        {statusText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-gray-500 ml-11"
          >
            <svg className="animate-spin h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {statusText}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('chatPlaceholder')}
          disabled={isTyping || isStreaming}
          className="flex-1 px-4 py-3 rounded-xl bg-navy-700 border border-navy-600 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent/50 transition-colors disabled:opacity-50"
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={handleStop}
            className="px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors"
            title={t('chatStop')}
          >
            <div className="w-[18px] h-[18px] bg-current rounded-sm" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isTyping || !inputValue.trim()}
            className="px-4 py-3 rounded-xl bg-cyan-accent/20 border border-cyan-accent/30 text-cyan-accent hover:bg-cyan-accent/30 transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        )}
      </form>
    </div>
  );
}
