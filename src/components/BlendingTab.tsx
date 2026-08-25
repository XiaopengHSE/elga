import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Sliders, Info, TrendingDown, Gauge } from 'lucide-react';
import { useI18n } from '../i18n/context';

interface BlendResult {
  premiumRatio: number;
  selectiveRatio: number;
  blendedAsh: number;
  blendedSulfur: number;
  blendedCSR: number;
  blendedCRI: number;
  costSavings: number;
}

export default function BlendingTab() {
  const { t } = useI18n();
  const [targetAsh, setTargetAsh] = useState(12.5);
  const [targetSulfur, setTargetSulfur] = useState(0.30);

  const blendResult: BlendResult = useMemo(() => {
    const premiumRatioAsh = Math.max(0, Math.min(1, (16 - targetAsh) / 6));
    const premiumRatioSulfur = Math.max(0, Math.min(1, (targetSulfur - 0.19) / 0.02));
    const premiumRatio = Math.min(premiumRatioAsh, premiumRatioSulfur);
    const selectiveRatio = 1 - premiumRatio;

    const blendedAsh = premiumRatio * 10 + selectiveRatio * 16;
    const blendedSulfur = premiumRatio * 0.21 + selectiveRatio * 0.19;
    const blendedCSR = premiumRatio * 68 + selectiveRatio * 62;
    const blendedCRI = premiumRatio * 22 + selectiveRatio * 26;

    const blendCost = premiumRatio * 1.0 + selectiveRatio * 0.8;
    const costSavings = (1 - blendCost) * 100;

    return {
      premiumRatio: Math.round(premiumRatio * 100),
      selectiveRatio: Math.round(selectiveRatio * 100),
      blendedAsh: Number(blendedAsh.toFixed(2)),
      blendedSulfur: Number(blendedSulfur.toFixed(3)),
      blendedCSR: Number(blendedCSR.toFixed(1)),
      blendedCRI: Number(blendedCRI.toFixed(1)),
      costSavings: Number(costSavings.toFixed(1)),
    };
  }, [targetAsh, targetSulfur]);

  const pieData = [
    { name: t('premiumPct'), value: blendResult.premiumRatio, color: '#FFB200' },
    { name: t('selectivePct'), value: blendResult.selectiveRatio, color: '#00D8D6' },
  ];

  const barData = [
    { name: t('paramAsh'), [t('chartTarget')]: targetAsh, [t('chartResult')]: blendResult.blendedAsh, unit: '%' },
    { name: t('paramSulfur'), [t('chartTarget')]: targetSulfur, [t('chartResult')]: blendResult.blendedSulfur, unit: '%' },
    { name: t('paramCSR'), [t('chartTarget')]: 60, [t('chartResult')]: blendResult.blendedCSR, unit: '%' },
    { name: t('paramCRI'), [t('chartTarget')]: 30, [t('chartResult')]: blendResult.blendedCRI, unit: '%' },
  ];

  const chartTarget = t('chartTarget');
  const chartResult = t('chartResult');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Sliders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-navy p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="text-amber-accent" size={20} />
          <h2 className="text-lg font-semibold text-white">{t('blendTitle')}</h2>
        </div>
        <p className="text-sm text-gray-400 mb-6">{t('blendSubtitle')}</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ash Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-200">{t('targetAsh')}</label>
              <span className="text-lg font-bold text-amber-accent">{targetAsh.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="16"
              step="0.1"
              value={targetAsh}
              onChange={(e) => setTargetAsh(parseFloat(e.target.value))}
              className="w-full h-2 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-amber-accent"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{t('premiumLabel')}</span>
              <span>{t('selectiveLabel')}</span>
            </div>
          </div>

          {/* Sulfur Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-200">{t('targetSulfur')}</label>
              <span className="text-lg font-bold text-cyan-accent">{targetSulfur.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min="0.19"
              max="0.50"
              step="0.01"
              value={targetSulfur}
              onChange={(e) => setTargetSulfur(parseFloat(e.target.value))}
              className="w-full h-2 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-cyan-accent"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{t('sulfurMin')}</span>
              <span>{t('sulfurMax')}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Blend Ratio Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-navy p-5"
        >
          <h3 className="text-sm font-semibold text-white mb-4">{t('blendRatio')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#12253d',
                  border: '1px solid #1a3352',
                  borderRadius: '8px',
                  color: '#e5e7eb',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-accent" />
              <span className="text-sm text-gray-300">{t('premiumPct')} {blendResult.premiumRatio}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-accent" />
              <span className="text-sm text-gray-300">{t('selectivePct')} {blendResult.selectiveRatio}%</span>
            </div>
          </div>
        </motion.div>

        {/* Calculated Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-navy p-5"
        >
          <h3 className="text-sm font-semibold text-white mb-4">{t('blendPrediction')}</h3>
          <div className="space-y-3">
            {[
              { label: t('paramAsh'), value: `${blendResult.blendedAsh}%`, target: `${targetAsh.toFixed(1)}%`, color: 'text-amber-accent' },
              { label: t('paramSulfur'), value: `${blendResult.blendedSulfur}%`, target: `${targetSulfur.toFixed(2)}%`, color: 'text-cyan-accent' },
              { label: t('csrLabel'), value: `${blendResult.blendedCSR}%`, target: '>60%', color: 'text-emerald-400' },
              { label: t('criLabel'), value: `${blendResult.blendedCRI}%`, target: '<30%', color: 'text-emerald-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-navy-700/30">
                <span className="text-sm text-gray-300">{item.label}</span>
                <div className="text-right">
                  <div className={`text-base font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-gray-500">{t('target')}: {item.target}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cost Savings & Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-navy p-5"
        >
          <h3 className="text-sm font-semibold text-white mb-4">{t('blendCostTitle')}</h3>
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={18} className="text-emerald-500" />
              <span className="text-sm font-medium text-emerald-400">{t('costSaving')}</span>
            </div>
            <div className="text-3xl font-bold text-emerald-400">{blendResult.costSavings}%</div>
            <p className="text-xs text-gray-400 mt-1">{t('costSavingDesc')}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2 rounded-lg bg-navy-700/30">
              <Gauge size={16} className="text-amber-accent mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-200">{t('highFluidity')}</div>
                <div className="text-xs text-gray-400">{t('highFluidityDesc')}</div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-lg bg-navy-700/30">
              <Info size={16} className="text-cyan-accent mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-200">{t('qualityBuffer')}</div>
                <div className="text-xs text-gray-400">{t('qualityBufferDesc')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bar Chart Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-navy p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-4">{t('chartCompare')}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a3352" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#12253d',
                border: '1px solid #1a3352',
                borderRadius: '8px',
                color: '#e5e7eb',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey={chartTarget} fill="#1a3352" radius={[4, 4, 0, 0]} />
            <Bar dataKey={chartResult} fill="#FFB200" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
