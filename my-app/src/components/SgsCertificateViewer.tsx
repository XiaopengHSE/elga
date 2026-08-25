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

export default function SgsCertificateViewer() {
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
            <h3 className="text-sm font-semibold text-white">SGS Certificate No. {sgsCertificate.certificateNo}</h3>
            <p className="text-xs text-gray-400 mt-1">
              {sgsCertificate.lab} · Lab No: {sgsCertificate.labNo}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {sgsCertificate.principal} · Sample: {sgsCertificate.sampleType}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Received: {sgsCertificate.sampleReceived} · Tested: {sgsCertificate.sampleTested} · Methods: {sgsCertificate.methods}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={<Flame size={16} />} label="Ash (Air Dry)" value={`${airDry.ash}%`} sub="Declared: 16%" color="text-amber-accent" />
        <MetricCard icon={<FlaskConical size={16} />} label="Total Sulfur" value={`${airDry.totalSulfur}%`} sub="Declared: <0.21%" color="text-cyan-accent" />
        <MetricCard icon={<Gauge size={16} />} label="Max Fluidity" value={`${cokingProperties.maxFluidity.toLocaleString()}`} sub="dd/min (Gieseler)" color="text-emerald-400" />
        <MetricCard icon={<Scale size={16} />} label="CSR / CRI" value={`${cokingProperties.csr}% / ${cokingProperties.cri}%`} sub="Coke Strength/Reactivity" color="text-emerald-400" />
      </div>

      {/* Proximate & Ultimate Analysis */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-navy p-4">
          <div className="flex items-center gap-2 mb-3">
            <Microscope size={16} className="text-amber-accent" />
            <h4 className="text-sm font-semibold text-white">Proximate Analysis (空干基 Air Dry)</h4>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Moisture', value: `${airDry.moisture}%`, key: 'moisture' },
              { label: 'Ash', value: `${airDry.ash}%`, key: 'ash' },
              { label: 'Volatile Matter', value: `${airDry.volatileMatter}%`, key: 'volatile' },
              { label: 'Fixed Carbon', value: `${airDry.fixedCarbon}%`, key: 'fixedCarbon' },
              { label: 'Total Sulfur', value: `${airDry.totalSulfur}%`, key: 'sulfur' },
              { label: 'Gross Calorific Value', value: `${airDry.grossCalorificValue} kcal/kg`, key: 'calorific' },
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center py-1.5 border-b border-navy-700/50 last:border-0">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-200">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-xs text-emerald-400">Net Calorific Value (as received): {netCalorificValue} kcal/kg</span>
          </div>
        </div>

        <div className="card-navy p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gem size={16} className="text-cyan-accent" />
            <h4 className="text-sm font-semibold text-white">Ultimate Analysis (空干基 Air Dry)</h4>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Carbon', value: `${ultimateAnalysis[1].carbon}%`, key: 'carbon' },
              { label: 'Hydrogen', value: `${ultimateAnalysis[1].hydrogen}%`, key: 'hydrogen' },
              { label: 'Nitrogen', value: `${ultimateAnalysis[1].nitrogen}%`, key: 'nitrogen' },
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
              <h4 className="text-sm font-semibold text-white">Ash Fusibility (Reducing)</h4>
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'Deformation (DT)', value: `${ashFusibility.deformationReducing}°C` },
                { label: 'Hemisphere (HT)', value: `${ashFusibility.hemisphereReducing}°C` },
                { label: 'Flow (FT)', value: `${ashFusibility.flowReducing}°C` },
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
          <h4 className="text-sm font-semibold text-white">Coking & Plastic Properties</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <CokingPropCard label="HGI" value={cokingProperties.hgi} desc="Hardgrove Index" />
          <CokingPropCard label="FSI" value={cokingProperties.fsi} desc="Free Swelling Index" />
          <CokingPropCard label="RI" value={cokingProperties.rogaIndex} desc="Roga Index (1:5)" />
          <CokingPropCard label="G" value={cokingProperties.cakingIndex} desc="Caking Index (1:5)" />
          <CokingPropCard label="GK Type" value={cokingProperties.gkCokeType} desc="Gray-King Coke Type" />
          <CokingPropCard label="Max Fluidity" value={cokingProperties.maxFluidity.toLocaleString()} desc="dd/min (Gieseler)" highlight />
          <CokingPropCard label="Ro (r)" value={cokingProperties.vitriniteReflectance} desc="Vitrinite Reflectance %" />
          <CokingPropCard label="Vitrinite" value={`${cokingProperties.vitriniteContent}%`} desc="Vitrinite Content" />
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-navy-700/30">
            <h5 className="text-xs font-medium text-gray-300 mb-2">Gieseler Plastometer (°C)</h5>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span className="text-xs text-gray-400">Initial Softening</span><span className="text-sm text-gray-200">{cokingProperties.initialSofteningTemp}°C</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">Max Fluidity Temp</span><span className="text-sm text-gray-200">{cokingProperties.maxFluidityTemp}°C</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">Resolidification</span><span className="text-sm text-gray-200">{cokingProperties.resolidificationTemp}°C</span></div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-navy-700/30">
            <h5 className="text-xs font-medium text-gray-300 mb-2">Audibert-Arnu Dilatometer (% / °C)</h5>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span className="text-xs text-gray-400">Contraction (a)</span><span className="text-sm text-gray-200">{cokingProperties.contraction}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">Dilatation (b)</span><span className="text-sm text-gray-200">&gt;{cokingProperties.dilatation}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">Softening Temp</span><span className="text-sm text-gray-200">{cokingProperties.softeningTemp}°C</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">Max Dilatation Temp</span><span className="text-sm text-gray-200">{cokingProperties.maxDilatationTemp}°C</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ash Composition & Sulfur Forms */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-navy p-4">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={16} className="text-cyan-accent" />
            <h4 className="text-sm font-semibold text-white">Ash Composition (%) — Dry Basis</h4>
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
              { label: 'Base/Acid Ratio', value: ashComposition.baseAcidRatio },
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
            <h4 className="text-sm font-semibold text-white">Sulfur Forms (Air Dry Basis)</h4>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Sulfate Sulfur', value: sulfurForms.sulfateSulfur, key: 'sulfate' },
              { label: 'Pyrite Sulfur', value: sulfurForms.pyriteSulfur, key: 'pyrite' },
              { label: 'Organic Sulfur', value: `${sulfurForms.organicSulfur}%`, key: 'organic' },
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center py-1.5 border-b border-navy-700/50 last:border-0">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-200">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-400">Sulfate + Pyrite sulfur both &lt;0.01% — almost all sulfur is organic (0.18%), making it stable during coking.</p>
          </div>

          <div className="mt-4 pt-3 border-t border-navy-700/50">
            <h5 className="text-xs font-medium text-gray-300 mb-2">Petrographic Composition</h5>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span className="text-xs text-gray-400">Vitrinite</span><span className="text-sm text-gray-200">{cokingProperties.vitriniteContent}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">Organic Mass</span><span className="text-sm text-gray-200">{cokingProperties.organicMass}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">Mineral Matter</span><span className="text-sm text-gray-200">{cokingProperties.mineralMatter}%</span></div>
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
