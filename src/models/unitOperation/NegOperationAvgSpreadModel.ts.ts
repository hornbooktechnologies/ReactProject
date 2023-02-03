export type NegOperationAvgSpreadModel = {negOperationAvrgSpread:AverageSpreadCardModel[]}
export type NegativeOperationAvgSpreadModel = AverageSpreadCardModel[]

export type AverageSpreadCardModel = {
  title: string,
  Suffix: string,
  plan: AverageSpreadRecordModel
  actual_forcast?: AverageSpreadRecordModel
  yearStartToPresent?: AverageSpreadRecordModel
}

export type AverageSpreadRecordModel = {
  header?:string | undefined
  previousValue?: number | undefined | string
  suffix?: string 
  value?: number | undefined | string
}
