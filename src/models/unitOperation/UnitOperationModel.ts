
export type UnitOperationBaseModel = {
    grossMargin: TimeFrameBaseModel
    amountOfOperatingTime: TimeFrameBaseModel
    averageSpread: TimeFrameBaseModel
    top20DurationOfSpread: DurationOfSpreadTypeModel
    referenceSpecification: ValuesBaseModel
    spreadBarChart:SpreadDurationModel
}

export type Kpi_005ApiRes = {
  PlantID: string
  UnitID: string
  Today: {
    NegativeOperationGrossMargin: NegOperationGrossMargin,
    NegativeOperationTime: NegOperationTime,
    NegativeOperationAvgSpread:NegOperationAvgSpread,
  
  }
  PreviousDay: {
    NegativeOperationGrossMargin: NegOperationGrossMargin,
    NegativeOperationTime: NegOperationTime,
    NegativeOperationAvgSpread:NegOperationAvgSpread,
  }
}
export type NegOperationGrossMargin = {
  Prefix: string
  Suffix: string
  Annual: {
    ImpactOnEBITDA: number,
    Plan: number,
    ActualOrForcast: number,
  },
  YearStartToPresent: {
    ImpactOnEBITDA: number,
    Plan: number,
    ActualOrForcast: number,
  },
  PresentToYearEnd: {
    ImpactOnEBITDA: number,
    Plan: number,
    ActualOrForcast: number,  
  }
}
export type NegOperationTime = {
  Suffix: string
  Annual: {
    Plan: number,
    ActualOrForcast: number,
  },
  YearStartToPresent: {
    Plan: number,
    ActualOrForcast: number,
  },
  PresentToYearEnd: {
    Plan: number,
    ActualOrForcast: number,  
  }
}
export type NegOperationAvgSpread = {
  Suffix: string
  Annual: {
    Plan: number,
    ActualOrForcast: number,
  },
  YearStartToPresent: {
    Plan: number,
    ActualOrForcast: number,
  },
  PresentToYearEnd: {
    Plan: number,
    ActualOrForcast: number,  
  }
}
export type SpreadDurationModel = {
  value?: number;
  Name?: string;
};
export type TimeFrameBaseModel = {
  today: OperatingTimeBaseModel;
  previousDay: OperatingTimeBaseModel;
};

export type OperatingTimeBaseModel = {
  annual: ValuesBaseModel;
  fiscalYearStartToPresent: ValuesBaseModel;
  presentToFiscalYearEnd: ValuesBaseModel;
};

export type ValuesBaseModel = {
    plan?: number
    forecast?: number
    actual?: number
    prefix?: string
    suffix?: string
}

export type DurationOfSpreadTypeModel = {
    actual: DurationOfSpreadModel[]
    forecast: DurationOfSpreadModel[]
}

export type DurationOfSpreadModel = {
    duration: number
    generator: string
    spreadOperationStart: string
    spreadOperationEnd: string
    output: number
    grossMargin: number
    spread: number
}

export type TabDataModel = {
  numberOfCasesTab: string;
  spreadBarData: SpreadBarChartDataModel[];
};

export type SpreadBarChartDataModel = {
    spreadBarData: { Value: number; Name: string }[];
};

export type SpecificationSpreadDataModel = {
  noDataHandler: (val: number, selectValue: string) => void;
  spreadOperation:SpreadOperationOptionBaseDataModel;
  time:number;
};

export interface SpreadOperationOptionBaseDataModel {
  Annual: Object;
  Monthly: Object;
}
export interface SpreadLineChartDataModel {
  data: SpreadLineChartBaseDataModel[] | undefined;
  selectValue: string;
  list?:string[];
  selectedUnitId: string;
  selectedTitleDropdown:string | undefined
}
export interface SpreadLineChartBaseDataModel {
  Period: string;
  Spread: number;
  TimeStamp: number;
  poweTitle: string;
  powerPlantUnitId:string
}
export interface titleDropdownModel {
 value: string;
 label: string;
}
