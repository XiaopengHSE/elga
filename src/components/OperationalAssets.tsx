import { motion } from 'framer-motion';
import { Building2, Train, Truck, Ship, Pickaxe, HardHat } from 'lucide-react';
import { operationalAssets } from '../data/elgaCompanyData';
import { useI18n } from '../i18n/context';

const iconMap: Record<string, React.ReactNode> = {
  'elgaugol': <Pickaxe size={18} />,
  'elga-road': <Train size={18} />,
  'elga-trans': <Truck size={18} />,
  'elgalogistics': <Ship size={18} />,
  'elga-mining': <Building2 size={18} />,
  'sps': <HardHat size={18} />,
};

export default function OperationalAssets() {
  const { lang } = useI18n();

  const getName = (a: typeof operationalAssets[0]) => {
    if (lang === 'zh') return a.nameZh;
    if (lang === 'ru') return a.nameRu;
    return a.nameEn;
  };

  const getDesc = (a: typeof operationalAssets[0]) => {
    if (lang === 'zh') return a.descriptionZh;
    if (lang === 'ru') return a.descriptionRu;
    return a.descriptionEn;
  };

  const title = lang === 'zh' ? '运营子公司' : lang === 'ru' ? 'Операционные активы' : 'Operational Assets';

  return (
    <div className="card-navy p-5">
      <h3 className="text-base font-semibold text-white mb-4">{title}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {operationalAssets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 rounded-lg bg-navy-700/40 border border-navy-600/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-navy-600/50 flex items-center justify-center text-cyan-accent">
                {iconMap[asset.id]}
              </div>
              <span className="text-sm font-semibold text-white">{getName(asset)}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{getDesc(asset)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
