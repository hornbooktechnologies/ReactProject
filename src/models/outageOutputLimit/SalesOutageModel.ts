export type SalesOutage = {
  plannedPlan?: number | string
  plannedActual?: number | string
  unplannedActual?: number | string
  plannedActualSubValue?: number
  unplannedActualSubValue?: number
  plannedPlanSubValue?: number
  plannedPreviousActual?: number| string
  plannedPreviousPlan?: number| string
  unplannedPreviousActual?: number| string
}
export type ImpactofOutageApiModel = {
    prefix: string,
    suffix: string,
    value: number| string,
    positiveVal: number | string,
    negativeVal: number | string,
    valuePrevious:  number|string,
    positivePreviousVal: number | string,
    negetivePreviousVal: number | string,
    title:string
}

export type SalesOutageCardModel = SalesOutage & {
    header: string | null
    
}


