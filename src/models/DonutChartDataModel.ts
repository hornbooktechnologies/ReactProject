import { i18n } from 'i18next';

export interface DonutChartDataModel extends DonutChartCustomData {
    series1: DonutChartSeries;
    series2: DonutChartSeries;
    value: number;
    plan?: number;
    forecast?: number;
    actual?: number;
}

export interface DonutChartOolModel extends DonutChartCustomData {
    value?: number;
    planHrs: number;
    forecastHrs: number;
    planpreviousHrs: number;
    forecastpreviousHrs: number;
    actual?: boolean;
    middleRatio?:boolean;
    suffix:string
}

export interface DonutChartCustomData {
    header?: string;
    type?: string;
    color: string;
    chartGradientType?: string;
    gradientColor1?: string;
    gradientColor2?: string;
    displayPage?: string;
}

interface DonutChartSeries {
    title: string;
    seriesValue: number;
    seriesPreviousValue?: number;
    prefix?: string;
    suffix1?: string;
    suffix2?: string;
}

export type DonutChartSeriesValWithDiffModel = {
    i18n?: i18n;
    header:string | undefined | null,
    operatingTime?:boolean;
    series1:{
        title: string | undefined | null,
        seriesValue: number,
        seriesPreviousValue: number,
        suffix1: string | undefined | null,
    }
    series2:{
        title: string | undefined | null,
        seriesValue: number,
        seriesPreviousValue: number,
        suffix1: string | undefined | null,
    }
    value:number | undefined | null;
    plan: number | undefined | null;
    forecast: number | undefined | null;
}
export type DonutChartLargeModel = {
    chartSection?: string;
    chartType?: string;
    data: DonutChartSeriesValWithDiffModel,
    height: number;
    width: number;
    removeTextTop?: boolean;
    customCssClass?: string;
}
export type DonutChartSeriesHeaderModel = {
    chartSection?: string;
    removeTextTop?: boolean;
    seriesPreviousValue?: number;
    seriesValue?: number | string;
    suffix1?: string;
    title?: string;
    type?:string;
    prefix?:string;
    
}