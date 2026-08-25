import { motion } from 'framer-motion';
import { FileCheck, BarChart3, Sliders, MessageSquare } from 'lucide-react';
import { useI18n } from '../i18n/context';

interface Tab {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { t, lang } = useI18n();

  const tabs: Tab[] = [
    { id: 'audit', labelKey: 'tabAudit', icon: <FileCheck size={18} /> },
    { id: 'logistics', labelKey: 'tabLogistics', icon: <BarChart3 size={18} /> },
    { id: 'blending', labelKey: 'tabBlending', icon: <Sliders size={18} /> },
    { id: 'agent', labelKey: 'tabAgent', icon: <MessageSquare size={18} /> },
  ];

  return (
    <nav className="bg-navy-800 border-b border-navy-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-amber-accent'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{t(tab.labelKey as any)}</span>
              <span className="sm:hidden">
                {lang === 'zh'
                  ? t(tab.labelKey as any).split('与')[0]
                  : t(tab.labelKey as any).split(' ')[0]}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-accent"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
