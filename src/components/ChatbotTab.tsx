import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { presetQuestions, chatResponses, type ChatMessage } from '../data/chatbotResponses';
import { useI18n } from '../i18n/context';
import MarkdownRenderer from './MarkdownRenderer';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === 'assistant') {
        return [{ role: 'assistant', content: t('chatWelcome') }];
      }
      return prev;
    });
  }, [lang, t]);

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
        setTimeout(typeChar, 15);
      } else {
        setIsTyping(false);
        callback();
      }
    };

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    setTimeout(typeChar, 300);
  };

  const handleSend = useCallback((questionKey: string) => {
    if (isTyping) return;

    const questionLabel = t(questionKey as any);
    setMessages((prev) => [...prev, { role: 'user', content: questionLabel }]);

    const response = chatResponses[lang]?.[questionKey] || chatResponses['zh']?.[questionKey] || t('genericResponse');

    setTimeout(() => {
      simulateTyping(response, () => {});
    }, 500);
  }, [isTyping, lang, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    setMessages((prev) => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');

    setTimeout(() => {
      simulateTyping(t('genericResponse'), () => {});
    }, 500);
  };

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
              onClick={() => handleSend(preset.id)}
              disabled={isTyping}
              className="px-3 py-1.5 rounded-full bg-navy-700 border border-navy-600 text-sm text-gray-300 hover:border-amber-accent/50 hover:text-amber-accent transition-colors disabled:opacity-50"
            >
              {t(preset.labelKey as any)}
            </button>
          ))}
        </div>
      </motion.div>

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
                {message.role === 'assistant' && isTyping && index === messages.length - 1 ? (
                  <span className="whitespace-pre-wrap">{message.content}</span>
                ) : (
                  <MarkdownRenderer text={message.content} />
                )}
                {message.role === 'assistant' && isTyping && index === messages.length - 1 && (
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('chatPlaceholder')}
          disabled={isTyping}
          className="flex-1 px-4 py-3 rounded-xl bg-navy-700 border border-navy-600 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-accent/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isTyping || !inputValue.trim()}
          className="px-4 py-3 rounded-xl bg-cyan-accent/20 border border-cyan-accent/30 text-cyan-accent hover:bg-cyan-accent/30 transition-colors disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
