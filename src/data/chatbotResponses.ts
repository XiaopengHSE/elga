export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface PresetQuestion {
  id: string;
  labelKey: string;
  questionKey: string;
  responseKey: string;
}

export const presetQuestions: PresetQuestion[] = [
  {
    id: 'elgaugol',
    labelKey: 'presetElgaugol',
    questionKey: 'presetElgaugol',
    responseKey: 'presetElgaugol',
  },
  {
    id: 'elga-road',
    labelKey: 'presetRoad',
    questionKey: 'presetRoad',
    responseKey: 'presetRoad',
  },
  {
    id: 'elga-trans',
    labelKey: 'presetTrans',
    questionKey: 'presetTrans',
    responseKey: 'presetTrans',
  },
  {
    id: 'elgalogistics',
    labelKey: 'presetLogistics',
    questionKey: 'presetLogistics',
    responseKey: 'presetLogistics',
  },
  {
    id: 'pacific-railway',
    labelKey: 'presetPacific',
    questionKey: 'presetPacific',
    responseKey: 'presetPacific',
  },
  {
    id: 'apac-market',
    labelKey: 'presetApac',
    questionKey: 'presetApac',
    responseKey: 'presetApac',
  },
];

export const chatResponses: Record<string, Record<string, string>> = {
  zh: {
    presetElgaugol: `**ELGAUGOL LLC（埃尔加煤炭公司）** 是俄罗斯最大的焦煤生产企业之一，持有埃尔加矿区的开采许可证（许可证号 ЯКУ 03730 ТЭ，有效期至2033年12月31日）。

**核心数据：**
- JORC 储量：22 亿吨（2.2Bt），是俄罗斯最大的焦煤资产
- 年产能：2023年已达 4500 万吨（45 Mt/y），2035年规划更大产能
- 煤层分布：4个主要下层煤层：Y5（12-20m厚）、Y4（9-12m）、H16（6-12m）、H15（3-6m）
- 所在煤田：托金斯基煤田（Tokinsky Coal Basin），已探明储量超过 400 亿吨

**核心优势：**
- 硫分极低（<0.21%），磷分极低（<0.006%）
- 镜质组含量高达 97.3-97.6%
- 粘结指数 G = 95（1:5），流动度 >20,000 dd
- 与澳洲 Goonyella、Goldstone、Gregory 等顶级焦煤资产同级

**地理位置：**
位于俄罗斯萨哈共和国（雅库特）东南部，距 Ulak 火车站约 360 公里。矿区位于南雅库茨克煤盆地托金斯基煤区的中心部分，距贝阿大铁路（BAM）约300公里。`,
    presetRoad: `**ELGA-ROAD LLC（埃尔加铁路公司）** 是俄罗斯最长的私营铁路运营商，负责运营从 Ulak 到 Elga 的 360 公里铁路专线。

**关键参数：**
- 全长：360 公里，连接埃尔加矿区与贝阿大铁路（Baikal-Amur Mainline）
- 设计运力：3000 万吨/年（30 Mt/y），24/7/365 全天候运营
- 轨距：俄罗斯宽轨（1520mm）
- 货物类型：煤炭、炸药、燃料润滑油、备件及设备

**运力扩张历程：**
- 2011年：原所有者完成铁路建设
- 2020年：运力提升至 1200 万吨/年
- 2021年：运力提升至 2400 万吨/年
- 2023年：运力达到 3000 万吨/年

**战略价值：**
- 打通了埃尔加矿区至太平洋沿岸港口（瓦尼诺、海参崴方向）的陆路通道
- 使埃尔加矿区距离瓦尼诺港仅约 2,018 公里，距离东方港/波西耶特约 2,500 公里
- 远比库兹巴斯矿区距离远东港口更近，物流成本优势显著`,
    presetTrans: `**ELGA-TRANS LLC（埃尔加运输公司）** 是埃尔加集团旗下的运输服务子公司，负责维护 Ulak-Elga 铁路线路和煤炭运输。

**业务范围：**
- 铁路车皮调度与编组（24/7/365 运营）
- 港口装卸协调（埃尔加港）
- 海运订舱与船期管理
- 跨境运输单证处理

**核心能力：**
- 拥有自营铁路专用线（ELGA-ROAD 360km）
- 与俄铁（RZD）深度合作
- 安全高效交付是核心优先事项
- 月调度能力随铁路运力同步提升至 250+ 万吨

**数字化升级：**
正在引入 AI 运力预测系统，优化车皮周转率，降低空载率，支持集团发展计划。`,
    presetLogistics: `**ELGALOGISTICS LLC（埃尔加物流公司）** 是埃尔加集团旗下的运输物流公司，负责处理埃尔加煤炭综合体产品的国内、出口、进口和过境运输。

**业务范围：**
- 国内货运代理与煤炭分销
- 出口物流（亚太市场：中国、日韩、印度、台湾）
- 进口及过境运输协调
- 多式联运方案设计（海铁联运）

**核心优势：**
- 依托集团自有铁路、港口基础设施
- 距离远东港口（瓦尼诺 ~2,018km、东方港 ~2,500km）比库兹巴斯更近
- 亚太市场为主要出口方向，地理优势显著
- 出口产品中Zh牌号精炼焦煤为主要销售品种`,
    presetPacific: `**太平洋铁路（Pacific Railway）** 与 **埃尔加港（Port Elga）** 是埃尔加集团在哈巴罗夫斯克边疆区（Khabarovsk Krai）拥有的出口基础设施项目。

**太平洋铁路：**
- 连接埃尔加港与贝阿大铁路（Ulak方向）的干线铁路
- 承接 ELGA-ROAD 运来的煤炭，延伸至鄂霍次克海沿岸
- 向西可通往中国边境口岸（满洲里/绥芬河方向）
- 向东直达太平洋沿岸港口

**埃尔加港（Port Elga）：**
- 位于鄂霍次克海沿岸
- 设计吞吐能力：3000 万吨/年
- 深水泊位：可停靠 10 万吨级散货船
- 功能：煤炭装船、混配、临时仓储

**一体化优势：**
矿山 → ELGA-ROAD（360km）→ Ulak → 太平洋铁路 → 埃尔加港 → 海运 → 亚太各国

全程自营，运输成本与时效高度可控。`,
    presetApac: `**亚太市场**是埃尔加集团的主要出口方向，得益于矿区得天独厚的地理位置和集团自有物流基础设施。

**主要出口市场及距离（从埃尔加矿区）：**

| 国家/地区 | 目的港 | 距离 |
|-----------|--------|------|
| 韩国 | 釜山港 | 2,700 km |
| 韩国 | 仁川港 | 2,800 km |
| 日本 | 东京/横滨港 | 3,500 km |
| 中国台湾 | 基隆港 | 4,000 km |
| 中国台湾 | 台中港 | 4,200 km |
| 中国 | 天津/黄骅港 | 3,800-3,900 km |
| 印度 | 清奈港 | 10,500 km |

**物流优势：**
- 距离瓦尼诺港（Vanino）仅约 2,018 km，距离东方港/波西耶特约 2,500 km
- 远比库兹巴斯矿区距离远东港口更近，运输成本更低
- 全程自营铁路+港口，时效可控

**时效参考：**
- 矿山发货 → 中国客户：平均 22-28 天
- 对比澳洲煤（Goonyella → 中国）：约 25-35 天

**竞争优势：**
自营全链路 = 更低成本 + 更高可控性 + 更快响应速度`,
  },
  en: {
    presetElgaugol: `**ELGAUGOL LLC** is one of Russia's largest coking coal producers, holding the extraction license at the Elga deposit (License No. ЯКУ 03730 ТЭ, valid until 31.12.2033).

**Key Data:**
- JORC Reserves: **2.2 billion tonnes (2.2Bt)** — Russia's largest coking coal asset
- Annual Capacity: 45 million tonnes/year (2023), with expansion plans to 2035
- Coal Seams: 4 main lower layers: Y5 (12-20m thick), Y4 (9-12m), H16 (6-12m), H15 (3-6m)
- Basin: Part of Tokinsky Coal Basin with **over 40 billion tonnes** of proven coal reserves

**Core Advantages:**
- Ultra-low sulfur (<0.21%), extremely low phosphorus (<0.006%)
- Vitrinite content up to 97.3-97.6%
- Caking Index G = 95 (1:5), Fluidity >20,000 dd
- On par with top Australian assets: Goonyella, Goldstone, Gregory

**Location:**
Southeastern Sakha Republic (Yakutia), ~360 km from Ulak railway station. Located in the central part of the Tokinsky coal-bearing region, ~300 km from the Baikal-Amur Mainline (BAM).`,
    presetRoad: `**ELGA-ROAD LLC** operates Russia's longest private railway — the 360 km dedicated line from Ulak to Elga.

**Key Parameters:**
- Total Length: **360 km**, connecting Elga Mine with the Baikal-Amur Mainline (BAM)
- Design Capacity: **30 Mt/year**, operating 24/7/365
- Gauge: Russian Broad Gauge (1520mm)
- Cargo: Coal, explosives, fuels and lubricants, spare parts, and equipment

**Capacity Expansion History:**
- 2011: Construction completed by previous owner
- 2020: Capacity increased to **12 Mt/year**
- 2021: Capacity increased to **24 Mt/year**
- 2023: Capacity reached **30 Mt/year**

**Strategic Value:**
- Opens the land corridor from the mine to Pacific coast ports (Vanino, Vostochny/Posiet directions)
- Elga is only ~2,018 km from Vanino Port and ~2,500 km from Vostochny/Posiet
- Significantly closer than Kuzbass suppliers, with major logistics cost advantages`,
    presetTrans: `**ELGA-TRANS LLC** is the service subsidiary responsible for maintaining the Ulak-Elga railway and managing coal transportation.

**Business Scope:**
- Railway car scheduling and marshalling (24/7/365 operations)
- Port loading/unloading coordination at Elga Port
- Sea freight booking and vessel scheduling
- Cross-border transport documentation

**Core Capabilities:**
- Own dedicated railway line (ELGA-ROAD, 360 km)
- Deep cooperation with Russian Railways (RZD)
- Core priority: safe and efficient cargo delivery along the Elga-Ulak railway
- Monthly dispatch capacity aligned with railway capacity expansion

**Digital Transformation:**
Implementing AI capacity prediction systems to optimize wagon turnover and reduce empty runs, supporting the ELGA development plan.`,
    presetLogistics: `**ELGALOGISTICS LLC** is the transport and logistics company handling domestic, export, import, and transit shipments of products from the Elga Coal Complex.

**Services:**
- Domestic freight forwarding and coal distribution
- Export logistics to APAC markets (China, Japan, Korea, India, Taiwan)
- Import and transit transportation coordination
- Multi-modal transport solution design (rail-sea intermodal)

**Key Advantages:**
- Leverages group's own railway and port infrastructure
- Much closer to Far East ports (Vanino ~2,018 km, Vostochny/Posiet ~2,500 km) than Kuzbass
- Asia-Pacific as the primary export direction due to favorable geographic location
- Premium refined coking coal of Zh grade is the primary sales product for export`,
    presetPacific: `**The Pacific Railway** and **Port Elga** are export infrastructure projects owned by Elga Group in Khabarovsk Krai.

**Pacific Railway:**
- Mainline connecting Port Elga to the Baikal-Amur Mainline (Ulak direction)
- Receives coal transported via ELGA-ROAD, extending to the Sea of Okhotsk coast
- Westbound: connects to China border crossings (Manzhouli/Suifenhe directions)
- Eastbound: reaches Pacific coast ports

**Port Elga:**
- Located on the coast of the Sea of Okhotsk
- Annual throughput capacity: **30 million tonnes**
- Deep-water berths: can accommodate 100,000-ton bulk carriers
- Functions: coal loading, blending, temporary storage

**Integrated Advantage:**
Mine → ELGA-ROAD (360km) → Ulak → Pacific Railway → Port Elga → Sea Freight → APAC Markets

Fully self-operated, with highly controllable transport costs and lead times.`,
    presetApac: `**Asia-Pacific** is the primary export market for Elga Group, driven by favorable geographic location and proprietary logistics infrastructure.

**Key Export Markets & Distances (from Elga Mine):**

| Country/Region | Destination Port | Distance |
|----------------|----------------|----------|
| South Korea | Busan | 2,700 km |
| South Korea | Incheon | 2,800 km |
| Japan | Tokyo / Yokohama | 3,500 km |
| Taiwan | Keelung | 4,000 km |
| Taiwan | Taichung | 4,200 km |
| China | Tianjin / Huanghua | 3,800-3,900 km |
| India | Chennai | 10,500 km |

**Logistics Advantages:**
- Only ~2,018 km from Vanino Port, ~2,500 km from Vostochny/Posiet
- Much closer than Kuzbass suppliers to Far East ports, significantly lower transport costs
- Fully self-operated railway + port infrastructure, reliable delivery times

**Lead Time Reference:**
- Mine dispatch → China customer: average **22-28 days**
- Comparison with Australian coal (Goonyella → China): approx. **25-35 days**

**Competitive Advantages:**
Self-operated full chain = Lower costs + Higher controllability + Faster response speed`,
  },
  ru: {
    presetElgaugol: `**ООО «ЭльгаУголь»** — одна из крупнейших в России компаний по добыче коксующегося угля, владелец лицензии на добычу на Элгинском месторождении (лицензия № ЯКУ 03730 ТЭ, действует до 31.12.2033).

**Ключевые данные:**
- Запасы JORC: **2,2 млрд тонн** — крупнейший коксующийся угольный актив России
- Годовая мощность: 45 млн тонн/год (2023 г.), план расширения до 2035 г.
- Угольные пласты: 4 основных нижних пласта: Y5 (толщина 12-20 м), Y4 (9-12 м), H16 (6-12 м), H15 (3-6 м)
- Бассейн: Часть Токинского угленосного бассейна с **запасами свыше 40 млрд тонн**

**Ключевые преимущества:**
- Сверхнизкая сера (<0,21%), чрезвычайно низкий фосфор (<0,006%)
- Содержание витринита до 97,3-97,6%
- Индекс спекаемости G = 95 (1:5), текучесть >20 000 dd
- Сопоставим с лучшими австралийскими активами: Goonyella, Goldstone, Gregory

**Расположение:**
Юго-восток Республики Саха (Якутия), примерно в 360 км от ж/д станции Улак. Расположено в центральной части Токинского угленосного региона, примерно в 300 км от Байкало-Амурской магистрали (БАМ).`,
    presetRoad: `**ООО «Эльга-Дорога»** — оператор крупнейшей в России частной железной дороги длиной 360 км от Улака до Элги.

**Ключевые параметры:**
- Общая длина: **360 км**, соединяет шахту Элга с Байкало-Амурской магистралью (БАМ)
- Проектная мощность: **30 млн тонн/год**, работа 24/7/365
- Колея: Русская широкая колея (1520 мм)
- Грузы: уголь, взрывчатые материалы, ГСМ, запчасти и оборудование

**История наращивания мощности:**
- 2011 г.: строительство завершено предыдущим владельцем
- 2020 г.: мощность увеличена до **12 млн тонн/год**
- 2021 г.: мощность увеличена до **24 млн тонн/год**
- 2023 г.: мощность достигла **30 млн тонн/год**

**Стратегическая ценность:**
- Открывает сухопутный коридор от шахты до портов Тихоокеанского побережья (Ванино, Восточный/Посьет)
- Элга находится всего в ~2 018 км от порта Ванино и в ~2 500 км от Восточного/Посьета
- Значительно ближе, чем поставщики из Кузбасса, с существенным преимуществом в логистических затратах`,
    presetTrans: `**ООО «Эльга-Транс»** — сервисная дочерняя компания, отвечающая за обслуживание ж/д линии Улак-Элга и управление перевозкой угля.

**Сфера деятельности:**
- Планирование и формирование ж/д составов (работа 24/7/365)
- Координация погрузки/разгрузки в порту Элга
- Бронирование морских перевозок и составление графиков судов
- Оформление транспортных документов при международных перевозках

**Ключевые возможности:**
- Собственная выделенная ж/д линия (Элга-Роуд, 360 км)
- Глубокое сотрудничество с РЖД
- Основной приоритет: безопасная и эффективная доставка грузов по ж/д Улак-Элга
- Ежемесячная диспетчерская мощность синхронизирована с расширением ж/д мощности

**Цифровая трансформация:**
Внедрение AI-систем прогнозирования мощностей для оптимизации оборота вагонов и снижения порожнего пробега в рамках плана развития ЭЛГА.`,
    presetLogistics: `**ООО «Элгалогистикс»** — транспортно-логистическая компания, осуществляющая внутренние, экспортные, импортные и транзитные перевозки продуктов Элгинского угольного комплекса.

**Услуги:**
- Внутренние экспедиторские услуги и дистрибуция угля
- Экспортная логистика на рынки АТР (Китай, Япония, Корея, Индия, Тайвань)
- Координация импортных и транзитных перевозок
- Разработка мультимодальных транспортных решений (ж/д-морской интермодаль)

**Ключевые преимущества:**
- Использование собственной ж/д и портовой инфраструктуры группы
- Значительно ближе к портам Дальнего Востока (Ванино ~2 018 км, Восточный/Посьет ~2 500 км), чем Кузбасс
- Азиатско-Тихоокеанский регион как основное направление экспорта благодаря выгодному географическому положению
- Основной экспортный продукт — высококачественный коксующийся уголь марки Ж`,
    presetPacific: `**Тихоокеанская железная дорога** и **порт Элга** — проекты экспортной инфраструктуры, принадлежащие группе Элга в Хабаровском крае.

**Тихоокеанская ж/д:**
- Магистральная линия, соединяющая порт Элга с Байкало-Амурской магистралью (направление Улак)
- Принимает уголь, доставленный по Элга-Роуд, и ведёт к побережью Охотского моря
- Западное направление: ведёт к китайским погранпереходам (Маньчжурия/Суйфэньхэ)
- Восточное направление: выходит к портам Тихоокеанского побережья

**Порт Элга:**
- Расположен на побережье Охотского моря
- Годовая пропускная способность: **30 млн тонн**
- Глубоководные причалы: приём судов дедвейтом до 100 000 тонн
- Функции: погрузка угля, смешивание, временное хранение

**Преимущество интеграции:**
Шахта → Элга-Роуд (360 км) → Улак → Тихоокеанская ж/д → Порт Элга → Морские перевозки → Рынки АТР

Полностью собственное управление, высокая контролируемость затрат и сроков доставки.`,
    presetApac: `**Азиатско-Тихоокеанский регион** — основное направление экспорта группы Элга, обусловленное выгодным географическим положением и собственной логистической инфраструктурой.

**Ключевые рынки сбыта и расстояния (от шахты Элга):**

| Страна/регион | Порт назначения | Расстояние |
|---------------|-----------------|------------|
| Южная Корея | Пусан | 2 700 км |
| Южная Корея | Инчхон | 2 800 км |
| Япония | Токио / Йокогама | 3 500 км |
| Тайвань | Килунг | 4 000 км |
| Тайвань | Тайчжун | 4 200 км |
| Китай | Тяньцзинь / Хуанхуа | 3 800-3 900 км |
| Индия | Ченнаи | 10 500 км |

**Логистические преимущества:**
- Всего ~2 018 км до порта Ванино, ~2 500 км до Восточного/Посьета
- Значительно ближе, чем поставщики из Кузбасса к портам Дальнего Востока, существенно ниже транспортные затраты
- Полностью собственная ж/д и портовая инфраструктура, надёжные сроки доставки

**Справочные сроки:**
- Отгрузка с шахты → клиент в Китае: в среднем **22-28 дней**
- Сравнение с австралийским углём (Goonyella → Китай): примерно **25-35 дней**

**Конкурентные преимущества:**
Собственная полная цепочка = Низкие затраты + Высокая контролируемость + Быстрая реакция`,
  },
};
