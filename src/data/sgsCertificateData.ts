export interface SgsCertificate {
  certificateNo: string;
  lab: string;
  principal: string;
  sampleType: string;
  sampleReceived: string;
  sampleTested: string;
  labNo: string;
  methods: string;
  sampleWeight: string;
}

export interface ProximateAnalysis {
  basis: string;
  moisture: number;
  ash: number;
  volatileMatter: number;
  fixedCarbon: number;
  totalSulfur: number;
  grossCalorificValue: number;
}

export interface UltimateAnalysis {
  basis: string;
  carbon: number;
  hydrogen: number;
  nitrogen: number;
}

export interface CokingProperties {
  hgi: number;
  realDensity: number;
  fsi: number;
  gkCokeType: string;
  rogaIndex: number;
  cakingIndex: number;
  maxFluidity: number;
  initialSofteningTemp: number;
  maxFluidityTemp: number;
  resolidificationTemp: number;
  csr: number;
  cri: number;
  vitriniteReflectance: number;
  vitriniteContent: number;
  organicMass: number;
  mineralMatter: number;
  contraction: number;
  dilatation: number;
  softeningTemp: number;
  maxContractionTemp: number;
  maxDilatationTemp: number;
}

export interface AshComposition {
  sio2: number;
  al2o3: number;
  fe2o3: number;
  cao: number;
  mgo: number;
  k2o: number;
  na2o: number;
  so3: number;
  p2o5: number;
  tio2: number;
  mno: number;
  baseAcidRatio: number;
  basicityIndex: number;
}

export interface SulfurForms {
  sulfateSulfur: string;
  pyriteSulfur: string;
  organicSulfur: number;
}

export interface AshFusibility {
  deformationOxidizing: number;
  deformationReducing: number;
  hemisphereOxidizing: number;
  hemisphereReducing: number;
  flowOxidizing: number;
  flowReducing: number;
}

export const sgsCertificate: SgsCertificate = {
  certificateNo: '2005290816',
  lab: 'SGS Vostok Limited, Novokuznetsk, Russia',
  principal: 'Elga Coal Ltd (ООО «ЭльгаУголь»)',
  sampleType: 'Elga HCC Select Ash 16% (as declared)',
  sampleReceived: '2020-05-22',
  sampleTested: '2020-05-23',
  labNo: 'NK20-052074',
  methods: 'GOST / ISO / ASTM Standards',
  sampleWeight: '32.78 kg (double polyethylene bag)',
};

export const proximateAnalysis: ProximateAnalysis[] = [
  { basis: 'As Received', moisture: 2.5, ash: 15.1, volatileMatter: 31.3, fixedCarbon: 51.1, totalSulfur: 0.19, grossCalorificValue: 7046 },
  { basis: 'Air Dry Basis', moisture: 1.1, ash: 15.3, volatileMatter: 31.85, fixedCarbon: 51.8, totalSulfur: 0.19, grossCalorificValue: 7147 },
  { basis: 'Dry Basis', moisture: 0, ash: 15.5, volatileMatter: 32.2, fixedCarbon: 52.4, totalSulfur: 0.19, grossCalorificValue: 7226 },
  { basis: 'Dry Ash Free', moisture: 0, ash: 0, volatileMatter: 38.0, fixedCarbon: 62.0, totalSulfur: 0, grossCalorificValue: 8549 },
];

export const ultimateAnalysis: UltimateAnalysis[] = [
  { basis: 'As Received', carbon: 71.1, hydrogen: 4.54, nitrogen: 0.83 },
  { basis: 'Air Dry Basis', carbon: 72.1, hydrogen: 4.61, nitrogen: 0.84 },
  { basis: 'Dry Basis', carbon: 72.9, hydrogen: 4.66, nitrogen: 0.85 },
  { basis: 'Dry Ash Free', carbon: 86.2, hydrogen: 5.51, nitrogen: 1.01 },
];

export const cokingProperties: CokingProperties = {
  hgi: 77,
  realDensity: 1.39,
  fsi: 8.0,
  gkCokeType: 'G10',
  rogaIndex: 81,
  cakingIndex: 91,
  maxFluidity: 42000,
  initialSofteningTemp: 373,
  maxFluidityTemp: 445,
  resolidificationTemp: 485,
  csr: 50.7,
  cri: 29.0,
  vitriniteReflectance: 0.95,
  vitriniteContent: 97.6,
  organicMass: 93.6,
  mineralMatter: 6.4,
  contraction: 26,
  dilatation: 300,
  softeningTemp: 370,
  maxContractionTemp: 400,
  maxDilatationTemp: 485,
};

export const ashComposition: AshComposition = {
  sio2: 47.80,
  al2o3: 24.20,
  fe2o3: 6.80,
  cao: 13.10,
  mgo: 1.50,
  k2o: 1.00,
  na2o: 0.42,
  so3: 3.30,
  p2o5: 0.040,
  tio2: 0.80,
  mno: 0.160,
  baseAcidRatio: 0.313,
  basicityIndex: 0.317,
};

export const sulfurForms: SulfurForms = {
  sulfateSulfur: '<0.01',
  pyriteSulfur: '<0.01',
  organicSulfur: 0.18,
};

export const ashFusibility: AshFusibility = {
  deformationOxidizing: 1360,
  deformationReducing: 1280,
  hemisphereOxidizing: 1380,
  hemisphereReducing: 1320,
  flowOxidizing: 1400,
  flowReducing: 1340,
};

export const netCalorificValue = 6800; // kcal/kg (as received)
