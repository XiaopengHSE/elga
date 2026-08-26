export interface RailwayStage {
  year: string;
  capacity: string;
  capacityEn: string;
}

export const railwayExpansion: RailwayStage[] = [
  { year: '2020', capacity: '12 млн т/год', capacityEn: '12 Mt/y' },
  { year: '2021', capacity: '15 млн т/год', capacityEn: '15 Mt/y' },
  { year: '2022', capacity: '24 млн т/год', capacityEn: '24 Mt/y' },
  { year: '2023–2035', capacity: '30 млн т/год', capacityEn: '30 Mt/y' },
];

export interface ProductionPlan {
  year: string;
  mining: number;
  shipment: number;
}

export const productionPlan: ProductionPlan[] = [
  { year: '2020', mining: 7, shipment: 7 },
  { year: '2021', mining: 18, shipment: 15 },
  { year: '2022', mining: 35, shipment: 24 },
  { year: '2023–2035', mining: 45, shipment: 30 },
];
