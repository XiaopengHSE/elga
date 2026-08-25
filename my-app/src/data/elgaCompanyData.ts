export interface Market {
  country: string;
  countryZh: string;
  countryRu: string;
  port: string;
  distance: string;
  distanceKm: number;
}

export const keyMarkets: Market[] = [
  { country: 'India', countryZh: '印度', countryRu: 'Индия', port: 'Chennai', distance: '10,500 km', distanceKm: 10500 },
  { country: 'Taiwan', countryZh: '中国台湾', countryRu: 'Тайвань', port: 'Keelung', distance: '4,000 km', distanceKm: 4000 },
  { country: 'Taiwan', countryZh: '中国台湾', countryRu: 'Тайвань', port: 'Taichung', distance: '4,200 km', distanceKm: 4200 },
  { country: 'Japan', countryZh: '日本', countryRu: 'Япония', port: 'Tokyo / Yokohama', distance: '3,500 km', distanceKm: 3500 },
  { country: 'South Korea', countryZh: '韩国', countryRu: 'Южная Корея', port: 'Busan', distance: '2,700 km', distanceKm: 2700 },
  { country: 'South Korea', countryZh: '韩国', countryRu: 'Южная Корея', port: 'Incheon', distance: '2,800 km', distanceKm: 2800 },
  { country: 'China', countryZh: '中国', countryRu: 'Китай', port: 'Tianjin', distance: '3,800 km', distanceKm: 3800 },
  { country: 'China', countryZh: '中国', countryRu: 'Китай', port: 'Huanghua', distance: '3,900 km', distanceKm: 3900 },
];

export interface HistoryEvent {
  year: string;
  eventEn: string;
  eventZh: string;
  eventRu: string;
}

export const historyTimeline: HistoryEvent[] = [
  { year: '1961-1962', eventEn: 'South Yakutsk Expedition discovered 22m thick coal seam at Elga', eventZh: '南雅库茨克综合考察队在埃尔加发现22米厚煤层', eventRu: 'Южно-Якутская экспедиция обнаружила 22-метровый угольный пласт на Элге' },
  { year: '1968', eventEn: 'Estimated resources: ~20 Bt total, 2.6 Bt for seams >2.0m thick', eventZh: '估算资源量：总储量约200亿吨，2.0米以上煤层26亿吨', eventRu: 'Оценочные ресурсы: ~20 млрд т всего, 2,6 млрд т для пластов >2,0 м' },
  { year: '2000', eventEn: 'Construction of Elga-Ulak railway launched', eventZh: '埃尔加-乌拉克铁路开工建设', eventRu: 'Начато строительство ж/д Элга-Улак' },
  { year: '2007', eventEn: 'Mechel Group consolidated 100% of Yakutugol shares; license for Elga deposit obtained', eventZh: 'Mechel集团 consolidation 100%雅库特煤炭股份；获得埃尔加矿开采许可证', eventRu: 'Группа Мечел консолидировала 100% акций Якутуголь; получена лицензия на Элгу' },
  { year: '2011', eventEn: 'Start of open-pit mining at Elga deposit', eventZh: '埃尔加矿露天开采启动', eventRu: 'Начало открытой добычи на Элге' },
  { year: '2012', eventEn: 'Processing plant launched; A-Property acquired 100% stake', eventZh: '洗煤厂投产；A-Property收购100%股权', eventRu: 'Запущен обогатительный завод; A-Property приобрела 100% долю' },
  { year: '2020', eventEn: 'New ownership acquired 100% stake; output reached 7 Mt/year', eventZh: '新股东收购100%股权；年产量达700万吨', eventRu: 'Новый владелец приобрел 100%; добыча достигла 7 млн т/год' },
  { year: '2023', eventEn: 'Output reached 45 Mt/year; railway capacity increased to 30 Mt/year', eventZh: '年产量达4500万吨；铁路运力提升至3000万吨/年', eventRu: 'Добыча достигла 45 млн т/год; мощность ж/д увеличена до 30 млн т/год' },
];

