export interface ProcessingStep {
  step: number;
  title: string;
  titleEn: string;
  description: string;
}

export const processingSteps: ProcessingStep[] = [
  {
    step: 1,
    title: 'Дробление крупного угля',
    titleEn: 'Crushing large coal',
    description: 'Дробление крупных фракций угля в барабанной дробилке',
  },
  {
    step: 2,
    title: 'Мокрое грохочение',
    titleEn: 'Wet screening',
    description: 'Разделение угля на фракции методом мокрого грохочения',
  },
  {
    step: 3,
    title: 'Удаление породы',
    titleEn: 'Rock removal',
    description: 'Удаление породы из крупной фракции в тяжелосредном сепараторе',
  },
  {
    step: 4,
    title: 'Дробление крупной смеси',
    titleEn: 'Crushing coarse mix',
    description: 'Дробление крупной смеси угля и породы',
  },
  {
    step: 5,
    title: 'Обогащение мелкого угля',
    titleEn: 'Fine coal enrichment',
    description: 'Обогащение мелкого угля в тяжелосредных гидроциклонах',
  },
  {
    step: 6,
    title: 'Гидравлическая классификация',
    titleEn: 'Hydraulic classification',
    description: 'Разделение частиц по крупности в гидравлических классификаторах',
  },
  {
    step: 7,
    title: 'Обогащение в спиральных сепараторах',
    titleEn: 'Spiral separator enrichment',
    description: 'Обогащение угля в спиральных сепараторах',
  },
  {
    step: 8,
    title: 'Извлечение концентрата',
    titleEn: 'Concentrate extraction',
    description: 'Извлечение коксующегося концентрата с содержанием золы до 10%',
  },
];

export const processingPlantInfo = {
  currentCapacity: '3.5 млн т/год',
  currentCapacityEn: '3.5 Mt/y',
  targetCapacity: '15 новых комплексов',
  targetCapacityEn: '15 new plants',
  outputQuality: 'Зола до 10%',
  outputQualityEn: 'Ash up to 10%',
  coalGrades: ['Ж', 'ГЖ', 'ГЖО'],
};
