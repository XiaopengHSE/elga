import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { I18nProvider, useI18n } from './i18n/context';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import QualityAuditTab from './components/QualityAuditTab';
import LogisticsTab from './components/LogisticsTab';
import BlendingTab from './components/BlendingTab';
import ChatbotTab from './components/ChatbotTab';

import NewsTab from './components/NewsTab';
import ScrollToTop from './components/ScrollToTop';

const tabComponents: Record<string, React.ReactNode> = {
  audit: <QualityAuditTab />,
  logistics: <LogisticsTab />,
  blending: <BlendingTab />,
  agent: <ChatbotTab />,
  news: <NewsTab />,
};

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-navy-700 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
        <p>{t('footerLine1')}</p>
        <p className="mt-1">{t('footerLine2')}</p>
      </div>
    </footer>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('audit');

  return (
    <div className="min-h-screen bg-navy-900 text-gray-100">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {tabComponents[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
