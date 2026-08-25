export interface LogisticsMetric {
  labelKey: string;
  value: number;
  unit: string;
  icon: string;
  descriptionKey: string;
}

export const logisticsMetrics: LogisticsMetric[] = [
  {
    labelKey: 'metricCapacity',
    value: 45,
    unit: 'Mt/y',
    icon: 'mining',
    descriptionKey: 'metricCapacityDesc',
  },
  {
    labelKey: 'metricRailway',
    value: 360,
    unit: 'km',
    icon: 'rail',
    descriptionKey: 'metricRailwayDesc',
  },
  {
    labelKey: 'metricTianjin',
    value: 3800,
    unit: 'km',
    icon: 'ship',
    descriptionKey: 'metricTianjinDesc',
  },
  {
    labelKey: 'metricHuanghua',
    value: 3900,
    unit: 'km',
    icon: 'anchor',
    descriptionKey: 'metricHuanghuaDesc',
  },
];

export interface LogisticsDataPoint {
  monthKey: string;
  railCapacity: number;
  portBottleneck: number;
  predictedArrival: number;
  actualArrival: number;
}

export const logisticsHistoryData: LogisticsDataPoint[] = [
  { monthKey: 'jan', railCapacity: 2.8, portBottleneck: 12, predictedArrival: 18, actualArrival: 19 },
  { monthKey: 'feb', railCapacity: 2.5, portBottleneck: 15, predictedArrival: 20, actualArrival: 22 },
  { monthKey: 'mar', railCapacity: 3.2, portBottleneck: 8, predictedArrival: 16, actualArrival: 16 },
  { monthKey: 'apr', railCapacity: 3.5, portBottleneck: 6, predictedArrival: 15, actualArrival: 15 },
  { monthKey: 'may', railCapacity: 3.8, portBottleneck: 10, predictedArrival: 17, actualArrival: 18 },
  { monthKey: 'jun', railCapacity: 4.0, portBottleneck: 14, predictedArrival: 19, actualArrival: 21 },
  { monthKey: 'jul', railCapacity: 3.6, portBottleneck: 18, predictedArrival: 22, actualArrival: 25 },
  { monthKey: 'aug', railCapacity: 3.9, portBottleneck: 11, predictedArrival: 17, actualArrival: 17 },
  { monthKey: 'sep', railCapacity: 4.2, portBottleneck: 9, predictedArrival: 16, actualArrival: 16 },
  { monthKey: 'oct', railCapacity: 4.1, portBottleneck: 7, predictedArrival: 15, actualArrival: 15 },
  { monthKey: 'nov', railCapacity: 3.7, portBottleneck: 13, predictedArrival: 18, actualArrival: 20 },
  { monthKey: 'dec', railCapacity: 3.3, portBottleneck: 16, predictedArrival: 21, actualArrival: 23 },
];

export interface AlertItem {
  type: 'warning' | 'info' | 'success';
  titleKey: string;
  messageKey: string;
  timeKey: string;
}

export const aiAlertData = {
  company: 'ELGALOGISTICS LLC',
  alerts: [
    {
      type: 'warning' as const,
      titleKey: 'logAlertWarning',
      messageKey: 'logAlertWarningMsg',
      timeKey: 'time2h',
    },
    {
      type: 'info' as const,
      titleKey: 'logAlertInfo',
      messageKey: 'logAlertInfoMsg',
      timeKey: 'time5h',
    },
    {
      type: 'success' as const,
      titleKey: 'logAlertSuccess',
      messageKey: 'logAlertSuccessMsg',
      timeKey: 'time1d',
    },
  ],
};
