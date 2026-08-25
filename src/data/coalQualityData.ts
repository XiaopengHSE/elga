export interface CoalSpec {
  id: string;
  unit: string;
  elgaPremium: string | number;
  elgaSelective: string | number;
  chinaStandard: string;
  goonyella: string | number;
  betterIs: 'lower' | 'higher';
}

export const coalQualityData: CoalSpec[] = [
  {
    id: 'paramAsh',
    unit: '%',
    elgaPremium: 10.0,
    elgaSelective: 16.0,
    chinaStandard: '< 12.5',
    goonyella: 10.5,
    betterIs: 'lower',
  },
  {
    id: 'paramSulfur',
    unit: '%',
    elgaPremium: 0.21,
    elgaSelective: 0.19,
    chinaStandard: '< 0.60',
    goonyella: 0.55,
    betterIs: 'lower',
  },
  {
    id: 'paramVolatile',
    unit: '%',
    elgaPremium: 22.0,
    elgaSelective: 24.5,
    chinaStandard: '18 - 28',
    goonyella: 23.0,
    betterIs: 'higher',
  },
  {
    id: 'paramCalorific',
    unit: 'kcal/kg',
    elgaPremium: 7200,
    elgaSelective: 6800,
    chinaStandard: '> 6500',
    goonyella: 7000,
    betterIs: 'higher',
  },
  {
    id: 'paramFluidity',
    unit: 'dd',
    elgaPremium: '> 20,000',
    elgaSelective: '> 15,000',
    chinaStandard: '> 3,000',
    goonyella: 12000,
    betterIs: 'higher',
  },
  {
    id: 'paramCSR',
    unit: '%',
    elgaPremium: 68,
    elgaSelective: 62,
    chinaStandard: '> 60',
    goonyella: 65,
    betterIs: 'higher',
  },
  {
    id: 'paramCRI',
    unit: '%',
    elgaPremium: 22,
    elgaSelective: 26,
    chinaStandard: '< 30',
    goonyella: 24,
    betterIs: 'lower',
  },
  {
    id: 'paramPhosphorus',
    unit: '%',
    elgaPremium: 0.025,
    elgaSelective: 0.030,
    chinaStandard: '< 0.100',
    goonyella: 0.050,
    betterIs: 'lower',
  },
];

export interface OcrField {
  fieldKey: string;
  valueRu: string;
  valueZh: string;
  status: 'pass' | 'fail';
}

export interface OcrMockResult {
  documentType: string;
  extractedFields: OcrField[];
  warningKeys: string[];
  conclusionKey: string;
}

export const ocrMockResult: OcrMockResult = {
  documentType: '俄文煤炭质检单 (Сертификат качества угля)',
  extractedFields: [
    { fieldKey: 'fieldSulfur', valueRu: '0.21%', valueZh: '硫分 0.21%', status: 'pass' },
    { fieldKey: 'fieldAsh', valueRu: '10.2%', valueZh: '灰分 10.2%', status: 'pass' },
    { fieldKey: 'fieldPhosphorus', valueRu: '0.025%', valueZh: '磷分 0.025%', status: 'pass' },
    { fieldKey: 'fieldCalorific', valueRu: '7,180 ккал/кг', valueZh: '发热量 7,180 kcal/kg', status: 'pass' },
    { fieldKey: 'fieldVolatile', valueRu: '22.1%', valueZh: '挥发分 22.1%', status: 'pass' },
  ],
  warningKeys: ['ocrWarning1', 'ocrWarning2', 'ocrWarning3'],
  conclusionKey: 'ocrConclusionText',
};
