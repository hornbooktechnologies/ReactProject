export const AppConstant = {
  //Global constants
  OVERVIEW: 'Overview',
  GROSSMARGIN: 'GrossMargin',
  OPEX: 'Opex',
  SELECTED_UNIT: 'SelectedUnit',
  SELECTED_UNIT_ID: 'SelectedUnitId',
  SELECTED_NAV_INDEX: 'SelectedNavIndex',
  LANGUAGE_SETTING_EN: 'en',
  BEARER_TXT: 'Bearer ',
  OTHER: 'Other',
  OUTAGE_MEASURE_UNIT: '円/kWh',
  OUTAGE_MEASURE_CHART_UNIT: '円/Kw',
  PREFIX : '¥',
  ACTUAL: 'Actual',
  FORECAST: 'Forecast',
  ANNUAL_GROSSMARGIN:'Annual Total Gross Margin',
  YEAR:'year', 
  OPERATING_TIME:'operatingTime',
  PLUS_SYMBOL :'+',
  MINUS_SYMBOL :'-',

}
export const URLConstants = {
  //API Name
  API_USER: 'user',
  API_KPI002: 'screenkpi002',
  API_KPI003: 'screenkpi003',
  API_KPI004: 'kpi004',
  API_KPI005: 'kpi005',
  API_STOPPAGE:'stoppages', 

  //OOT constant Name
  API: 'api',
  POWER_PLANT_ID: 'power-plant-id',
  YEAR:'year', 
  VERSION:'v1', 
  OOT_APP_URL: process.env.REACT_APP_OOT_REDIRECT_URI,
  PLANT_CODE: 'plantCode',
  UNIT_CODE: 'unitCode',
  SALES: "sales",
  //URL constants
  API_URL: `${process.env.REACT_APP_API_URL}/dpm`,
  OOT_API_URL: `${process.env.REACT_APP_API_URL}/oot`,
  GET_USER_PREF_API_URL: (userId: string) =>
    `${URLConstants.API_URL}/${URLConstants.API_USER}/${userId}`,
  GET_CURRENT_STATUS_API_URL: (plantname: string, unit: string|null) =>
    `${URLConstants.API_URL}/${plantname}/${URLConstants.API_KPI002}/${unit}`,
  GET_ANNUAL_TARGET_API_URL: (plantname: string, unit: string, epochSeconds: number) =>
    `${URLConstants.API_URL}/${plantname}/${URLConstants.API_KPI003}/${unit}/${epochSeconds}`,
  GET_STOPPAGE_API_URL: ( palntId: string, unitCode: string) => {
    let url = `${URLConstants.API_URL}/${URLConstants.API_STOPPAGE}/?${URLConstants.PLANT_CODE}=${palntId}`;
    if (unitCode) url = `${url}&${URLConstants.UNIT_CODE}=${unitCode}`
    return url;
  },
  GET_KPI_004_API_URL: ( palntId: string, unitId: string) => {
    let url = `${URLConstants.API_URL}/${URLConstants.API_KPI004}/?${URLConstants.PLANT_CODE}=${palntId}`;
    if (unitId) url = `${url}&${URLConstants.UNIT_CODE}=${unitId}`
    return url;
  },
  GET_KPI_005_API_URL: ( palntId: string, unitId: string) => {
    let url = `${URLConstants.API_URL}/${URLConstants.API_KPI005}/?${URLConstants.PLANT_CODE}=${palntId}`;
    if (unitId) url = `${url}&${URLConstants.UNIT_CODE}=${unitId}`
    return url;
  },
  GET_SALES_URL: (palntId: string, unitId: string) =>
    `${URLConstants.API_URL}/${URLConstants.SALES}/${palntId}/${unitId}`,
   
  CurrentStatus: 'CurrentStatus',
  ANNUAL_TARGET: 'AnnualTarget',
  OUTAGE_OUTPUT_LIMIT: 'OutageOutputLimit',
  UNIT_OPERATION: 'UnitOperation',

  //Routes Path constants
  ROUTE_ROOT_PATH: '/',
  ROUTE_HOME_PATH: '/home',
  ROUTE_CURRENT_STATUS_PATH: '/CurrentStatus',
  ROUTE_ANUAL_TARGET_PATH: '/AnnualTarget',
  ROUTE_OUTAGE_OUTPUT_LIMIT_PATH: '/OutageOutputlimit',
  ROUTE_UNIT_OPRATION_PATH: '/UnitOperation',
  GET_ROUTE_ANNUAL_ROUTE_PATH: (unitId: string) => `/${unitId}/AnnualTarget`,
  GET_ROUTE_CURRENT_STATUS_PATH: (unitId: string) => `/${unitId}/CurrentStatus`,
  GET_ROUTE_OUTAGE_OUTPUT_LIMIT_PATH: (unitId: string) =>`/${unitId}/OutageOutputlimit`,
  GET_ROUTE_UNIT_OPRATION_PATH: (unitId: string) =>`/${unitId}/UnitOperation`,

  // Footer Feedback Link //
  FEEDBACK_LINK:
    'https://forms.office.com/Pages/ResponsePage.aspx?id=mzhAKIEPb0m3Qqx5Sl2mHjWooJHr6C1OkkPRy1UgdDRUNURXTFE5RVNGU1JZSTlWNkdIVEhIRDJPNi4u&fsw=0',
}
export const UserPrefModelConstant = {
  //Property name constants for UserPreferance
  POWER_TITLE:'power-title',
  POWER_PLANT_ID: 'power-plant-id',
  POWER_PLANT_NAME_FOR_DISPLAY: 'power-plant-name-for-display',
  POWER_PLANT_NAME_FOR_KPI_API: 'power-plant-name-for-kpi-api',
  POWER_PLANT_UNIT_ID: 'power-plant-unit-id',
  POWER_PLANT_UNIT_ID_URL: 'power-plant-unit-id=',
  AND_POWER_PLANT_UNIT_ID_URL: '&power-plant-unit-id=',
  GENERATOR_NAME_FOR_DISPLAY: 'generator-name-for-display',
  GENERATOR_NAME_FOR_KPI_API: 'generator-name-for-kpi-api',
  GENERATORS: 'generators'
}
export const AuthConstant = {
  //Authentication constants
  USER_INFO: 'userInfo',
  USER_SETTING: 'userSetting,',
  ACCESS_TOKEN: 'accessToken',
  IS_LOGGED_IN: 'isLoggedIn',
  USER_PREFERENCE: 'userPreference',
  SELECTED_USER_PREFERENCE: 'selecteduserPreference',
}

