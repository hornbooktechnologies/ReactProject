export type TimeOfOutageModel = {
  donutchartAnnualData?: object | undefined | null
  donutchartData4_1?: object | undefined | null
  donutchartData3_31?: object | undefined | null
  plannedPositive?: object | undefined | null | any
  plannedNegative?: object | undefined | null | any
  plannedPositiveStartTopresent?: object | undefined | null | any
  plannedNegativeStartTopresent?: object | undefined | null | any
  annualImpact?: object | undefined | null | any
}
export type TimeOfOutageCardModel = {
  timeOfOutageAtOutageData: timeOfOutageAtOutageDataModel[]
}
export type timeOfOutageAtOutageDataModel = {
  NagetiveImpactHrs: number
  NagetivePreviousImpactHrs: number
  header: string
  plannedActualOrForcast: number
  plannedPlan: number
  plannedPreviousActualOrForcast: number
  plannedPreviousPlan: number
  positveImpactHrs: number
  positvePreviousImpactHrs: number
  presentCancledHrs: number
  presentCancledPreviousHrs: number
  presentCancledPreviousRecords: number
  presentCancledRecords: number
  presentPlannedActualOrForcast: number
  presentPlannedDecreseHrs: number
  presentPlannedDecreseRecords: number
  presentPlannedIncreseHrs: number
  presentPlannedIncreseRecords: number
  presentPlannedPlan: number
  presentPlannedPreviousActualOrForcast: number
  presentPlannedPreviousDecreseHrs: number
  presentPlannedPreviousDecreseRecords: number
  presentPlannedPreviousIncreseHrs: number
  presentPlannedPreviousIncreseRecords: number
  presentPlannedPreviousPlan: number
  presentUnplannedHrs: number
  presentUnplannedPreviousHrs: number
  presentUnplannedPreviousRecords: number
  presentUnplannedRecords: number
  endCancledHrs: number
  endCancledPreviousHrs: number
  endCancledPreviousRecords: number
  endCancledRecords: number
  endPlannedActualOrForcast: number
  endPlannedDecreseHrs: number
  endPlannedDecreseRecords: number
  endPlannedIncreseHrs: number
  endPlannedIncreseRecords: number
  endPlannedPlan: number
  endPlannedPreviousActualOrForcast: number
  endPlannedPreviousDecreseHrs: number
  endPlannedPreviousDecreseRecords: number
  endPlannedPreviousIncreseHrs: number
  endPlannedPreviousIncreseRecords: number
  endPlannedPreviousPlan: number
  endUnplannedHrs: number
  endUnplannedPreviousHrs: number
  endUnplannedPreviousRecords: number
  endUnplannedRecords: number
}

export type timeOutageDataModel = {
  PlantID: string
  UnitID: string
  Today: {
    StoppageTime:timeoutageApiData,
}
PreviousDay: {
  StoppageTime:timeoutageApiData,
}
}

export type timeoutageApiData = {
  Annual: {
    ActualOrForcastHours: number
    PlanHours: number
    PositveImpactHours: number
    NagetiveImpactHours: number
  },
  PresentToYearEnd: {
    ActualOrForcastHours: number
    CancledHours: number
    CancledRecords: number
    PlanHours: number
    PlannedDecreseHours: number
    PlannedDecreseRecords: number
    PlannedIncreseHours: number
    PlannedIncreseRecords: number
    UnplannedHours: number
    UnplannedRecords: number
  },
  YearStartToPresent: {
    ActualOrForcastHours: number
    CancledHours: number
    CancledRecords: number
    PlanHours: number
    PlannedDecreseHours: number
    PlannedDecreseRecords: number
    PlannedIncreseHours: number
    PlannedIncreseRecords: number
    UnplannedHours: number
    UnplannedRecords: number
  }
}