import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Calendar, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { telegramNews } from '../data/telegramNews';
import { useI18n } from '../i18n/context';

interface NewsMessage {
  id: string;
  date: string;
  time: string;
  from: string;
  text: { ru: string; zh: string; en: string };
  photos: { src: string; thumb: string }[];
  videos: { title: string; description?: string; status?: string }[];
  reactions: { emoji: string; count: number }[];
}

function formatDate(dateStr: string, lang: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('.');
  if (parts.length !== 3) return dateStr;
  const [day, month, year] = parts;
  if (lang === 'zh') return `${year}年${month}月${day}日`;
  if (lang === 'en') return `${month}/${day}/${year}`;
  return `${day}.${month}.${year}`;
}

function PhotoGallery({ photos, onClose }: { photos: { src: string; thumb: string }[]; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos.length) return null;

  const current = photos[currentIndex];
  const fullSrc = `/telegram/${current.src}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
      >
        <X size={28} />
      </button>

      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i > 0 ? i - 1 : photos.length - 1)); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 bg-black/50 rounded-full"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i < photos.length - 1 ? i + 1 : 0)); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 bg-black/50 rounded-full"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <motion.img
        key={currentIndex}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        src={fullSrc}
        alt="Telegram photo"
        className="max-w-full max-h-[85vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
          {currentIndex + 1} / {photos.length}
        </div>
      )}
    </motion.div>
  );
}

export default function NewsTab() {
  const { t, lang } = useI18n();
  const [selectedPhotos, setSelectedPhotos] = useState<{ src: string; thumb: string }[] | null>(null);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  const messages = telegramNews.messages as unknown as NewsMessage[];

  const getMessageText = (msg: NewsMessage) => {
    return msg.text[lang as 'zh' | 'en' | 'ru'] || msg.text.ru;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Newspaper className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{t('newsTitle')}</h2>
            <p className="text-sm text-gray-400 mt-0.5">{t('newsSubtitle')}</p>
          </div>
        </div>
      </motion.div>

      {/* Messages Feed */}
      <div className="space-y-6">
        {messages.map((msg, index) => {
          const isExpanded = expandedMessage === `${msg.date}_${index}`;
          const msgText = getMessageText(msg);
          const textLines = msgText.split('\n');
          const shouldTruncate = textLines.length > 6 || msgText.length > 400;
          const displayText = isExpanded ? msgText : shouldTruncate
            ? textLines.slice(0, 5).join('\n') + '...'
            : msgText;

          return (
            <motion.div
              key={`${msg.date}_${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-navy-800/60 border border-navy-700/50 rounded-xl overflow-hidden hover:border-navy-600/50 transition-colors"
            >
              {/* Message Header */}
              <div className="px-5 py-3 border-b border-navy-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                    E
                  </div>
                  <span className="font-medium text-white">{msg.from}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(msg.date, lang)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {msg.time}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div className="px-5 py-4">
                {/* Text */}
                {msgText && (
                  <div className="text-gray-200 whitespace-pre-wrap leading-relaxed mb-4">
                    {displayText}
                    {shouldTruncate && !isExpanded && (
                      <button
                        onClick={() => setExpandedMessage(`${msg.date}_${index}`)}
                        className="ml-1 text-amber-400 hover:text-amber-300 text-sm"
                      >
                        {t('newsReadMore')}
                      </button>
                    )}
                    {shouldTruncate && isExpanded && (
                      <button
                        onClick={() => setExpandedMessage(null)}
                        className="ml-1 text-amber-400 hover:text-amber-300 text-sm"
                      >
                        {t('newsReadLess')}
                      </button>
                    )}
                  </div>
                )}

                {/* Photos Grid */}
                {msg.photos.length > 0 && (
                  <div className={`grid gap-2 mb-4 ${
                    msg.photos.length === 1 ? 'grid-cols-1 max-w-md' :
                    msg.photos.length === 2 ? 'grid-cols-2 max-w-lg' :
                    'grid-cols-2 sm:grid-cols-3 max-w-xl'
                  }`}>
                    {msg.photos.map((photo, pIndex) => (
                      <button
                        key={pIndex}
                        onClick={() => setSelectedPhotos(msg.photos)}
                        className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-navy-900"
                      >
                        <img
                          src={`/telegram/${photo.thumb}`}
                          alt={`Photo ${pIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Videos */}
                {msg.videos.map((video, vIndex) => (
                  <div key={vIndex} className="bg-navy-900/50 rounded-lg p-4 mb-4 border border-navy-700/30">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-500/10 rounded-lg">
                        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white text-sm">{video.title}</div>
                        {video.description && (
                          <div className="text-xs text-gray-500 mt-1">{video.description}</div>
                        )}
                        {video.status && (
                          <div className="text-xs text-gray-600 mt-1">{video.status}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Reactions */}
                {msg.reactions.length > 0 && (
                  <div className="flex items-center gap-3 pt-3 border-t border-navy-700/30">
                    {msg.reactions.map((reaction, rIndex) => (
                      <span key={rIndex} className="flex items-center gap-1 text-sm text-gray-400">
                        <span>{reaction.emoji}</span>
                        <span>{reaction.count}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedPhotos && (
          <PhotoGallery
            photos={selectedPhotos}
            onClose={() => setSelectedPhotos(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
