export type StoppageDataModel =  StoppageModel[] 

export type StoppageModel = { 
  ['actual-end-datetime']: Date | string | null | undefined
  ['actual-start-datetime']: Date | string | null
  ['boiler-stop-plate']: string
  ['cancellation-reason']: string | null
  cancelled: boolean
  ['coarse-stoppage-type']: string
  condenser: string
  ['fiscally-planned-end-datetime']: Date | undefined | null
  ['fiscally-planned-start-datetime']: Date | undefined | null
  from: Date | string | null
  id: number
  ['instruction-id']: number | null
  ['loss-amount']: number
  name: string
  ['non-regular-inspection-stoppage-id']: number
  ['object-number']: number | null
  ['power-plant-id']: string
  ['power-plant-unit-id']: string
  ['record-type']: string
  ['scheduled-end-datetime']: Date | null | undefined
  ['scheduled-start-datetime']: Date | null | undefined | any
  ['shortest-delivery']: string | null
  ['stoppage-type']: string
  ['turbine-stop-plate']: string
  ['unplanned-due-to-external-cause']: string | null
  until: Date | string | null
}  | any 

export type KpiApiRes = {
  PlantID: string
  UnitID: string
  Today: {
      SellingPriceAtOutage: SellingPriceApiSpec,
      GrossMarginImpact: ImpactOfApiSpec,
  }
  PreviousDay: {
      SellingPriceAtOutage: SellingPriceApiSpec,
      GrossMarginImpact: ImpactOfApiSpec,
  }
}

export type SellingPriceApiSpec = {
  Suffix: string
  Annual: {
      PlannedPlanAvgPrice: number
      PlannedActualOrForcastAvgPrice: number
      UnplannedAvgPrice: number
  },
  YearStartToPresent: {
      PlannedPlanAvgPrice: number
      PlannedPlanRecords: number
      PlannedActualOrForcastAvgPrice: number
      PlannedActualOrForcastRecords: number
      UnplannedAvgPrice: number
      UnplannedRecords: number   
  },
  PresentToYearEnd: {
      PlannedPlanAvgPrice: number
      PlannedPlanRecords: number
      PlannedActualOrForcastAvgPrice: number
      PlannedActualOrForcastRecords: number
      UnplannedAvgPrice: number
      UnplannedRecords: number   
  }
}
export type ImpactOfApiSpec = {
  Suffix: string
  Prefix: string
  Annual: {
      PluseImpact:number,
      MinuseImpact:number
  },
  YearStartToPresent: {
      PluseImpact:number,
      MinuseImpact:number
  },
  PresentToYearEnd: {
      PluseImpact:number,
      MinuseImpact:number
  }
}