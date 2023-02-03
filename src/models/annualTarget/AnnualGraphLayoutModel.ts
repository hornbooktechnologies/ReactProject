import { DropdownOption } from "./AnnualTargetDataModel";
import {DonutChartCustomData} from "../DonutChartDataModel";

export interface AnnualGraphLayoutModel {
  GraphLayout: {
    lineData: DropdownOption | undefined;
    donutchartData: DonutChartCustomData;
    name: string;
    cumulativeBoolean: boolean;
  }[];
  noDataHandler: (val: number, selectValue: string) => void;
  time: number;
  freqValue: string;
  chartType?:string;
}
