export interface Subsidiary {
  name: string;
  nameShort: string;
  role: { zh: string; en: string; ru: string };
  description: { zh: string; en: string; ru: string };
  image?: string;
  stats?: { label: { zh: string; en: string; ru: string }; value: string }[];
}

export const subsidiaries: Subsidiary[] = [
  {
    name: 'ООО «Эльгауголь»',
    nameShort: 'ELGAUGOL',
    role: {
      zh: '煤炭开采公司',
      en: 'Coal Mining Company',
      ru: 'Горнодобывающая компания',
    },
    description: {
      zh: '埃尔加矿床的运营商。持有矿山开采许可证，是煤炭开采综合体的核心环节。',
      en: 'Operator of the Elga deposit. Holds the mining license and is the key link in the coal mining complex.',
      ru: 'Оператор Эльгинского месторождения. Обладает лицензией на разработку месторождения и является ключевым звеном угледобывающего комплекса.',
    },
    image: '/elga-ru/elgin-cover-6519831aca3309a81e5efe22405cf1a4.jpg',
    stats: [
      { label: { zh: 'JORC储量', en: 'JORC Reserves', ru: 'Запасы JORC' }, value: '2.2 млрд т' },
      { label: { zh: '目标产能', en: 'Target Output', ru: 'Целевая добыча' }, value: '45 млн т/год' },
    ],
  },
  {
    name: 'ООО «Эльга-Дорога»',
    nameShort: 'ELGA-ROAD',
    role: {
      zh: '铁路基础设施运营商',
      en: 'Railway Infrastructure Operator',
      ru: 'Оператор ж/д инфраструктуры',
    },
    description: {
      zh: '运营俄罗斯最大的私营铁路「埃尔加-乌拉克」，全长360公里，连接矿床与贝阿铁路。',
      en: 'Operates Russia\'s largest private railway "Elga-Ulak", 360 km, connecting the deposit to the Baikal-Amur Mainline.',
      ru: 'Эксплуатирует крупнейшую в России частную железную дорогу «Эльга–Улак» протяженностью 360 км, соединяющую месторождение с БАМ.',
    },
    image: '/elga-ru/railway-cover-5bc3573c8782c86139700e30d315f64d.jpg',
    stats: [
      { label: { zh: '铁路长度', en: 'Length', ru: 'Протяженность' }, value: '360 км' },
      { label: { zh: '目标运力', en: 'Target Capacity', ru: 'Целевая мощность' }, value: '30 млн т/год' },
    ],
  },
  {
    name: 'ООО «Эльга-Транс»',
    nameShort: 'ELGA-TRANS',
    role: {
      zh: '服务公司',
      en: 'Service Company',
      ru: 'Сервисная компания',
    },
    description: {
      zh: '负责铁路线路、机车和货运车辆的技术维护与日常维修。',
      en: 'Provides technical maintenance and repair of railway tracks, rolling stock, and freight transport.',
      ru: 'Обеспечивает техническое обслуживание и текущий ремонт железнодорожного полотна, подвижного состава и грузового транспорта.',
    },
  },
  {
    name: 'ООО «ЭльгаЛогистик»',
    nameShort: 'ELGALOGISTICS',
    role: {
      zh: '运输物流运营商',
      en: 'Transport & Logistics Operator',
      ru: 'Транспортно-логистический оператор',
    },
    description: {
      zh: '承担国内、出口和过境货物运输。制定最优煤炭运输路线。',
      en: 'Handles domestic, export, and transit cargo shipments. Forms optimal coal delivery routes.',
      ru: 'Осуществляет внутренние, экспортные и транзитные грузоперевозки. Формирует оптимальные маршруты доставки угля до конечного потребителя.',
    },
  },
  {
    name: 'ООО «Эльга-Майнинг»',
    nameShort: 'ELGA MINING',
    role: {
      zh: '采矿与工程设计',
      en: 'Mining & Engineering',
      ru: 'Горные работы и проектирование',
    },
    description: {
      zh: '执行煤炭开采作业、专业化汽车运输、工业流程和技术设计。',
      en: 'Performs coal extraction, specialized trucking, industrial process and technology design.',
      ru: 'Выполняет угледобывающие работы, специализированные автомобильные перевозки, проектирование промышленных процессов и технологий.',
    },
  },
  {
    name: 'ООО «СПС»',
    nameShort: 'SPS',
    role: {
      zh: '建设公司',
      en: 'Construction Company',
      ru: 'Строительная компания',
    },
    description: {
      zh: '建设埃尔加煤炭综合体的交通和生产基础设施。',
      en: 'Builds transport and production infrastructure for the Elga Coal Complex.',
      ru: 'Строительство транспортной и производственной инфраструктуры Эльгинского угольного комплекса.',
    },
  },
];
