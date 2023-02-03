export interface AnnualTargetDataModel {
    AnnualTargetSelectedTab: string;
    jsonData: JsonData;
  }
  
  export interface JsonData {
    Availability?: DropdownOption;
    EBITDA?: DropdownOption;
    GenerationOutput?: DropdownOption;
    GrossMargin?: DropdownOption;
    HeatRate?: DropdownOption;
    MaintenanceCost?: DropdownOption;
    Name?: string;
    OPEX?: DropdownOption;
    OperationCost?: DropdownOption;
    Spread ?: DropdownOption;
    ThermalEfficiency?: DropdownOption;
    Type?: string;
  }
  export interface DropdownOption {
    Annual: Object;
    cumulativeBoolean: boolean;
    Daily: Object;
    ForecastCurrentYear: number;
    Monthly: Object;
    PlannedCurrentYear: number;
    Weekly: Object;
  }
  