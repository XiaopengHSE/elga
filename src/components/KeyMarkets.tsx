import { motion } from 'framer-motion';
import { Globe, MapPin, Anchor, TrendingUp } from 'lucide-react';
import { keyMarkets } from '../data/elgaCompanyData';
import { useI18n } from '../i18n/context';

const flagColors: Record<string, string> = {
  'India': 'from-orange-500 to-green-600',
  'Taiwan': 'from-red-500 to-blue-600',
  'Japan': 'from-red-500 to-white',
  'South Korea': 'from-red-500 to-blue-600',
  'China': 'from-red-600 to-yellow-500',
};

export default function KeyMarkets() {
  const { lang } = useI18n();

  const getCountry = (m: typeof keyMarkets[0]) => {
    if (lang === 'zh') return m.countryZh;
    if (lang === 'ru') return m.countryRu;
    return m.country;
  };

  return (
    <div className="card-navy p-5">
      <div className="flex items-center gap-2 mb-4">
        <Globe size={18} className="text-amber-accent" />
        <h3 className="text-base font-semibold text-white">
          {lang === 'zh' ? '主要出口市场' : lang === 'ru' ? 'Ключевые рынки сбыта' : 'Key Export Markets'}
        </h3>
        <span className="text-xs text-gray-500 ml-auto">
          {lang === 'zh' ? '亚太地区' : lang === 'ru' ? 'АТР' : 'Asia-Pacific'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {keyMarkets.map((market, index) => (
          <motion.div
            key={`${market.country}-${market.port}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 rounded-lg bg-navy-700/40 border border-navy-600/50 hover:border-navy-500 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${flagColors[market.country] || 'from-gray-500 to-gray-600'}`} />
              <span className="text-xs font-medium text-gray-300">{getCountry(market)}</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <Anchor size={12} className="text-cyan-accent" />
              <span className="text-sm font-semibold text-white">{market.port}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={11} className="text-gray-500" />
              <span className="text-xs text-gray-400">{market.distance}</span>
            </div>
            <div className="mt-2 w-full bg-navy-800 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(15, 100 - (market.distanceKm / 10500) * 100)}%` }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-accent to-amber-accent"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-amber-accent/5 border border-amber-accent/10">
        <div className="flex items-start gap-2">
          <TrendingUp size={16} className="text-amber-accent mt-0.5" />
          <p className="text-xs text-gray-400">
            {lang === 'zh'
              ? '埃尔加矿区距离海参崴（Posiet/Vostochny）约2,500公里，距离瓦尼诺港（Vanino）约2,018公里，远比库兹巴斯矿区更近。亚太市场（中国、日韩、印度、台湾）是主要销售区域。'
              : lang === 'ru'
              ? 'Расстояние от Элги до портов Восточный/Посьет ~2 500 км, до Ванино ~2 018 км — значительно ближе, чем из Кузбасса. Основные рынки: Китай, Япония, Корея, Индия, Тайвань.'
              : 'The Elga deposit is ~2,500 km from Vostochny/Posiet ports and ~2,018 km from Vanino — much closer than Kuzbass. Primary markets: China, Japan, Korea, India, Taiwan.'}
          </p>
        </div>
      </div>
    </div>
  );
}
