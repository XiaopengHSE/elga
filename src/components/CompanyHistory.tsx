import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { historyTimeline } from '../data/historyTimeline';
import { useI18n } from '../i18n/context';

const historyImages: Record<string, string> = {
  '1966': '/elga-ru/history1-4d108388366ca015aa3a87a05b2ab446.jpg',
  '1989': '/elga-ru/history2-f1ecb2ca6ad3f1314b9fd171bffdd73c.jpg',
  '1990': '/elga-ru/history3-b2cd611c2fd65862e421e97c58a33e61.jpg',
  '1992': '/elga-ru/history4-eb58df6b0c93f1a5e9085b7ba2b15d4b.jpg',
  '1993': '/elga-ru/history5-db1b2aa6650c2dc8c73debaa30b4e69f.jpg',
  '2007': '/elga-ru/history6-ccd19b2f0cc3936c7753f01fb3bdad5e.jpg',
  '2011': '/elga-ru/history7-85fd29d429b997a1f9fdc5213ba5fce5.jpg',
};

export default function CompanyHistory() {
  const { lang } = useI18n();

  return (
    <div className="card-navy p-5">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <Clock size={18} className="text-amber-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">
            {lang === 'zh' ? '公司发展历程' : lang === 'en' ? 'Company History' : 'История компании'}
          </h3>
          <p className="text-xs text-gray-400">
            {lang === 'zh' ? '从1966年至今的关键里程碑' : lang === 'en' ? 'Key milestones from 1966 to present' : 'Ключевые вехи с 1966 года'}
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-navy-700" />

        <div className="space-y-6">
          {historyTimeline.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-12"
            >
              {/* Dot */}
              <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-navy-800 border-2 border-amber-400 z-10" />

              <div className="bg-navy-900/50 rounded-lg p-4 border border-navy-700/30">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg font-bold text-amber-400">{event.year}</span>
                  <span className="text-sm font-medium text-white">{event.title}</span>
                </div>
                {historyImages[event.year] && (
                  <img
                    src={historyImages[event.year]}
                    alt={event.title}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                    loading="lazy"
                  />
                )}
                <p className="text-sm text-gray-400 leading-relaxed">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
