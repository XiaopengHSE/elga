import { Train, Factory } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { railwayExpansion, productionPlan } from '../data/railwayExpansion';
import { useI18n } from '../i18n/context';

export default function RailwayExpansionPlan() {
  const { lang } = useI18n();

  const railTitle = lang === 'zh' ? '铁路运力扩展计划' : lang === 'en' ? 'Railway Capacity Expansion' : 'Программа расширения ж/д';
  const prodTitle = lang === 'zh' ? '生产与运输计划 (至2035)' : lang === 'en' ? 'Production & Shipment Plan (to 2035)' : 'План добычи и отгрузки (до 2035)';

  const railLabel = lang === 'zh' ? '运力 (Mt/y)' : lang === 'en' ? 'Capacity (Mt/y)' : 'Мощность (млн т/год)';
  const miningLabel = lang === 'zh' ? '开采量' : lang === 'en' ? 'Mining' : 'Добыча';
  const shipLabel = lang === 'zh' ? '运输量' : lang === 'en' ? 'Shipment' : 'Отгрузка';

  return (
    <div className="card-navy p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
          <Train size={18} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{railTitle}</h3>
        </div>
      </div>

      {/* Railway Capacity Chart */}
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={railwayExpansion}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a3352" />
          <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: '#12253d', border: '1px solid #1a3352', borderRadius: '8px', color: '#e5e7eb' }}
          />
          <Bar dataKey="capacityEn" name={railLabel} fill="#00D8D6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Factory size={18} className="text-amber-400" />
          </div>
          <h3 className="text-base font-semibold text-white">{prodTitle}</h3>
        </div>

        {/* Production Plan Chart */}
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={productionPlan}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a3352" />
            <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#12253d', border: '1px solid #1a3352', borderRadius: '8px', color: '#e5e7eb' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="mining" name={miningLabel} fill="#FFB200" radius={[4, 4, 0, 0]} />
            <Bar dataKey="shipment" name={shipLabel} fill="#1a3352" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