export const AuthHeader = {
  AUTHORIZATION: 'Authorization'
}

export const DateformatConstant = {
  //Date fields constants
  YYYY:'YYYY',
  MMMM_YYYY: 'MMMM YYYY',
  MMMM_DO_YYYY:'MMMM Do YYYY',
  MMMM_DO:'MMMM Do',
  YYYY_MM_DDT00:'YYYY-MM-DDT00:00',
  YYYY_MM_DDTHH_MM:'YYYY-MM-DDTHH:mm', 
  MMM:'MMM',
  DDD_DO:'ddd Do',
  DDD:'ddd',
  HH:'hh',
  HH_MM:'HH:mm',
  YYY_MMM_DD_HH_mm: 'yyy MMM DD HH mm', 
  YYY_MMM: 'yyy MMM',
  YYY_MMM_DD: 'yyy MMM DD',
  YYYY_MM_01T00: 'YYYY-MM-01T00:00',
  TIMELINE_CHART_TOOLTIP_FORMAT: 'yyyy/d/M',
  M_D: 'M/d',
  FISCAL_YEAR:'-04-01T00:00:00',
  FISCAL_END_YEAR:'-03-31T23:59:59',
  CUTOFF_FORMAT: `yyyy-MM-dd'T'HH:mm:ss`,
  YYYY_M_D_HH_MM: `YYYY/M/D HH:mm`,
  SUN:'Sun',
  MM_DD_YYYY:'MM-DD - YYYY',
  MM_DD:'MM-DD'
}

export const ChartConstant = {
  //Line chart constants for annual data
  ANNUAL_DATA: 'AnnualData',
  CUMULATIVE_DATA: 'CumulativeData',
  MONTHLY_DATA: 'MonthlyData',
  WEEKLY_DATA: 'WeeklyData',
  DAILY_DATA:'DailyData',
  EST_FOR_MONTH:'Est. for Month',
  EST_FOR_WEEK:'Est. for Week',
  EST_FOR_DAY:'Est. for Day',
  FORECAST_COLOR:'#54AFDE',
  PLANNED_COLOR:'#F0AA54',
  ACTUAL_COLOR:'#E56D75',
  ACTUAL_LINE_STROKE:'#E0515A',
  PLANNED_LINE_STROKE:'#ED9933',
  FORECAST_LINE_STROKE:'#33A0D7',
  LABEL_COLOR:'#AAB9C1',
  LABEL_TEXT_COLOR:'#231F20',
  WHITE_STROKE: '#fff',
  TICKLINE_STROKE: '#748994',
  VIEWBOX_20: 20,
  VIEWBOX_75: 75,
  OUTAGE_LINE_CHART_STROKE: 'rgba(240, 170, 84, 0.84)',
  FORECAST: 'Forecast',
  PLANNED: 'Planned',
  OPACITY: 0.6,
  TIMELINE_CHART_GRID_STROKE_AMOUNT: 4,
  ANNOTATION: {
    FONT_SIZE: '8px',
    FONT_FAMILY: 'Noto Sans JP'
  },
  SPREAD_YAXISLABEL:"¥ Man",
  WEEK:'week',
}

