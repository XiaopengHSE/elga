export interface HistoryEvent {
  year: string;
  title: { zh: string; en: string; ru: string };
  description: { zh: string; en: string; ru: string };
  image?: string;
}

export const historyTimeline: HistoryEvent[] = [
  {
    year: '1966',
    title: { zh: '雅库特煤炭', en: 'Yakutugol', ru: 'Якутуголь' },
    description: {
      zh: '苏联煤炭工业部下令成立「雅库特煤炭」托拉斯，负责南雅库特煤田的勘探与开发。',
      en: 'USSR Ministry of Coal Industry ordered creation of "Yakutugol" trust for coal exploration in South Yakutia.',
      ru: 'Приказом Министерства угольной промышленности СССР создан трест «Якутуголь» для разведки и освоения угольных месторождений Южной Якутии.',
    },
  },
  {
    year: '1989',
    title: { zh: '技术经济论证', en: 'Feasibility Study', ru: 'Технико-экономическое обоснование' },
    description: {
      zh: '西伯利亚煤炭设计院完成埃尔加煤炭综合体建设的技术经济论证。',
      en: 'Sibgiproshakht institute developed technical-economic justification for Elga Coal Complex construction.',
      ru: 'Институтом «Сибгипрошахт» разработано технико-экономическое обоснование строительства Эльгинского угольного комплекса.',
    },
  },
  {
    year: '1990',
    title: { zh: '储量获批', en: 'Reserves Approved', ru: 'Утверждение запасов' },
    description: {
      zh: '国家委员会正式批准埃尔加矿床储量（11月）。',
      en: 'State Commission officially approved Elga deposit reserves (November).',
      ru: 'Государственной комиссией утверждены запасы Эльгинского месторождения (ноябрь).',
    },
  },
  {
    year: '1992',
    title: { zh: '埃尔加-乌拉克铁路', en: 'Elga-Ulak Railway', ru: 'Строительство ж/д Эльга-Улак' },
    description: {
      zh: '铁道部启动埃尔加至乌拉克铁路线建设。',
      en: 'Ministry of Railways launched construction of Elga-Ulak railway line.',
      ru: 'Начато строительство железнодорожной линии Эльга–Улак Министерством путей сообщения.',
    },
  },
  {
    year: '1993',
    title: { zh: '股份制改革', en: 'Joint-Stock Reform', ru: 'Акционирование' },
    description: {
      zh: '「雅库特煤炭」国营企业改制为开放式股份公司，100%股份归国家所有。',
      en: '"Yakutugol" state enterprise restructured into open joint-stock company, 100% state-owned.',
      ru: 'ГУП «Якутуголь» преобразовано в открытое акционерное общество, 100% акций находится в государственной собственности.',
    },
  },
  {
    year: '2007',
    title: { zh: 'Mechel集团收购', en: 'Mechel Acquisition', ru: 'Приобретение Группой Мечел' },
    description: {
      zh: 'Mechel集团整合雅库特煤炭100%股份；获得埃尔加矿开采许可证。',
      en: 'Mechel Group consolidated 100% of Yakutugol shares; obtained license for Elga deposit.',
      ru: 'Группа Мечел консолидировала 100% акций АО ХК «Якутуголь»; получена лицензия на разработку Эльгинского разреза.',
    },
  },
  {
    year: '2011',
    title: { zh: '开采启动', en: 'Mining Started', ru: 'Начало добычи' },
    description: {
      zh: '埃尔加露天矿正式投产。',
      en: 'Open-pit mining officially began at Elga deposit.',
      ru: 'Начата добыча угля на Эльгинском разрезе.',
    },
  },
  {
    year: '2012',
    title: { zh: '选煤厂投产', en: 'Processing Plant Launch', ru: 'Запуск обогатительного комплекса' },
    description: {
      zh: '埃尔加选煤综合体投入运营。',
      en: 'Elga coal processing complex commissioned.',
      ru: 'Введен в эксплуатацию обогатительный комплекс.',
    },
  },
  {
    year: '2020',
    title: { zh: '新战略发展', en: 'New Strategy', ru: 'Новая стратегия развития' },
    description: {
      zh: '整合埃尔加煤炭综合体100%资产；启动至2035年发展计划。',
      en: 'Consolidated 100% of Elga Coal Complex assets; launched development program through 2035.',
      ru: 'Консолидированы 100% активов Эльгинского угольного комплекса; запущена программа развития до 2035 года.',
    },
  },
];
