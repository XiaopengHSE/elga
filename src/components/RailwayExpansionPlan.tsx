import { motion } from 'framer-motion';
import { Train, TrendingUp } from 'lucide-react';
import { railwayExpansion } from '../data/railwayExpansion';
import { useI18n } from '../i18n/context';

export default function RailwayExpansionPlan() {
  const { lang } = useI18n();

  const title = lang === 'zh' ? '铁路运力扩展计划' : lang === 'en' ? 'Railway Capacity Expansion' : 'Программа расширения ж/д';
  const subtitle = lang === 'zh' ? 'Эльга-Улак 铁路五阶段扩建方案' : lang === 'en' ? 'Five-stage expansion plan for Elga-Ulak Railway' : 'Пятиэтапная программа расширения ж/д Эльга-Улак';

  return (
    <div className="card-navy p-5">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
          <Train size={18} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        {railwayExpansion.map((stage, index) => (
          <motion.div
            key={stage.stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-start gap-4">
              {/* Stage number */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy-800 border border-navy-700 flex flex-col items-center justify-center">
                <span className="text-xs text-gray-500">Stage</span>
                <span className="text-lg font-bold text-amber-400">{stage.stage}</span>
              </div>

              {/* Content */}
              <div className="flex-1 bg-navy-900/50 rounded-lg p-4 border border-navy-700/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-emerald-400" />
                  <span className="text-lg font-bold text-white">
                    {lang === 'ru' ? stage.capacity : stage.capacityEn}
                  </span>
                </div>
                <ul className="space-y-1">
                  {stage.works.map((work, wIndex) => (
                    <li key={wIndex} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>{work}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Connector line */}
            {index < railwayExpansion.length - 1 && (
              <div className="absolute left-6 top-14 w-0.5 h-6 bg-navy-700" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
