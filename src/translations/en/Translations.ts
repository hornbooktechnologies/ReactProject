export const TRANSLATIONS_EN = {

  LABELS: {
    LANGUAGE: 'Language',
    LAN: 'Lan',
    JAPANESE: 'Japanese',
    FEEDBACK: 'Feedback',
    FAILED_LOAD_DATA :'Failed to acquire information',
    OPEX:'OPEX',
    EBITDA:'EBITDA',
    SUFFIX : 'Oku',
    ACTUAL: 'Actual',
    FORECAST:'Forecast',
    PLAN:'Plan',
    MAINTENANCE_COST:'Maintenance Cost',
    ELECT_ENG_SOLD:'Electrical Energy Sold',
    THERMAL_EFFICIENCY:'Thermal Efficiency',
    PRESENT: 'Present',
    ANNUAL: "Annual",
    YEAR_START_TO_PRESENT: "4/1 ~ Present",
    PRESENT_TO_YEAR_END: "Present ~ 3/31",
    ACTUAL_FORECAST:"Actual/Forecast",
    YEN_kWh:"YEN/kWh",
    HRS: "Hrs",
    RETURN:'Return',
    SPREAD_OPEARTION_TIME:"Actual Spread<0 Operation Time",
    DISPLAY:'Display'
  },

  CHARTS: {
    DONUT: {
      TOOLTIP_HEAD: 'Total Ratio',
      TOOLTIP_MAIN_TEXT: 'The Total Ratio',
      TOOLTIP_SUB_TEXT: 'is the difference between two amounts.',
      EQUATION: 'Equation',
      EQUATION_LHS: 'P%',
    }
  },

  LOGIN:{
    AZURE_CLIENT_NOT_CONFIGURED: 'Authentication Client ID is not configured',
    LOGIN_FAILED: 'Failed to authentication user',
    LOGIN_BTN: 'Login',
  },

  LOGOUT:{
    LOGOUT_BTN: 'Logout',
  },

  NAVIGATION:{
    OVERVIEW: 'Overview',				
    CURRENT_STATUS: 'Current Status',				
    ANNUAL_TARGET: 'Annual Target',				
    OUTAGE_OUTPUT_LIMIT: 'Outage & Output limit',				
    SPREAD_OPERATING: 'Spread<0 Operating',				
    KAWASAKI: 'Kawasaki',				
    HITACHINAKA: 'Hitachinaka',				
    SHIN_NAGOYA: 'Shin-Nagoya',				
    HEKINAN: 'Hekinan'
  },
  DROPDOWN_OPTIONS:{
    ANNUAL_VIEW:'Annual View',			
    MONTHLY:'Monthly',			
    WEEKLY:'Weekly',			
    DAILY:'Daily',			
    CUMULATIVE:'Cumulative',	
  },

  CURRENT_STATUS:{
    TITLE:'Current Status',
    DESCRIPTION: 'Overview of gross margin, OPEX, Operation & maintenance costs etc...',
    GROSS_MARGIN:'Gross Margin',
    OTHER: 'Other',
    ACTUAL_TO_DT:'Actual (To-Date)',
    FORECAST_YT_END:'Forecast (To Year End)',
    OPERATIONAL_COST:'Operational Cost',
    OPEX_TOTAL:'OPEX Total',
    ANNUAL_TOTAL_GR_MARGIN:'Annual Total Gross Margin',
    FORCAST_REVERSE_ZAYA_DR_TIME:'Forcast Spread<0 Operation Time',
    AVAILABILITY:'Availability',
    SPREAD:'Spread',
  },

  ANNUAL_TARGET : {
    TITLE:'Annual Target',
    DESCRIPTION: 'Overview of gross margin, OPEX, Operation & maintenance costs etc...',
    OVERVIEW:'Overview',
    PLANNED:'Planned',
    EST_FOR_YR:'Est. for Year',
    OKU:'OKU',
    ACTUAL_CURRENT:'Actual ( Current )',
    TO_DATE:'To-date',
    FORECAST_REMAINING:'Forecast ( Remaining )',
    REMAINING:'Remaining',
    GROSS_MARGIN:'GrossMargin',
    GROSS_MARGIN_BUTTON:'Gross Margin',
    SPREAD:'Spread',
    AVAILABLITY:'Availablity',
    HEAT_RATE:'Heat Rate',
    OPERATION_COST:'Operation Cost',			
    NO_DATA_AVAILABLE: 'No Data Available'	
  },

  OUTAGE_OUTPUTLIMIT_TITLE: {
    TIME_OF_OUTAGE: "Time of outage",
    IMPACT_EBITDA: "Impact of outages on EBITDA（Plan)"
  },

  OUTAGE_AND_OUTPUT_LIMIT: {
    TITLE:'Outage & Output limit',
    SECTION_ONE_HEADING: 'Plan / Forecast & Actual',
    SECTION_FOUR_HEADING: 'Selling price at outage',
    PLANNED_PLAN: 'Planned(Plan)',
    PLANNED_ACTUAL: 'Planned(Actual)',
    UNPLANNED_ACTUAL: 'Unplanned(Actual)',
    MARKET_PRICE: 'Market Price',
    OUTAGE_PRICE_SUB_UNIT: ' Subject',
    PLAN: 'Plan',
    ACTUAL_AND_FORECAST: 'Actual & Forecast',
    CHART_LEGENDS: {
      ACTUAL: 'Actual',
      FORECAST: 'Forecast',
      SALES_UNIT_PRICE: 'Sales Unit Price',
    },
    PREFIX : '¥',
    INCREMENT_IMPACT:'+ Impact',
    DECREMENT_IMPACT:'- Impact',
    IMPACT:'Impact',
    MOVE_TO_OOT_SCREEN:"Move to OOT Screen"
  },
  UNIT_OPERATION:{
    TITLE:"Spread<0 Operating",
    DESCRIPTION:"Operation index unit operation related information display",
    IMPACT_SPREAD_EBITDA:"Impact Of Spread<0 Operation On EBITDA (Plan)",
    GROSSMARGIN_SPREAD:"Gross Margin (Spread<0)",
    AMOUNT_OPERATING_SPREAD:"Amount of operating time(Spread<0)",
    AVERAGE_SPREAD:"Average spread(Spread<0 operation)",
    PREVIOUS_DAY:" Previous Day:",
    DURATION_OF_SPREAD_HEADER: 'Top 20 Duration of Spread < 0 Operation​',
    DURATION_OF_SPREAD_TABLE_HEADER: {
      NO: 'No.',
      DURATION: 'Duration',
      GENERATOR: 'Generator',
      OPERATION_START: 'Spread < 0 Operation Start',
      OPERATION_END: 'Spread < 0 Operation End',
      OUTPUT: 'Output',
      GROSS_MARGIN: 'Gross Margin',
      SPREAD: 'Spread',
      OUTPUT_UNIT: 'MW',
      GROSS_MARGIN_UNIT: 'Oku',
      SPREAD_UNIT: 'YEN/KWh',
      AVERAGE: 'Average',
    },
    REFERENCE_SPECIFICATION_HEADER: 'Reference specifications of Spread < 0 operation',
    REFERENCE_SPECIFICATION_TABLE_HEADER: {
      NoOfStartStop: 'Number of Start/Stop',
    },
    REFERENCE_SPECIFICATION_UNIT: '回',
    SPREAD_CASES_TITLE:"Spread<0 Number of cases by duration",
    SPECIFICATION_SPREAD:"Reference specifications of Spread<0 operation",
    SPREAD_OPERATION:"Spread Operation",
    DROPDOWN_TITLE:"Startup Mode",
    }
}
