export interface ProcessingStep {
  step: number;
  title: { zh: string; en: string; ru: string };
  description: { zh: string; en: string; ru: string };
}

export const processingSteps: ProcessingStep[] = [
  {
    step: 1,
    title: {
      zh: '大块煤破碎',
      en: 'Crushing large coal',
      ru: 'Дробление крупного угля',
    },
    description: {
      zh: '在滚筒破碎机中将大块煤破碎',
      en: 'Crushing large coal fractions in a drum crusher',
      ru: 'Дробление крупных фракций угля в барабанной дробилке',
    },
  },
  {
    step: 2,
    title: {
      zh: '湿式筛分',
      en: 'Wet screening',
      ru: 'Мокрое грохочение',
    },
    description: {
      zh: '采用湿式筛分法将煤按粒度分级',
      en: 'Separating coal into fractions by wet screening method',
      ru: 'Разделение угля на фракции методом мокрого грохочения',
    },
  },
  {
    step: 3,
    title: {
      zh: '除矸石',
      en: 'Rock removal',
      ru: 'Удаление породы',
    },
    description: {
      zh: '在重介质分选机中去除大块煤中的矸石',
      en: 'Removing rock from coarse fraction in heavy medium separator',
      ru: 'Удаление породы из крупной фракции в тяжелосредном сепараторе',
    },
  },
  {
    step: 4,
    title: {
      zh: '粗混合料破碎',
      en: 'Crushing coarse mix',
      ru: 'Дробление крупной смеси',
    },
    description: {
      zh: '将煤和矸石的粗混合料破碎',
      en: 'Crushing coarse mixture of coal and rock',
      ru: 'Дробление крупной смеси угля и породы',
    },
  },
  {
    step: 5,
    title: {
      zh: '细煤 enrichment',
      en: 'Fine coal enrichment',
      ru: 'Обогащение мелкого угля',
    },
    description: {
      zh: '在重介质水力旋流器中对细煤进行 enrichment',
      en: 'Enriching fine coal in heavy medium hydrocyclones',
      ru: 'Обогащение мелкого угля в тяжелосредных гидроциклонах',
    },
  },
  {
    step: 6,
    title: {
      zh: '水力分级',
      en: 'Hydraulic classification',
      ru: 'Гидравлическая классификация',
    },
    description: {
      zh: '在水力分级器中按粒度分离颗粒',
      en: 'Separating particles by size in hydraulic classifiers',
      ru: 'Разделение частиц по крупности в гидравлических классификаторах',
    },
  },
  {
    step: 7,
    title: {
      zh: '螺旋分选机 enrichment',
      en: 'Spiral separator enrichment',
      ru: 'Обогащение в спиральных сепараторах',
    },
    description: {
      zh: '在螺旋分选机中对煤进行 enrichment',
      en: 'Enriching coal in spiral separators',
      ru: 'Обогащение угля в спиральных сепараторах',
    },
  },
  {
    step: 8,
    title: {
      zh: '精煤提取',
      en: 'Concentrate extraction',
      ru: 'Извлечение концентрата',
    },
    description: {
      zh: '提取灰分含量不超过10%的焦煤精煤',
      en: 'Extracting coking concentrate with ash content up to 10%',
      ru: 'Извлечение коксующегося концентрата с содержанием золы до 10%',
    },
  },
];

export const processingPlantInfo = {
  currentCapacity: {
    zh: '350 万吨/年',
    en: '3.5 Mt/y',
    ru: '3.5 млн т/год',
  },
  targetCapacity: {
    zh: '15 座新综合体',
    en: '15 new plants',
    ru: '15 новых комплексов',
  },
  outputQuality: {
    zh: '灰分≤10%',
    en: 'Ash up to 10%',
    ru: 'Зола до 10%',
  },
  coalGrades: ['Ж', 'ГЖ', 'ГЖО'],
};