export interface OperationalAsset {
  id: string;
  nameEn: string;
  nameZh: string;
  nameRu: string;
  descriptionEn: string;
  descriptionZh: string;
  descriptionRu: string;
}

export const operationalAssets: OperationalAsset[] = [
  {
    id: 'elgaugol',
    nameEn: 'ELGAUGOL LLC',
    nameZh: '埃尔加煤炭公司',
    nameRu: 'ООО «ЭльгаУголь»',
    descriptionEn: 'Operating company holding extraction licence at the Elga deposit (License No. ЯКУ 03730 ТЭ, valid until 31.12.2033)',
    descriptionZh: '持有埃尔加矿开采许可证的运营公司（许可证号 ЯКУ 03730 ТЭ，有效期至2033年12月31日）',
    descriptionRu: 'Операционная компания, владеющая лицензией на добычу на Элгинском месторождении (лицензия № ЯКУ 03730 ТЭ, действует до 31.12.2033)',
  },
  {
    id: 'elga-road',
    nameEn: 'ELGA-ROAD LLC',
    nameZh: '埃尔加铁路公司',
    nameRu: 'ООО «Эльга-Дорога»',
    descriptionEn: 'Operator of the 360 km railway from Ulak to Elga, Russia\'s largest private railway. Designed capacity: 30 Mt/year.',
    descriptionZh: '运营360公里乌拉克至埃尔加铁路，俄罗斯最长的私营铁路。设计运力：3000万吨/年。',
    descriptionRu: 'Оператор 360-км ж/д от Улака до Элги, крупнейшей частной ж/д в России. Проектная мощность: 30 млн т/год.',
  },
  {
    id: 'elga-trans',
    nameEn: 'ELGA-TRANS LLC',
    nameZh: '埃尔加运输公司',
    nameRu: 'ООО «Эльга-Транс»',
    descriptionEn: 'Service company maintaining the Ulak-Elga railway and coal transportation. 24/7/365 operations.',
    descriptionZh: '负责维护乌拉克-埃尔加铁路和煤炭运输的服务公司。全年无休运营。',
    descriptionRu: 'Сервисная компания по обслуживанию ж/д Улак-Элга и перевозке угля. Работа 24/7/365.',
  },
  {
    id: 'elgalogistics',
    nameEn: 'ELGALOGISTICS LLC',
    nameZh: '埃尔加物流公司',
    nameRu: 'ООО «Элгалогистикс»',
    descriptionEn: 'Transport and logistics company handling domestic, export, import, and transit shipments from the Elga Coal Complex.',
    descriptionZh: '负责埃尔加煤炭综合体内贸、出口、进口和过境运输的物流公司。',
    descriptionRu: 'Транспортно-логистическая компания, осуществляющая внутренние, экспортные, импортные и транзитные перевозки угля.',
  },
  {
    id: 'elga-mining',
    nameEn: 'ELGA MINING LLC',
    nameZh: '埃尔加矿业公司',
    nameRu: 'ООО «Эльга Майнинг»',
    descriptionEn: 'Coal extraction company focusing on cargo transportation and mining engineering.',
    descriptionZh: '专注于煤炭开采、货物运输和采矿工程的公司。',
    descriptionRu: 'Компания по добыче угля, специализирующаяся на грузоперевозках и горнодобывающей инженерии.',
  },
  {
    id: 'sps',
    nameEn: 'SPS LLC',
    nameZh: 'SPS建设公司',
    nameRu: 'ООО «СПС»',
    descriptionEn: 'Construction company building transport and production infrastructure with specialized equipment.',
    descriptionZh: '使用专业设备建设交通和生产基础设施的建筑公司。',
    descriptionRu: 'Строительная компания, возводящая транспортную и производственную инфраструктуру с применением специализированной техники.',
  },
];
