import { motion } from 'framer-motion';
import { FileCheck, FlaskConical, Ruler, Flame, Gauge, Gem, Scale, Microscope, Thermometer } from 'lucide-react';
import {
  sgsCertificate,
  proximateAnalysis,
  ultimateAnalysis,
  cokingProperties,
  ashComposition,
  sulfurForms,
  ashFusibility,
  netCalorificValue,
} from '../data/sgsCertificateData';
import { useI18n } from '../i18n/context';

export default function SgsCertificateViewer() {
  const { t, lang } = useI18n();
  const airDry = proximateAnalysis.find((p) => p.basis === 'Air Dry Basis')!;

  return (
    <div className="space-y-5">
      {/* Certificate Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-navy-700/50 border border-navy-600"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <FileCheck size={20} className="text-emerald-500" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white">{t('sgsCertNo')} {sgsCertificate.certificateNo}</h3>
            <p className="text-xs text-gray-400 mt-1">
              {sgsCertificate.lab} · {t('sgsLabNo')}: {sgsCertificate.labNo}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {sgsCertificate.principal} · {t('sgsSample')}: {sgsCertificate.sampleType}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('sgsReceived')}: {sgsCertificate.sampleReceived} · {t('sgsTested')}: {sgsCertificate.sampleTested} · {t('sgsMethods')}: {sgsCertificate.methods}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={<Flame size={16} />} label={t('sgsAirDry')} value={`${airDry.ash}%`} sub={`${t('sgsDeclared')}: 16%`} color="text-amber-accent" />
        <MetricCard icon={<FlaskConical size={16} />} label={t('sgsTotalSulfur')} value={`${airDry.totalSulfur}%`} sub={`${t('sgsDeclared')}: <0.21%`} color="text-cyan-accent" />
        <MetricCard icon={<Gauge size={16} />} label={t('sgsMaxFluidity')} value={`${cokingProperties.maxFluidity.toLocaleString()}`} sub={t('sgsGieselerDesc')} color="text-emerald-400" />
        <MetricCard icon={<Scale size={16} />} label={t('sgsCsrCri')} value={`${cokingProperties.csr}% / ${cokingProperties.cri}%`} sub={t('sgsCokeStrengthDesc')} color="text-emerald-400" />
      </div>

      {/* Proximate & Ultimate Analysis */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-navy p-4">
          <div className="flex items-center gap-2 mb-3">
            <Microscope size={16} className="text-amber-accent" />
            <h4 className="text-sm font-semibold text-white">{t('sgsProximateTitle')}</h4>
          </div>
          <div className="space-y-2">
            {[
              { label: t('sgsMoisture'), value: `${airDry.moisture}%`, key: 'moisture' },
              { label: t('sgsAsh'), value: `${airDry.ash}%`, key: 'ash' },
              { label: t('sgsVolatile'), value: `${airDry.volatileMatter}%`, key: 'volatile' },
              { label: t('sgsFixedCarbon'), value: `${airDry.fixedCarbon}%`, key: 'fixedCarbon' },
              { label: t('sgsTotalSulfur'), value: `${airDry.totalSulfur}%`, key: 'sulfur' },
              { label: t('sgsGrossCalorific'), value: `${airDry.grossCalorificValue} kcal/kg`, key: 'calorific' },
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center py-1.5 border-b border-navy-700/50 last:border-0">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-200">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-xs text-emerald-400">{t('sgsNetCalorific')}: {netCalorificValue} kcal/kg</span>
          </div>
        </div>

        <div className="card-navy p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gem size={16} className="text-cyan-accent" />
            <h4 className="text-sm font-semibold text-white">{t('sgsUltimateTitle')}</h4>
          </div>
          <div className="space-y-2">
            {[
              { label: t('sgsCarbon'), value: `${ultimateAnalysis[1].carbon}%`, key: 'carbon' },
              { label: t('sgsHydrogen'), value: `${ultimateAnalysis[1].hydrogen}%`, key: 'hydrogen' },
              { label: t('sgsNitrogen'), value: `${ultimateAnalysis[1].nitrogen}%`, key: 'nitrogen' },
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center py-1.5 border-b border-navy-700/50 last:border-0">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-200">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-navy-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer size={16} className="text-amber-accent" />
              <h4 className="text-sm font-semibold text-white">{t('sgsFusibilityTitle')}</h4>
            </div>
            <div className="space-y-1.5">
              {[
                { label: t('sgsDeformation'), value: `${ashFusibility.deformationReducing}°C` },
                { label: t('sgsHemisphere'), value: `${ashFusibility.hemisphereReducing}°C` },
                { label: t('sgsFlow'), value: `${ashFusibility.flowReducing}°C` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{item.label}</span>
                  <span className="text-sm font-medium text-gray-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Coking Properties */}
      <div className="card-navy p-4">
        <div className="flex items-center gap-2 mb-3">
          <Ruler size={16} className="text-amber-accent" />
          <h4 className="text-sm font-semibold text-white">{t('sgsCokingTitle')}</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <CokingPropCard label={t('sgsHGI')} value={cokingProperties.hgi} desc={t('sgsHardgroveDesc')} />
          <CokingPropCard label={t('sgsFSI')} value={cokingProperties.fsi} desc={t('sgsFreeSwellingDesc')} />
          <CokingPropCard label={t('sgsRI')} value={cokingProperties.rogaIndex} desc={t('sgsRogaDesc')} />
          <CokingPropCard label={t('sgsG')} value={cokingProperties.cakingIndex} desc={t('sgsCakingDesc')} />
          <CokingPropCard label={t('sgsGKType')} value={cokingProperties.gkCokeType} desc={t('sgsGrayKingDesc')} />
          <CokingPropCard label={t('sgsMaxFluidity')} value={cokingProperties.maxFluidity.toLocaleString()} desc={t('sgsGieselerDesc')} highlight />
          <CokingPropCard label={t('sgsRo')} value={cokingProperties.vitriniteReflectance} desc={t('sgsVitriniteReflectanceDesc')} />
          <CokingPropCard label={t('sgsVitrinite')} value={`${cokingProperties.vitriniteContent}%`} desc={t('sgsVitriniteContentDesc')} />
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-navy-700/30">
            <h5 className="text-xs font-medium text-gray-300 mb-2">{t('sgsGieselerTitle')}</h5>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsInitialSoftening')}</span><span className="text-sm text-gray-200">{cokingProperties.initialSofteningTemp}°C</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsMaxFluidityTemp')}</span><span className="text-sm text-gray-200">{cokingProperties.maxFluidityTemp}°C</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsResolidification')}</span><span className="text-sm text-gray-200">{cokingProperties.resolidificationTemp}°C</span></div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-navy-700/30">
            <h5 className="text-xs font-medium text-gray-300 mb-2">{t('sgsDilatometerTitle')}</h5>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsContraction')}</span><span className="text-sm text-gray-200">{cokingProperties.contraction}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsDilatation')}</span><span className="text-sm text-gray-200">&gt;{cokingProperties.dilatation}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsSofteningTemp')}</span><span className="text-sm text-gray-200">{cokingProperties.softeningTemp}°C</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsMaxDilatationTemp')}</span><span className="text-sm text-gray-200">{cokingProperties.maxDilatationTemp}°C</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ash Composition & Sulfur Forms */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-navy p-4">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={16} className="text-cyan-accent" />
            <h4 className="text-sm font-semibold text-white">{t('sgsAshCompositionTitle')}</h4>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              { label: 'SiO₂', value: ashComposition.sio2 },
              { label: 'Al₂O₃', value: ashComposition.al2o3 },
              { label: 'Fe₂O₃', value: ashComposition.fe2o3 },
              { label: 'CaO', value: ashComposition.cao },
              { label: 'MgO', value: ashComposition.mgo },
              { label: 'K₂O', value: ashComposition.k2o },
              { label: 'Na₂O', value: ashComposition.na2o },
              { label: 'SO₃', value: ashComposition.so3 },
              { label: 'P₂O₅', value: ashComposition.p2o5 },
              { label: 'TiO₂', value: ashComposition.tio2 },
              { label: 'MnO', value: ashComposition.mno },
              { label: lang === 'zh' ? '碱酸比' : lang === 'ru' ? 'Осн./кисл. отн.' : 'Base/Acid Ratio', value: ashComposition.baseAcidRatio },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-1 border-b border-navy-700/30">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className="text-xs font-medium text-gray-200">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-navy p-4">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical size={16} className="text-emerald-400" />
            <h4 className="text-sm font-semibold text-white">{t('sgsSulfurFormsTitle')}</h4>
          </div>
          <div className="space-y-2">
            {[
              { label: t('sgsSulfateSulfur'), value: sulfurForms.sulfateSulfur, key: 'sulfate' },
              { label: t('sgsPyriteSulfur'), value: sulfurForms.pyriteSulfur, key: 'pyrite' },
              { label: t('sgsOrganicSulfur'), value: `${sulfurForms.organicSulfur}%`, key: 'organic' },
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center py-1.5 border-b border-navy-700/50 last:border-0">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-200">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-400">{t('sgsSulfurNote')}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-navy-700/50">
            <h5 className="text-xs font-medium text-gray-300 mb-2">{t('sgsPetrographicTitle')}</h5>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsVitrinite')}</span><span className="text-sm text-gray-200">{cokingProperties.vitriniteContent}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsOrganicMass')}</span><span className="text-sm text-gray-200">{cokingProperties.organicMass}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">{t('sgsMineralMatter')}</span><span className="text-sm text-gray-200">{cokingProperties.mineralMatter}%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-navy-700/50 border border-navy-600">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-400">{icon}</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-[10px] text-gray-500 mt-1">{sub}</div>
    </div>
  );
}

function CokingPropCard({ label, value, desc, highlight }: {
  label: string;
  value: string | number;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div className={`p-2.5 rounded-lg ${highlight ? 'bg-amber-accent/10 border border-amber-accent/20' : 'bg-navy-700/30'}`}>
      <div className={`text-base font-bold ${highlight ? 'text-amber-accent' : 'text-white'}`}>{value}</div>
      <div className="text-xs text-gray-300 mt-0.5">{label}</div>
      <div className="text-[10px] text-gray-500 mt-0.5">{desc}</div>
    </div>
  );
}