export const NavConstant = {
  //Constant for navigation KAWASAKI
  SIDEBAR_NAV_ITEM: 'SidebarNavItem',
  SIDEBAR_NAV_DROPDOWN: 'SidebarNavDropdown',
  SUBITEMID : 'subItemId'
}
export const AnnualTargetConstant = {
  //Constant of Annual Data
  ANNUAL_DATA: 'AnnualData',
  EBITDA: 'EBITDA',
  OPEX: 'OPEX',
  OPERATIONAL_COST: 'OperationCost',
  MAINTENANCE_COST: 'MaintenanceCost',
  ELECTRIC_ENERGY_SOLD: 'ElectricEnergySold',
  SPREAD: 'Spread',
  AVAILABILITY: 'Availability',
  THERMAL_EFFICIENCY: 'ThermalEfficiency',
  HEAT_RATE: 'HeatRate',
  ANNUAL_TARGET:'annualTarget'
}
export const ChartColors = {
  //color of charts
  _007CBB: '#007CBB',
  _E7466E: '#E7466E',
  _F2B08B: '#F2B08B',
  _FF5A02: '#FF5A02',
  _9FCD72: '#9FCD72',
  _54AFDE: '#54AFDE',
  _E56D75: '#E56D75',
  _F0AA54: '#F0AA54',
  _66A428: '#66A428',
  _e0708c: '#e0708c',
  _e1646c: '#e1646c',
  _efa750: '#efa750',
  _d57806: '#d57806',
  _C5222D: '#C5222D',
  _D37400: '#D37400',
  _D82531: '#D82531',
  _E88000: '#E88000',
  _FFB200: '#FFB200',
  _1355cf: '#1355cf',
  _455054: '#455054',
  _ccc: '#ccc',
}
export const DropDownConstant= {
  //Constant of Dropdown List  
  ANNUAL_DATA:'AnnualData',
  MONTHLY_DATA:'MonthlyData',
  WEEKLY_DATA:'WeeklyData',
  DAILY_DATA:'DailyData',
  CUMULATIVE_DATA:'CumulativeData',
  }
export const DropDownOptions={
    ANNUAL_VIEW:'Year',			
    MONTHLY:'Month',			
    WEEKLY:'Week',			
    DAILY:'Day',			
    CUMULATIVE:'Cumulative',	
  }
export const LanguageDropDown = {
  LANG_JAPANESE:'日本語',
  LANG_ENGLISH:'English',
}
export const PlantDropDown = {
  PLANT:'Plants'
}
export const ChartType = {
  LARGE: 'large',
  SMALL: 'small',
  COST: 'cost'
}
export const ChartGradientType = {
  GREEN: 'green',
  BLUE: 'blue',
  RED: 'red',
  SOFT_RED: 'soft_red',
  SOFT_ORANGE: 'soft_orange',
  STRONG_RED: 'strong_red',
}
export const OutageOutputConstant = {
  ANNUAL : 'Annual',
  PREVIOUSTOPRESENT : 'previoustopresent',
  PRESENTTOEND : 'presenttoend',
  CoarseStoppageType: {
    Unplanned: 'U',
    Planned: 'P',
  },
  INCREASED_PLANED:'Increased Planned Outage Time',
  UNPLANNED_OUTAGE:'Unplanned Outage',
  REDUCED_PLANED:'Reduced Planned Outage Time',
  CANCELLED_PLANED:'Cancelled Planned Outage',
  NEGATIVE_VAL:'negativeVal',
  POSITIVE_VAL:'positiveVal',
}
export const TIMEZONE = {
  JPN_TIMEZONE: 32400000,
  ASIA_TOKYO: 'Asia/Tokyo',
}

export const MathConstant = {
  DEFAULT_FRACTION_STRING: '0.0',
  _1000: 1000,
}

export const ApiErrorConstant = {
  NO_DATA: 'No Data available'
}

export const UnitOperationConstant = {
  NO_DATA: 'No Data available'
}
export const NumberConstant = {
  ZERO:0,
  ONE: 1,
  TWO: 2,
}
export const ValueOfConstant = {
  VALUE_0: 0,
}
export const ApiResponseConstant = {
  STATUS_200 : 200,
}

