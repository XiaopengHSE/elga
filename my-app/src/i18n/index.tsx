import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'zh' | 'en' | 'ru';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const I18nContext = createContext<I18nContextType>({
  lang: 'zh',
  setLang: () => {},
  t: (key: string) => key,
});

export function useI18n() {
  return useContext(I18nContext);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('zh');

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : newLang === 'en' ? 'en' : 'ru';
  }, []);

  const t = useCallback(
    (key: string): string | string[] => {
      const value = translations[lang][key];
      return value !== undefined ? value : key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Translation dictionaries
const translations: Record<Language, Record<string, string | string[]>> = {
  zh: {
    // Header
    'company.name': '大连埃尔加国际贸易有限公司',
    'company.subtitle': 'ELGA China HQ · 大连保税区',
    'company.short': '大连埃尔加',
    'status.elgaMine': 'Elga Mine (2.2Bt JORC)',
    'status.ulakRailway': 'Ulak-Elga Railway (360km/30Mt)',
    'status.pacificPort': 'Pacific Railway / Port Elga',
    'status.dalianWarehouse': 'Dalian Bonded Warehouse',

    // Tabs
    'tab.audit': '中俄贸易与单据智审',
    'tab.logistics': '海铁联运与物流看板',
    'tab.blending': '智能配煤与报价',
    'tab.agent': '集团智能助手',

    // Tab 1: Quality Audit
    'audit.title': '煤炭品质对比分析',
    'audit.subtitle': 'Elga 焦煤 vs 中国钢厂标准 vs 澳洲 Goonyella 基准煤',
    'audit.table.parameter': '指标',
    'audit.table.unit': '单位',
    'audit.table.elgaPremium': 'Elga Premium',
    'audit.table.elgaSelective': 'Elga Selective',
    'audit.table.chinaStandard': '中国钢厂标准',
    'audit.table.goonyella': '澳洲 Goonyella',
    'audit.ocr.title': 'RAG + 智能 OCR 质检单识别',
    'audit.ocr.button': '模拟上传俄文质检单',
    'audit.ocr.uploadSuccess': '文档上传成功',
    'audit.ocr.extractTitle': 'OCR 提取结果（中俄双语）',
    'audit.ocr.compliancePass': '合规检查通过',
    'audit.ocr.aiConclusion': 'AI 质检结论',
    'audit.ocr.aiConclusionText': '该批 Elga Premium 焦煤各项指标均满足中国钢厂采购标准，发热量与低硫优势显著优于澳洲 Goonyella 基准。建议出具质检合格报告，安排后续报关流程。',

    // Tab 2: Logistics
    'logistics.metric.production': '年生产能力',
    'logistics.metric.railway': '铁路里程',
    'logistics.metric.tianjin': '至天津港',
    'logistics.metric.huanghua': '至黄骅港',
    'logistics.metric.desc.production': 'Elga Mine 当前产能',
    'logistics.metric.desc.railway': 'Ulak-Elga 铁路全长',
    'logistics.metric.desc.tianjin': '海铁联运总距离',
    'logistics.metric.desc.huanghua': '备选卸货港口',
    'logistics.chart.title': '物流时效预测分析',
    'logistics.chart.subtitle': '基于历史运力与港口压港数据的车皮/船期到达时间预测',
    'logistics.chart.legend.predicted': '预测到达',
    'logistics.chart.legend.actual': '实际到达',
    'logistics.chart.yaxis': '天数',
    'logistics.chart.portWait': '港口等待(天)',
    'logistics.chart.predictedArrival': '预测到达(天)',
    'logistics.chart.actualArrival': '实际到达(天)',
    'logistics.alert.title': 'AI 智能预警系统',
    'logistics.alert.portWarning': '港口压港预警',
    'logistics.alert.railOptimize': '铁路运力优化',
    'logistics.alert.bestRoute': '最优调度方案',
    'logistics.alert.portWarningMsg': '黄骅港当前平均等待时间 14 天，建议优先调往天津港',
    'logistics.alert.railOptimizeMsg': 'Ulak-Elga 铁路本月运力利用率 87%，建议增加 2 列/日',
    'logistics.alert.bestRouteMsg': '基于当前数据，推荐路线：Elga港 → 天津港 → 大连保税区，预计总时效 22 天',

    // Tab 3: Blending
    'blending.title': '智能配煤计算器',
    'blending.subtitle': '调节目标指标，AI 自动计算 Elga Premium 与 Elga Selective 的最优配比方案',
    'blending.slider.ash': '目标灰分 (Ash)',
    'blending.slider.sulfur': '目标硫分 (Sulfur)',
    'blending.slider.ashMin': '10% (Premium)',
    'blending.slider.ashMax': '16% (Selective)',
    'blending.slider.sulfurMin': '0.19% (Selective)',
    'blending.slider.sulfurMax': '0.50%',
    'blending.result.ratio': '推荐配比方案',
    'blending.result.properties': '混合煤质预测',
    'blending.result.ash': '灰分 Ash',
    'blending.result.sulfur': '硫分 Sulfur',
    'blending.result.csr': 'CSR (反应后强度)',
    'blending.result.cri': 'CRI (反应性指数)',
    'blending.result.target': '目标',
    'blending.cost.title': '成本分析与优势',
    'blending.cost.savings': '预计成本节约',
    'blending.cost.savingsDesc': '通过掺配 Elga Selective 替代部分 Premium 级焦煤',
    'blending.advantage.fluidity': '高流动度优势',
    'blending.advantage.fluidityDesc': 'Elga 焦煤流动度 > 20,000 dd，远超行业标准 (> 3,000 dd)，即使掺配低阶煤仍可保持优异结焦性',
    'blending.advantage.quality': '品质冗余设计',
    'blending.advantage.qualityDesc': '硫分 0.21% 远低于中国钢厂上限 0.60%，为掺配留下充足品质空间',
    'blending.chart.title': '目标 vs 混合结果对比',
    'blending.chart.target': '目标',
    'blending.chart.result': '混合结果',

    // Tab 4: Chatbot
    'chatbot.welcome': '您好！我是埃尔加集团 AI 智能助手。我可以为您介绍 ELGAUGOL 矿山、ELGA-ROAD 铁路、ELGALOGISTICS 物流等业务信息。请选择下方快捷问题或直接输入您的问题。',
    'chatbot.quickQuestions': '快捷问题',
    'chatbot.inputPlaceholder': '输入您的问题...',
    'chatbot.send': '发送',
    'chatbot.typing': '正在输入...',
    'chatbot.fallback': '感谢您的提问。作为埃尔加集团 AI 助手，我建议您关注以下核心业务：\n\n1. **ELGAUGOL 矿山**：俄罗斯最大焦煤矿之一，JORC 储量 22 亿吨\n2. **ELGA-ROAD 铁路**：360km 自营铁路，运力 3000 万吨/年\n3. **ELGALOGISTICS**：中国境内物流与仓储服务\n4. **智能配煤**：利用 Elga 高流动度焦煤优化客户成本\n\n如需更详细的信息，请选择上方快捷问题或联系业务部门。',

    // Preset questions labels
    'preset.elgaugol': 'ELGAUGOL 矿山',
    'preset.elgaRoad': 'ELGA-ROAD 铁路',
    'preset.elgaTrans': 'ELGA-TRANS 运输',
    'preset.elgalogistics': 'ELGALOGISTICS 物流',
    'preset.pacificRailway': '太平洋铁路与埃尔加港',
    'preset.apacMarket': '亚太市场物流',

    // Footer
    'footer.copyright': '© 2024 Dalian Elga International Trade Co., Ltd. 大连埃尔加国际贸易有限公司 · 俄罗斯埃尔加集团中国总部',
    'footer.internal': 'AI 智能中枢演示系统 · 内部使用',

    // Language switcher
    'lang.zh': '中文',
    'lang.en': 'English',
    'lang.ru': 'Русский',
  },

  en: {
    // Header
    'company.name': 'Dalian Elga International Trade Co., Ltd.',
    'company.subtitle': 'ELGA China HQ · Dalian Bonded Zone',
    'company.short': 'Dalian Elga',
    'status.elgaMine': 'Elga Mine (2.2Bt JORC)',
    'status.ulakRailway': 'Ulak-Elga Railway (360km/30Mt)',
    'status.pacificPort': 'Pacific Railway / Port Elga',
    'status.dalianWarehouse': 'Dalian Bonded Warehouse',

    // Tabs
    'tab.audit': 'Trade & Quality Audit',
    'tab.logistics': 'Logistics Dashboard',
    'tab.blending': 'Smart Blending',
    'tab.agent': 'Corporate AI Agent',

    // Tab 1: Quality Audit
    'audit.title': 'Coal Quality Comparison',
    'audit.subtitle': 'Elga Coking Coal vs Chinese Steel Mill Standards vs Australian Goonyella Benchmark',
    'audit.table.parameter': 'Parameter',
    'audit.table.unit': 'Unit',
    'audit.table.elgaPremium': 'Elga Premium',
    'audit.table.elgaSelective': 'Elga Selective',
    'audit.table.chinaStandard': 'China Standard',
    'audit.table.goonyella': 'Aus. Goonyella',
    'audit.ocr.title': 'RAG + AI OCR Quality Certificate Recognition',
    'audit.ocr.button': 'Simulate Upload Russian Certificate',
    'audit.ocr.uploadSuccess': 'Document uploaded successfully',
    'audit.ocr.extractTitle': 'OCR Results (Bilingual)',
    'audit.ocr.compliancePass': 'Compliance Check Passed',
    'audit.ocr.aiConclusion': 'AI Quality Conclusion',
    'audit.ocr.aiConclusionText': 'This batch of Elga Premium coking coal meets all Chinese steel mill procurement standards, with significant advantages in calorific value and low sulfur compared to Australian Goonyella benchmark. Recommend issuing quality certificate and proceeding with customs clearance.',

    // Tab 2: Logistics
    'logistics.metric.production': 'Annual Capacity',
    'logistics.metric.railway': 'Railway Length',
    'logistics.metric.tianjin': 'To Tianjin Port',
    'logistics.metric.huanghua': 'To Huanghua Port',
    'logistics.metric.desc.production': 'Elga Mine current capacity',
    'logistics.metric.desc.railway': 'Ulak-Elga railway total length',
    'logistics.metric.desc.tianjin': 'Rail-sea combined transport distance',
    'logistics.metric.desc.huanghua': 'Alternative discharge port',
    'logistics.chart.title': 'Logistics Transit Time Forecast',
    'logistics.chart.subtitle': 'Wagon/vessel arrival prediction based on historical capacity and port congestion data',
    'logistics.chart.legend.predicted': 'Predicted Arrival',
    'logistics.chart.legend.actual': 'Actual Arrival',
    'logistics.chart.yaxis': 'Days',
    'logistics.chart.portWait': 'Port Wait (days)',
    'logistics.chart.predictedArrival': 'Predicted Arrival (days)',
    'logistics.chart.actualArrival': 'Actual Arrival (days)',
    'logistics.alert.title': 'AI Smart Alert System',
    'logistics.alert.portWarning': 'Port Congestion Alert',
    'logistics.alert.railOptimize': 'Rail Capacity Optimization',
    'logistics.alert.bestRoute': 'Optimal Routing',
    'logistics.alert.portWarningMsg': 'Huanghua Port current avg. wait time: 14 days. Recommend prioritizing Tianjin Port.',
    'logistics.alert.railOptimizeMsg': 'Ulak-Elga railway capacity utilization: 87% this month. Recommend adding 2 trains/day.',
    'logistics.alert.bestRouteMsg': 'Based on current data, recommended route: Port Elga → Tianjin Port → Dalian Bonded Zone, est. 22 days total.',

    // Tab 3: Blending
    'blending.title': 'Smart Blending Calculator',
    'blending.subtitle': 'Adjust target parameters, AI automatically calculates optimal Elga Premium vs Selective blending ratio',
    'blending.slider.ash': 'Target Ash',
    'blending.slider.sulfur': 'Target Sulfur',
    'blending.slider.ashMin': '10% (Premium)',
    'blending.slider.ashMax': '16% (Selective)',
    'blending.slider.sulfurMin': '0.19% (Selective)',
    'blending.slider.sulfurMax': '0.50%',
    'blending.result.ratio': 'Recommended Blend Ratio',
    'blending.result.properties': 'Blended Coal Quality Forecast',
    'blending.result.ash': 'Ash',
    'blending.result.sulfur': 'Sulfur',
    'blending.result.csr': 'CSR (Coke Strength)',
    'blending.result.cri': 'CRI (Reactivity Index)',
    'blending.result.target': 'Target',
    'blending.cost.title': 'Cost Analysis & Advantages',
    'blending.cost.savings': 'Est. Cost Savings',
    'blending.cost.savingsDesc': 'By blending Elga Selective to replace portion of Premium grade coal',
    'blending.advantage.fluidity': 'High Fluidity Advantage',
    'blending.advantage.fluidityDesc': 'Elga coal fluidity > 20,000 dd, far exceeding industry standard (> 3,000 dd). Excellent coking performance even with lower-grade blend.',
    'blending.advantage.quality': 'Quality Buffer Design',
    'blending.advantage.qualityDesc': 'Sulfur 0.21% is well below Chinese steel mill limit of 0.60%, providing ample room for blending.',
    'blending.chart.title': 'Target vs Blended Result Comparison',
    'blending.chart.target': 'Target',
    'blending.chart.result': 'Blended Result',

    // Tab 4: Chatbot
    'chatbot.welcome': 'Hello! I am the ELGA Group AI Assistant. I can introduce you to ELGAUGOL mine, ELGA-ROAD railway, ELGALOGISTICS, and other business information. Please select a quick question below or type your own.',
    'chatbot.quickQuestions': 'Quick Questions',
    'chatbot.inputPlaceholder': 'Type your question...',
    'chatbot.send': 'Send',
    'chatbot.typing': 'Typing...',
    'chatbot.fallback': 'Thank you for your question. As the ELGA Group AI Assistant, I recommend focusing on these core businesses:\n\n1. **ELGAUGOL Mine**: One of Russia\'s largest coking coal mines, JORC reserves of 2.2 billion tons\n2. **ELGA-ROAD Railway**: 360km dedicated railway with 30 Mt/y capacity\n3. **ELGALOGISTICS**: China domestic logistics and warehousing services\n4. **Smart Blending**: Leverage Elga\'s high-fluidity coal to optimize customer costs\n\nFor more details, please select a quick question above or contact the business department.',

    // Preset questions labels
    'preset.elgaugol': 'ELGAUGOL Mine',
    'preset.elgaRoad': 'ELGA-ROAD Railway',
    'preset.elgaTrans': 'ELGA-TRANS Transport',
    'preset.elgalogistics': 'ELGALOGISTICS',
    'preset.pacificRailway': 'Pacific Railway & Port',
    'preset.apacMarket': 'APAC Market Logistics',

    // Footer
    'footer.copyright': '© 2024 Dalian Elga International Trade Co., Ltd. · ELGA Group China Headquarters',
    'footer.internal': 'AI Smart Hub Demo System · Internal Use',

    // Language switcher
    'lang.zh': '中文',
    'lang.en': 'English',
    'lang.ru': 'Русский',
  },

  ru: {
    // Header
    'company.name': 'ООО «Далянь Эльга Интернэшнл Трейд»',
    'company.subtitle': 'ELGA China HQ · Зона таможенного контроля Далянь',
    'company.short': 'Далянь Эльга',
    'status.elgaMine': 'Elga Mine (2.2Bt JORC)',
    'status.ulakRailway': 'Ж/д Улак-Эльга (360км/30Мт)',
    'status.pacificPort': 'Транссиб / Порт Эльга',
    'status.dalianWarehouse': 'Склад Далянь Бонд',

    // Tabs
    'tab.audit': 'Торговля и контроль качества',
    'tab.logistics': 'Логистика и мониторинг',
    'tab.blending': 'Умное смешивание',
    'tab.agent': 'Корпоративный ИИ-ассистент',

    // Tab 1: Quality Audit
    'audit.title': 'Сравнительный анализ качества угля',
    'audit.subtitle': 'Уголь Elga vs стандарты Китая vs австралийский Goonyella',
    'audit.table.parameter': 'Параметр',
    'audit.table.unit': 'Ед. изм.',
    'audit.table.elgaPremium': 'Elga Premium',
    'audit.table.elgaSelective': 'Elga Selective',
    'audit.table.chinaStandard': 'Стандарт КНР',
    'audit.table.goonyella': 'Goonyella (Австр.)',
    'audit.ocr.title': 'RAG + ИИ OCR распознавание сертификатов',
    'audit.ocr.button': 'Загрузить русский сертификат',
    'audit.ocr.uploadSuccess': 'Документ успешно загружен',
    'audit.ocr.extractTitle': 'Результаты OCR (двуязычные)',
    'audit.ocr.compliancePass': 'Проверка соответствия пройдена',
    'audit.ocr.aiConclusion': 'ИИ-заключение по качеству',
    'audit.ocr.aiConclusionText': 'Партия коксующегося угля Elga Premium соответствует всем стандартам китайских металлургических комбинатов. Значительные преимущества по теплотворной способности и низкому содержанию серы по сравнению с австралийским Goonyella. Рекомендуется выдать сертификат качества и начать процедуру таможенного оформления.',

    // Tab 2: Logistics
    'logistics.metric.production': 'Годовая мощность',
    'logistics.metric.railway': 'Длина ж/д',
    'logistics.metric.tianjin': 'До порта Тяньцзинь',
    'logistics.metric.huanghua': 'До порта Хуанхуа',
    'logistics.metric.desc.production': 'Текущая мощность шахты Elga',
    'logistics.metric.desc.railway': 'Общая длина ж/д Улак-Эльга',
    'logistics.metric.desc.tianjin': 'Расстояние ж/д-морской перевозки',
    'logistics.metric.desc.huanghua': 'Альтернативный порт выгрузки',
    'logistics.chart.title': 'Прогноз транзитного времени',
    'logistics.chart.subtitle': 'Прогноз прибытия вагонов/судов на основе исторических данных о мощности и загруженности портов',
    'logistics.chart.legend.predicted': 'Прогноз прибытия',
    'logistics.chart.legend.actual': 'Факт прибытия',
    'logistics.chart.yaxis': 'Дни',
    'logistics.chart.portWait': 'Ожидание в порту (дни)',
    'logistics.chart.predictedArrival': 'Прогноз прибытия (дни)',
    'logistics.chart.actualArrival': 'Факт прибытия (дни)',
    'logistics.alert.title': 'ИИ-система умных оповещений',
    'logistics.alert.portWarning': 'Предупреждение о загруженности порта',
    'logistics.alert.railOptimize': 'Оптимизация ж/д мощности',
    'logistics.alert.bestRoute': 'Оптимальный маршрут',
    'logistics.alert.portWarningMsg': 'Среднее время ожидания в порту Хуанхуа: 14 дней. Рекомендуется приоритет Тяньцзиню.',
    'logistics.alert.railOptimizeMsg': 'Использование ж/д Улак-Эльга: 87% в этом месяце. Рекомендуется +2 поезда/день.',
    'logistics.alert.bestRouteMsg': 'Рекомендуемый маршрут: Порт Эльга → Тяньцзинь → Зона Далянь Бонд, общее время ~22 дня.',

    // Tab 3: Blending
    'blending.title': 'Калькулятор умного смешивания',
    'blending.subtitle': 'Настройте целевые параметры, ИИ автоматически рассчитает оптимальное соотношение Elga Premium и Selective',
    'blending.slider.ash': 'Целевая зола (Ash)',
    'blending.slider.sulfur': 'Целевая сера (Sulfur)',
    'blending.slider.ashMin': '10% (Premium)',
    'blending.slider.ashMax': '16% (Selective)',
    'blending.slider.sulfurMin': '0.19% (Selective)',
    'blending.slider.sulfurMax': '0.50%',
    'blending.result.ratio': 'Рекомендуемое соотношение',
    'blending.result.properties': 'Прогноз качества смеси',
    'blending.result.ash': 'Зола Ash',
    'blending.result.sulfur': 'Сера Sulfur',
    'blending.result.csr': 'CSR (прочность кокса)',
    'blending.result.cri': 'CRI (индекс реактивности)',
    'blending.result.target': 'Цель',
    'blending.cost.title': 'Анализ стоимости и преимуществ',
    'blending.cost.savings': 'Прогнозируемая экономия',
    'blending.cost.savingsDesc': 'За счёт смешивания Selective для замены части Premium',
    'blending.advantage.fluidity': 'Преимущество высокой текучести',
    'blending.advantage.fluidityDesc': 'Текучесть угля Elga > 20,000 dd, значительно превышает отраслевой стандарт (> 3,000 dd). Отличная коксующаяся способность даже при смешивании.',
    'blending.advantage.quality': 'Качественный запас',
    'blending.advantage.qualityDesc': 'Сера 0.21% значительно ниже китайского лимита 0.60%, обеспечивая простор для смешивания.',
    'blending.chart.title': 'Сравнение: цель vs результат смешивания',
    'blending.chart.target': 'Цель',
    'blending.chart.result': 'Результат',

    // Tab 4: Chatbot
    'chatbot.welcome': 'Здравствуйте! Я ИИ-ассистент группы Эльга. Я могу рассказать о шахте ELGAUGOL, ж/д ELGA-ROAD, логистике ELGALOGISTICS и других направлениях. Выберите быстрый вопрос ниже или напишите свой.',
    'chatbot.quickQuestions': 'Быстрые вопросы',
    'chatbot.inputPlaceholder': 'Введите ваш вопрос...',
    'chatbot.send': 'Отправить',
    'chatbot.typing': 'Печатает...',
    'chatbot.fallback': 'Спасибо за вопрос. Как ИИ-ассистент группы Эльга, рекомендую обратить внимание на следующие направления:\n\n1. **Шахта ELGAUGOL**: Крупнейшая коксующая шахта России, запасы JORC — 2,2 млрд тонн\n2. **Ж/д ELGA-ROAD**: 360 км собственной ж/д, мощность 30 млн т/год\n3. **ELGALOGISTICS**: Логистика и склады в Китае\n4. **Умное смешивание**: Использование высокотекучего угля Эльга для оптимизации затрат\n\nДля подробностей выберите быстрый вопрос выше или свяжитесь с отделом.',

    // Preset questions labels
    'preset.elgaugol': 'ELGAUGOL Шахта',
    'preset.elgaRoad': 'Ж/д ELGA-ROAD',
    'preset.elgaTrans': 'ELGA-TRANS Транспорт',
    'preset.elgalogistics': 'ELGALOGISTICS',
    'preset.pacificRailway': 'Транссиб и Порт Эльга',
    'preset.apacMarket': 'Логистика АТР',

    // Footer
    'footer.copyright': '© 2024 ООО «Далянь Эльга Интернэшнл Трейд» · Штаб-квартира ELGA в Китае',
    'footer.internal': 'Демо-система ИИ-хаба · Внутреннее использование',

    // Language switcher
    'lang.zh': '中文',
    'lang.en': 'English',
    'lang.ru': 'Русский',
  },
};
