import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Upload, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import { coalQualityData, ocrMockResult } from '../data/coalQualityData';
import { useI18n } from '../i18n/context';
import SgsCertificateViewer from './SgsCertificateViewer';

function getStatus(value: number | string, standard: string, betterIs: 'lower' | 'higher') {
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const standardMatch = standard.match(/[<>=\s]+([0-9.]+)/);
  if (!standardMatch) return 'neutral';

  const standardVal = parseFloat(standardMatch[1]);

  if (betterIs === 'lower') {
    return numValue <= standardVal ? 'pass' : 'fail';
  } else {
    return numValue >= standardVal ? 'pass' : 'fail';
  }
}

export default function QualityAuditTab() {
  const { t } = useI18n();
  const [showOcr, setShowOcr] = useState(false);
  const [ocrStep, setOcrStep] = useState(0);

  const runOcrDemo = () => {
    setShowOcr(true);
    setOcrStep(0);
    const steps = [1, 2, 3, 4];
    steps.forEach((step, i) => {
      setTimeout(() => setOcrStep(step), (i + 1) * 800);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Coal Quality Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-navy overflow-hidden"
      >
        <div className="p-5 border-b border-navy-700">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="text-amber-accent" size={20} />
            <h2 className="text-lg font-semibold text-white">{t('auditTitle')}</h2>
          </div>
          <p className="text-sm text-gray-400">{t('auditSubtitle')}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-700/50 text-gray-300">
                <th className="px-4 py-3 text-left font-medium">{t('colParameter')}</th>
                <th className="px-4 py-3 text-center font-medium">{t('colUnit')}</th>
                <th className="px-4 py-3 text-center font-medium text-amber-accent">
                  {t('colPremium')}
                </th>
                <th className="px-4 py-3 text-center font-medium text-cyan-accent">
                  {t('colSelective')}
                </th>
                <th className="px-4 py-3 text-center font-medium">{t('colChinaStd')}</th>
                <th className="px-4 py-3 text-center font-medium">{t('colGoonyella')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {coalQualityData.map((row, index) => {
                const premiumStatus = getStatus(row.elgaPremium, row.chinaStandard, row.betterIs);
                const selectiveStatus = getStatus(row.elgaSelective, row.chinaStandard, row.betterIs);

                return (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-navy-700/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-200">{t(row.id as any)}</td>
                    <td className="px-4 py-3 text-center text-gray-400">{row.unit}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="font-medium text-amber-accent">
                          {row.elgaPremium}
                        </span>
                        {premiumStatus === 'pass' && (
                          <CheckCircle size={14} className="text-emerald-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="font-medium text-cyan-accent">
                          {row.elgaSelective}
                        </span>
                        {selectiveStatus === 'pass' && (
                          <CheckCircle size={14} className="text-emerald-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-400">
                      {row.chinaStandard}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-400">
                      {row.goonyella}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* OCR Demo Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-navy overflow-hidden"
      >
        <div className="p-5 border-b border-navy-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-cyan-accent" size={20} />
              <h2 className="text-lg font-semibold text-white">{t('ocrTitle')}</h2>
            </div>
            <button
              onClick={runOcrDemo}
              disabled={showOcr && ocrStep < 4}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-accent/10 border border-amber-accent/30 text-amber-accent text-sm font-medium hover:bg-amber-accent/20 transition-colors disabled:opacity-50"
            >
              <Upload size={16} />
              {t('ocrBtn')}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showOcr && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 space-y-4"
            >
              {/* Step 1: Upload */}
              {ocrStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-navy-700/50"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle size={16} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t('ocrUploadSuccess')}</div>
                    <div className="text-xs text-gray-400">{ocrMockResult.documentType}</div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: OCR Processing */}
              {ocrStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="text-sm font-medium text-white mb-3">{t('ocrResultTitle')}</div>
                  <div className="space-y-2">
                    {ocrMockResult.extractedFields.map((field, index) => (
                      <motion.div
                        key={field.fieldKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-navy-700/30 text-sm"
                      >
                        <div className="text-gray-300">{t(field.fieldKey as any)}</div>
                        <div className="text-gray-400">{field.valueRu}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-accent font-medium">{field.valueZh}</span>
                          {field.status === 'pass' && (
                            <CheckCircle size={14} className="text-emerald-500" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Compliance Check */}
              {ocrStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={18} className="text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-400">{t('ocrCompliance')}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {ocrMockResult.warningKeys.map((key, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">•</span>
                        {t(key as any)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Step 4: Final Report */}
              {ocrStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-lg bg-amber-accent/10 border border-amber-accent/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={18} className="text-amber-accent" />
                    <span className="text-sm font-medium text-amber-accent">{t('ocrConclusion')}</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {t(ocrMockResult.conclusionKey as any)}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* SGS Certificate Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-navy overflow-hidden"
      >
        <div className="p-5 border-b border-navy-700">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="text-emerald-400" size={20} />
            <h2 className="text-lg font-semibold text-white">SGS Certificate — Elga HCC Select</h2>
          </div>
          <p className="text-sm text-gray-400">
            Real analytical report data from SGS Vostok Lab (Certificate No. 2005290816)
          </p>
        </div>
        <div className="p-5">
          <SgsCertificateViewer />
        </div>
      </motion.div>
    </div>
  );
}
