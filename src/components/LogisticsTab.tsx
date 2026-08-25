import { motion } from 'framer-motion';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';
import { Train, Ship, Anchor, Pickaxe, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import MetricCard from './MetricCard';
import { logisticsMetrics, logisticsHistoryData, aiAlertData } from '../data/logisticsData';
import { useI18n } from '../i18n/context';
import KeyMarkets from './KeyMarkets';
import OperationalAssets from './OperationalAssets';

const iconMap: Record<string, React.ReactNode> = {
  mining: <Pickaxe size={20} />,
  rail: <Train size={20} />,
  ship: <Ship size={20} />,
  anchor: <Anchor size={20} />,
};

const alertBorderColors: Record<string, string> = {
  warning: 'border-amber-accent/30',
  info: 'border-cyan-accent/30',
  success: 'border-emerald-500/30',
};

const alertBgColors: Record<string, string> = {
  warning: 'bg-amber-accent/10',
  info: 'bg-cyan-accent/10',
  success: 'bg-emerald-500/10',
};

const alertIcons: Record<string, React.ReactNode> = {
  warning: <AlertTriangle size={16} className="text-amber-accent" />,
  info: <Info size={16} className="text-cyan-accent" />,
  success: <CheckCircle size={16} className="text-emerald-500" />,
};

export default function LogisticsTab() {
  const { t } = useI18n();

  // Translate data for charts
  const translatedHistoryData = logisticsHistoryData.map(d => ({
    ...d,
    month: t(d.monthKey as any),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {logisticsMetrics.map((metric, index) => (
          <MetricCard
            key={metric.labelKey}
            label={t(metric.labelKey as any)}
            value={metric.value}
            unit={metric.unit}
            description={t(metric.descriptionKey as any)}
            icon={iconMap[metric.icon]}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 card-navy p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">{t('logTitle')}</h3>
              <p className="text-xs text-gray-400">{t('logSubtitle')}</p>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-accent" />
                <span className="text-gray-400">{t('logPredicted')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-cyan-accent" />
                <span className="text-gray-400">{t('logActual')}</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={translatedHistoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a3352" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} label={{ value: t('logYAxis'), angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#12253d',
                  border: '1px solid #1a3352',
                  borderRadius: '8px',
                  color: '#e5e7eb',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="portBottleneck" name={t('logPortWait')} fill="#1a3352" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="predictedArrival" name={t('logPredDays')} stroke="#FFB200" strokeWidth={2} dot={{ fill: '#FFB200', r: 4 }} />
              <Line type="monotone" dataKey="actualArrival" name={t('logActDays')} stroke="#00D8D6" strokeWidth={2} dot={{ fill: '#00D8D6', r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-navy p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-accent/20 flex items-center justify-center">
              <Train size={18} className="text-cyan-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{aiAlertData.company}</h3>
              <p className="text-xs text-gray-400">{t('logAiSystem')}</p>
            </div>
          </div>
          <div className="space-y-3">
            {aiAlertData.alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-3 rounded-lg border ${alertBorderColors[alert.type]} ${alertBgColors[alert.type]}`}
              >
                <div className="flex items-start gap-2">
                  {alertIcons[alert.type]}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{t(alert.titleKey as any)}</span>
                      <span className="text-xs text-gray-500">{t(alert.timeKey as any)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{t(alert.messageKey as any)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Key Markets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <KeyMarkets />
      </motion.div>

      {/* Operational Assets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <OperationalAssets />
      </motion.div>
    </div>
  );
}
