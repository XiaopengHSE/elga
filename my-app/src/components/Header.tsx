import { motion } from 'framer-motion';
import { Factory, Train, Ship, Warehouse } from 'lucide-react';
import { useI18n, type Lang } from '../i18n/context';

interface StatusItem {
  icon: React.ReactNode;
  labelKey: string;
  status: 'active' | 'warning' | 'maintenance';
}

const statusColors = {
  active: 'bg-emerald-500',
  warning: 'bg-amber-500',
  maintenance: 'bg-red-500',
};

const langLabels: Record<Lang, string> = {
  zh: '中',
  en: 'EN',
  ru: 'RU',
};

export default function Header() {
  const { t, lang, setLang } = useI18n();

  const statusItems: StatusItem[] = [
    { icon: <Factory size={14} />, labelKey: 'statusMine', status: 'active' },
    { icon: <Train size={14} />, labelKey: 'statusRailway', status: 'active' },
    { icon: <Ship size={14} />, labelKey: 'statusPort', status: 'warning' },
    { icon: <Warehouse size={14} />, labelKey: 'statusWarehouse', status: 'active' },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-navy-700"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-2.5 min-h-[60px]">
          {/* Logo and Company Name */}
          <div className="flex items-center gap-2.5 flex-shrink-1 min-w-0 mr-3">
            <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-lg bg-gradient-to-br from-amber-accent to-amber-600 flex items-center justify-center flex-shrink-0">
              <span className="text-navy-900 font-bold text-base lg:text-lg">E</span>
            </div>
            <div className="hidden sm:block min-w-0 overflow-hidden">
              <h1 className="text-white font-bold text-sm lg:text-base leading-tight truncate">
                {t('companyName')}
              </h1>
              <p className="text-gray-400 text-[10px] lg:text-xs truncate">{t('companySub')}</p>
            </div>
            <div className="sm:hidden flex-shrink-0">
              <h1 className="text-white font-bold text-sm">{t('companyShort')}</h1>
            </div>
          </div>

          {/* Right side: Language + Status */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-navy-800 rounded-md border border-navy-700 overflow-hidden flex-shrink-0">
              {(Object.keys(langLabels) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-[11px] font-medium transition-colors ${
                    lang === l
                      ? 'bg-amber-accent/20 text-amber-accent'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>

            {/* Status Indicators */}
            <div className="hidden md:flex items-center gap-1.5">
              {statusItems.map((item, index) => (
                <motion.div
                  key={item.labelKey}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-navy-800 border border-navy-700"
                >
                  <span className="text-gray-400">{item.icon}</span>
                  <span className="hidden lg:inline text-gray-300 text-[11px] whitespace-nowrap">
                    {t(item.labelKey as any)}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${statusColors[item.status]} pulse-dot flex-shrink-0`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Mobile: just show status dots */}
            <div className="flex md:hidden items-center gap-1">
              {statusItems.map((item, index) => (
                <motion.div
                  key={item.labelKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="w-2 h-2 rounded-full pulse-dot flex-shrink-0"
                  style={{ backgroundColor: item.status === 'active' ? '#10b981' : item.status === 'warning' ? '#f59e0b' : '#ef4444' }}
                  title={t(item.labelKey as any)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
