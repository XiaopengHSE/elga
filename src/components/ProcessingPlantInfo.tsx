import { motion } from 'framer-motion';
import { Factory, Settings } from 'lucide-react';
import { processingSteps, processingPlantInfo } from '../data/processingPlant';
import { useI18n } from '../i18n/context';

export default function ProcessingPlantInfo() {
  const { lang } = useI18n();

  const title = lang === 'zh' ? '选煤厂工艺流程' : lang === 'en' ? 'Coal Processing Plant' : 'Обогатительный комплекс';
  const subtitle = lang === 'zh' ? '八段式 Coralina Engineering 选煤工艺' : lang === 'en' ? '8-stage Coralina Engineering process' : '8-ступенчатая технология Coralina Engineering';

  return (
    <div className="card-navy p-5">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <Factory size={18} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>

      {/* Plant stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-navy-900/50 rounded-lg p-3 border border-navy-700/30 text-center">
          <Settings size={16} className="text-emerald-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white">{lang === 'ru' ? processingPlantInfo.currentCapacity : processingPlantInfo.currentCapacityEn}</div>
          <div className="text-xs text-gray-500">
            {lang === 'zh' ? '当前产能' : lang === 'en' ? 'Current Capacity' : 'Текущая мощность'}
          </div>
        </div>
        <div className="bg-navy-900/50 rounded-lg p-3 border border-navy-700/30 text-center">
          <Settings size={16} className="text-amber-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white">{lang === 'ru' ? processingPlantInfo.targetCapacity : processingPlantInfo.targetCapacityEn}</div>
          <div className="text-xs text-gray-500">
            {lang === 'zh' ? '扩建计划' : lang === 'en' ? 'Expansion Plan' : 'План расширения'}
          </div>
        </div>
        <div className="bg-navy-900/50 rounded-lg p-3 border border-navy-700/30 text-center">
          <Settings size={16} className="text-cyan-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white">{lang === 'ru' ? processingPlantInfo.outputQuality : processingPlantInfo.outputQualityEn}</div>
          <div className="text-xs text-gray-500">
            {lang === 'zh' ? '产品质量' : lang === 'en' ? 'Output Quality' : 'Качество продукции'}
          </div>
        </div>
        <div className="bg-navy-900/50 rounded-lg p-3 border border-navy-700/30 text-center">
          <Settings size={16} className="text-purple-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white">{processingPlantInfo.coalGrades.join(', ')}</div>
          <div className="text-xs text-gray-500">
            {lang === 'zh' ? '煤种等级' : lang === 'en' ? 'Coal Grades' : 'Марки угля'}
          </div>
        </div>
      </div>

      {/* Process steps */}
      <div className="space-y-3">
        {processingSteps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex items-start gap-3"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center">
              <span className="text-sm font-bold text-amber-400">{step.step}</span>
            </div>
            <div className="flex-1 bg-navy-900/30 rounded-lg p-3 border border-navy-700/20">
              <div className="text-sm font-medium text-white">
                {lang === 'ru' ? step.title : step.titleEn}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{step.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
