import { SetStateAction } from "react"

export type LinechartDropdownModel = {
    onSelectHandler: (selectValue: {label: string; value: string}) => void;
    cumulativeDisable: boolean;
    customClass?:string;
    selectValue?:string;
    isSpreadOptions?:boolean;
}
export type EstmationModel = {
    linechartData:linechartDataModel;
    dataEstList: object;
    estimate: string;
    selectValue: string;
}
export type DataChangeOptionsModel = {
    selectValue: string;
    linechartData:linechartDataModel | undefined;
    onClickPrev: () => void;
    startDate: object|Date[];
    setStartDate: (startDate:SetStateAction<Date>)=>void;
    onClickNext: () => void;
    ind: string;
    customClass?:string;
 }
export type CustomTooltipModel = {
    selectValue?:string;
    linechartData?:linechartDataModel;
    active?:boolean;
    payload?:{name:string, value:number ,length:number, payload: {Period:string}}[];
 }
export type ResponsiveContainerModel = {
    data:{Planned:number, Forecast:number, Actual:number}[];
    selectValue:string;
    longestLabelLength:number;
    ylabel:string;
    linechartData:linechartDataModel;
    ForecastList:length;
    PlannedList:length;
    ActualList:length;
    list:object;
    Today:string|number|Date|object;
 }
 export interface linechartDataModel {
    Prefix: string;
    Suffix: string;
    datelabel:string;
    nextDisable:boolean;
    currentDisable:boolean;
    graphData?:string;
    indexFound: boolean;
}
 interface length {
    length:number;
}
