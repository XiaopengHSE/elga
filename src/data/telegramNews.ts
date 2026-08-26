export interface TelegramMessage {
  id: string;
  date: string;
  time: string;
  from: string;
  text: { ru: string; zh: string; en: string };
  photos: { src: string; thumb: string }[];
  videos: { title: string; description: string; status: string }[];
  reactions: { emoji: string; count: number }[];
}

export interface TelegramNewsData {
  channel: string;
  description: string;
  messages: TelegramMessage[];
}

import newsJson from './telegramNews.json';
export const telegramNews: TelegramNewsData = newsJson as TelegramNewsData;
