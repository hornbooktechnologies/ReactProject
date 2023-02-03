export interface Stoppage {
    'scheduled-start-datetime': string | undefined
    'scheduled-end-datetime': string | undefined
    'fiscally-planned-start-datetime': string | undefined
    'fiscally-planned-end-datetime': string | undefined
    'actual-start-datetime': string | undefined
    'actual-end-datetime': string | undefined
    planName: string
    unitName: string
}

export type PlannedList = PlannedOutage[]

export type PlannedOutage = {
  id: number // id
  name: string // 件名
  'fiscally-planned-start-datetime': string | undefined
  'fiscally-planned-end-datetime': string | undefined
  'scheduled-start-datetime': string | undefined // 計画開始日
  'scheduled-end-datetime': string | undefined // 計画終了日
  'actual-start-datetime': string | undefined // 実績開始日
  'actual-end-datetime': string | undefined // 実績終了日
  'stoppage-type': string
  'is-planned': boolean
  'power-plant-id': string
  'power-plant-unit-id': string
  'boiler-stop-plate': string // ボイラー停止状態
  'turbine-stop-plate': string // タービン停止状態
  condenser: string // 復水器
  'coarse-stoppage-type': string
  cancelled: boolean
}

export type PlannedListApiSpec = PlannedOutageApiSpec[];

export type PlannedOutageApiSpec = {
  PlantCode: string
  UnitCode: string
  Name: string
  PlanStart: string
  PlanEnd: string
  ForecastStart: string
  ForecastEnd: string
  ActualStart: string
  ActualEnd: string
  CoarseStoppageType: string
  Cancelled: boolean
}

export type DailyAveragePrices = price[]

type price = {
  x: number
  y: number
}