export interface LLMMessage {
  role: 'user' | 'model';
  content: string;
}

export interface LLMStreamCallbacks {
  onChunk: (chunk: string) => void;
  onDone: () => void;
  onError: (error: Error) => void;
}

const API_BASE_URL = 'https://api.moleapi.com/v1beta';
const API_KEY = 'sk-TpMNyEyLh6CrDDAFPU4nQSfkgrro9jZVAUuDlHDqmICjm6fY';
const MODEL = 'gemini-3.6-flash';

function getSystemPrompt(lang: string): string {
  const base = `You are the AI Smart Assistant for ELGA Group, a major Russian coking coal producer headquartered in Dalian, China. You help users with questions about:

- ELGAUGOL LLC: Russia's largest coking coal mine, JORC reserves 2.2 billion tonnes, annual capacity 45 Mt/y, located in Sakha Republic (Yakutia), southeastern Russia. Key specs: sulfur <0.21%, phosphorus <0.006%, vitrinite 97.3-97.6%, G index 95, fluidity >20,000 dd, ash ~10.2% for Premium grade, calorific value ~7,180 kcal/kg.
- ELGA-ROAD LLC: 360km private railway from Ulak to Elga, capacity 30 Mt/y, connecting the mine to the Baikal-Amur Mainline (BAM).
- ELGA-TRANS LLC: Railway maintenance and coal transport operations along the Ulak-Elga line.
- ELGALOGISTICS LLC: Transport and logistics handling domestic, export, import, and transit shipments. Primary export markets: China, Japan, South Korea, India, Taiwan.
- Pacific Railway & Port Elga: Export infrastructure on the Sea of Okhotsk in Khabarovsk Krai, 30 Mt/y throughput, deep-water berths for 100,000-ton bulk carriers.
- Smart coal blending: Two main products — Elga Premium (10% ash) and Elga Selective (16% ash). The high fluidity (>20,000 dd) allows cost-effective blending while maintaining excellent coking properties.
- Logistics distances from Elga mine: Vanino Port ~2,018km, Vostochny/Posiet ~2,500km, Tianjin/China ~3,800-3,900km, Busan ~2,700km, Tokyo/Yokohama ~3,500km.
- Shipping time to China: ~22-28 days (comparable to Australian coal at 25-35 days).
- The Dalian office (大连埃尔加国际贸易有限公司) serves as ELGA Group's China headquarters in the Dalian Bonded Zone.

Answer concisely and accurately. If asked about topics completely unrelated to ELGA Group's coal mining, railway, logistics, or export business, politely decline and suggest business-related topics. Respond in the same language as the user's question.`;

  if (lang === 'zh') {
    return base.replace('Respond in the same language as the user\'s question.', '请用中文回答用户的问题。保持简洁准确。');
  }
  if (lang === 'ru') {
    return base.replace('Respond in the same language as the user\'s question.', 'Отвечайте на русском языке. Будьте краткими и точными.');
  }
  return base;
}

function buildGeminiContents(
  history: LLMMessage[],
  systemPrompt: string
): { contents: Array<{ role: string; parts: Array<{ text: string }> }>; systemInstruction?: { parts: Array<{ text: string }> } } {
  const contents = history.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  return {
    contents,
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
  };
}

function extractTextFromChunk(data: unknown): string {
  if (typeof data !== 'object' || data === null) return '';
  const d = data as Record<string, unknown>;
  const candidates = d.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return '';
  const candidate = candidates[0] as Record<string, unknown>;
  if (candidate.finishReason) return '';
  const content = candidate.content as Record<string, unknown> | undefined;
  if (!content) return '';
  const parts = content.parts as Array<Record<string, unknown>> | undefined;
  if (!Array.isArray(parts)) return '';

  let text = '';
  for (const part of parts) {
    if (typeof part.text === 'string') {
      text += part.text;
    }
  }
  return text;
}

function isStreamDone(data: unknown): boolean {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  const candidates = d.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return false;
  const candidate = candidates[0] as Record<string, unknown>;
  return !!candidate.finishReason;
}

export async function streamChatCompletion(
  messages: LLMMessage[],
  lang: string,
  callbacks: LLMStreamCallbacks,
  abortSignal?: AbortSignal
): Promise<void> {
  const systemPrompt = getSystemPrompt(lang);
  const body = buildGeminiContents(messages, systemPrompt);

  const url = `${API_BASE_URL}/models/${MODEL}:streamGenerateContent?alt=sse`;
  console.log('[streamChatCompletion] URL:', url);
  console.log('[streamChatCompletion] request body:', JSON.stringify(body, null, 2));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      ...body,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
    signal: abortSignal,
  });

  if (!response.ok) {
    let errorText = '';
    try {
      const errJson = await response.json();
      errorText = JSON.stringify(errJson);
    } catch {
      errorText = await response.text().catch(() => 'Unknown error');
    }
    console.error('[streamChatCompletion] API error:', response.status, errorText);
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  console.log('[streamChatCompletion] response ok, status:', response.status);

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === 'data: [DONE]') continue;
        if (!trimmed.startsWith('data: ')) continue;

        const jsonStr = trimmed.slice(6);
        try {
          const parsed = JSON.parse(jsonStr);
          console.log('[streamChatCompletion] SSE chunk:', JSON.stringify(parsed));
          if (isStreamDone(parsed)) {
            console.log('[streamChatCompletion] stream done (finishReason)');
            callbacks.onDone();
            return;
          }
          const text = extractTextFromChunk(parsed);
          if (text) {
            callbacks.onChunk(text);
          }
        } catch {
          // Ignore malformed JSON in stream
        }
      }
    }

    // Flush remaining buffer
    if (buffer.trim()) {
      const trimmed = buffer.trim();
      if (trimmed.startsWith('data: ') && trimmed !== 'data: [DONE]') {
        const jsonStr = trimmed.slice(6);
        try {
          const parsed = JSON.parse(jsonStr);
          console.log('[streamChatCompletion] flush chunk:', JSON.stringify(parsed));
          if (isStreamDone(parsed)) {
            callbacks.onDone();
            return;
          }
          const text = extractTextFromChunk(parsed);
          if (text) callbacks.onChunk(text);
        } catch {
          // Ignore
        }
      }
    }

    console.log('[streamChatCompletion] stream finished normally');
    callbacks.onDone();
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      console.log('[streamChatCompletion] aborted by user');
      callbacks.onDone();
      return;
    }
    console.error('[streamChatCompletion] stream error:', err);
    callbacks.onError(err as Error);
  } finally {
    reader.releaseLock();
  }
}

export async function chatCompletion(
  messages: LLMMessage[],
  lang: string,
  abortSignal?: AbortSignal
): Promise<string> {
  const systemPrompt = getSystemPrompt(lang);
  const body = buildGeminiContents(messages, systemPrompt);

  const url = `${API_BASE_URL}/models/${MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      ...body,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
    signal: abortSignal,
  });

  if (!response.ok) {
    let errorText = '';
    try {
      const errJson = await response.json();
      errorText = JSON.stringify(errJson);
    } catch {
      errorText = await response.text().catch(() => 'Unknown error');
    }
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const candidates = data.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return '';
  const content = candidates[0]?.content;
  if (!content) return '';
  const parts = content.parts;
  if (!Array.isArray(parts)) return '';

  let text = '';
  for (const part of parts) {
    if (typeof part.text === 'string') {
      text += part.text;
    }
  }
  return text;
}
