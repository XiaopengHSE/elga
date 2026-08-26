import { motion } from 'framer-motion';
import { Building2, Train, Truck, Ship, Pickaxe, HardHat } from 'lucide-react';
import { subsidiaries } from '../data/subsidiaries';
import { useI18n } from '../i18n/context';

const iconMap: Record<string, React.ReactNode> = {
  'ELGAUGOL': <Pickaxe size={18} />,
  'ELGA-ROAD': <Train size={18} />,
  'ELGA-TRANS': <Truck size={18} />,
  'ELGALOGISTICS': <Ship size={18} />,
  'ELGA MINING': <Building2 size={18} />,
  'SPS': <HardHat size={18} />,
};

export default function OperationalAssets() {
  const { lang } = useI18n();

  const title = lang === 'zh' ? '运营子公司' : lang === 'ru' ? 'Операционные активы' : 'Operational Assets';

  return (
    <div className="card-navy p-5">
      <h3 className="text-base font-semibold text-white mb-4">{title}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subsidiaries.map((sub, index) => (
          <motion.div
            key={sub.nameShort}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-lg bg-navy-700/40 border border-navy-600/50 overflow-hidden"
          >
            {sub.image && (
              <div className="h-32 overflow-hidden">
                <img
                  src={sub.image}
                  alt={sub.nameShort}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-navy-600/50 flex items-center justify-center text-cyan-accent">
                  {iconMap[sub.nameShort]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{sub.nameShort}</div>
                  <div className="text-xs text-gray-500">{sub.role[lang]}</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">{sub.description[lang]}</p>
              {sub.stats && (
                <div className="flex gap-2">
                  {sub.stats.map((stat) => (
                    <div key={stat.label[lang]} className="bg-navy-800/60 rounded px-2 py-1">
                      <div className="text-xs font-bold text-amber-400">{stat.value}</div>
                      <div className="text-[10px] text-gray-500">{stat.label[lang]}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
