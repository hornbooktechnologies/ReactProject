export type NegOperationTimeModel =  {
  header: string ,
  plan:number | string,
  actualOrForecast:number | string,
  previousPlan?:number | undefined | null | string,
  previousActualOrForecast?:number | undefined | null | string,
  suffix?:string | undefined | null,
  titleX?:string | undefined | null,
  titleY?:string | undefined | null,
}
export type NegativeOperationTimeModel =  NegOperationTimeModel[]
export type NegOperationTimeDonutChartModel = {negOperationTime :NegOperationTimeModel[] }

