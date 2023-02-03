export const unitOperationMockData = {
    "grossMargin": {
        "today": {
            "annual": {
                "plan": -11.49,
                "actual": -44.7,
                "prefix": "¥",
                "suffix": "Oku"
            },
            "fiscalYearStartToPresent": {
                "plan": -8.71,
                "actual": -10.15,
                "prefix": "¥",
                "suffix": "Oku"
            },
            "presentToFiscalYearEnd": {
                "plan": -2.77,
                "actual": -34.65,
                "prefix": "¥",
                "suffix": "Oku"
            }
        },
        "previousDay": {
            "annual": {
                "plan": -11.49,
                "actual": -43.70,
                "prefix": "¥",
                "suffix": "Oku"
            },
            "fiscalYearStartToPresent": {
                "plan": -8.71,
                "actual": -10.05,
                "prefix": "¥",
                "suffix": "Oku"
            },
            "presentToFiscalYearEnd": {
                "plan": -21.77,
                "actual": -34.65,
                "prefix": "¥",
                "suffix": "Oku"
            }
        }
    },
    "amountOfOperatingTime": {
        "today": {
            "annual": {
                "plan": 4558,
                "actual": 5013,
                "prefix": "",
                "suffix": "Hrs"
            },
            "fiscalYearStartToPresent": {
                "plan": 2545,
                "actual": 3689,
                "prefix": "",
                "suffix": "Hrs"
            },
            "presentToFiscalYearEnd": {
                "plan": 2013,
                "actual": 1324,
                "prefix": "",
                "suffix": "Hrs"
            }
        },
        "previousDay": {
            "annual": {
                "plan": 4000,
                "actual": 5013,
                "prefix": "",
                "suffix": "Hrs"
            },
            "fiscalYearStartToPresent": {
                "plan": 2545,
                "actual": 3689,
                "prefix": "",
                "suffix": "Hrs"
            },
            "presentToFiscalYearEnd": {
                "plan": 2013,
                "actual": 1224,
                "prefix": "",
                "suffix": "Hrs"
            }
        }
    },
    "averageSpread": {
        "today": {
            "annual": {
                "plan": -0.53,  
                "actual": -1.38,
                "prefix": "",
                "suffix": "YEN/kWh"
            },
            "fiscalYearStartToPresent": {
                "plan": -0.56,
                "actual": -0.73,
                "prefix": "",
                "suffix": "YEN/kWh"
            },
            "presentToFiscalYearEnd": {
                "plan": -0.43,
                "actual": -4.17,
                "prefix": "",
                "suffix": "YEN/kWh"
            }
        },
        "previousDay": {
            "annual": {
                "plan": -0.53,  
                "actual": -1.38,
                "prefix": "",
                "suffix": "YEN/kWh"
            },
            "fiscalYearStartToPresent": {
                "plan": -0.40,
                "actual": -0.73,
                "prefix": "",
                "suffix": "YEN/kWh"
            },
            "presentToFiscalYearEnd": {
                "plan": -0.43,
                "actual": -5.17,
                "prefix": "",
                "suffix": "YEN/kWh"
            }
        }
    },
    "top20DurationOfSpread": {
        "actual": generateDurationOfSpreadMockData(),
        "forecast": generateDurationOfSpreadMockData(),
    },
    "referenceSpecification": {
        "actual": 1,
        "forecast": 2,
    },
    "spreadBarChart":spreadBarChartMockData(),
}
export const unitOperationApiMockData = {
    Data: {
      Today: {
        NegativeOperationGrossMargin: {
          Annual: {
            ImpactOnEBITDA: 9,
            Plan: 31,
            ActualOrForcast: 20,
          },
          YearStartToPresent: {
            ImpactOnEBITDA: -8,
            Plan: 25,
            ActualOrForcast: 33,
          },
          PresentToYearEnd: {
            ImpactOnEBITDA: 19,
            Plan: -14,
            ActualOrForcast: -33,
          },
        },
        NegativeOperationTime: {
          Suffix:'Hrs',
          Annual: {
            Plan: 4558,
            ActualOrForcast:5013,
          },
          YearStartToPresent: {
            Plan: 2545,
            ActualOrForcast: 3689,
          },
          PresentToYearEnd: {
            Plan: 2013,
            ActualOrForcast: 1324,
          },
        },
        NegativeOperationAvgSpread: {
          Suffix: "YEN/kWh",
          Annual: {
            Plan: -10.12,
            ActualOrForcast: 13.12,
          },
          YearStartToPresent: {
            Plan: 0.56,
            ActualOrForcast:  0.73,
          },
          PresentToYearEnd: {
            Plan: 0.43,
            ActualOrForcast:  0.43,
          },
        },
      },
      PreviousDay: {
        NegativeOperationGrossMargin: {
          Annual: {
            ImpactOnEBITDA: 11,
            Plan: 30,
            ActualOrForcast: 21,
          },
          YearStartToPresent: {
            ImpactOnEBITDA: -11,
            Plan: 22,
            ActualOrForcast: 33,
          },
          PresentToYearEnd: {
            ImpactOnEBITDA: 20,
            Plan: -10,
            ActualOrForcast: -30,
          },
        },
        NegativeOperationTime: {
          Suffix:'Hrs',
          Annual: {
            Plan: 4000,
            ActualOrForcast: 5013,
          },
          YearStartToPresent: {
            Plan: 2545,
            ActualOrForcast: 3689,
          },
          PresentToYearEnd: {
            Plan: 2013,
            ActualOrForcast: 1224,
          },
        },
        NegativeOperationAvgSpread: {
          Suffix: "YEN/kWh",
          Annual: {
            Plan: 1.38,
            ActualOrForcast: 13.12,
          },
          YearStartToPresent: {
            Plan: 0.56,
            ActualOrForcast: 0.72,
          },
          PresentToYearEnd: {
            Plan:  -4.17,
            ActualOrForcast: 0.43,
          },
        },
      },
    },
  }
function generateDurationOfSpreadMockData() {
    const generators = ['Generator 1', 'Generator 2', 'Generator 3', 'Generator 4', 'Generator 5', 'Generator 6'];
    let index = 0;
    let mockData = [];
    for (; index < 20; index++) {
        mockData.push({
            duration: getRandomNum(18, 24),
            generator: generators[getRandomNum(0, 5)],
            spreadOperationStart: new Date().toISOString(),
            spreadOperationEnd: new Date().toISOString(),
            output: getRandomNum(350, 500),
            grossMargin: getRandomNum(-0.01, -0.1),
            spread: getRandomNum(-0.10, -0.90)
        })
    }
    mockData = Object.values(mockData).sort((a, b) => (a.duration < b.duration) ? 1 : -1)
    return mockData;
}

function getRandomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function getRandomName(min: number, max: number) {
  const name =" Hours"
    return Math.floor(Math.random() * (max - min) ) + min + name;
}
export function spreadBarChartMockData() {
  let index = 0;
  let mockData = [];

  for (; index < 12; index++) {
      mockData.push({
        Value:getRandomNum(100, 500),
        Name: getRandomName(1,12)
      })
  }
  return mockData;
}
  export const spreadOperationMockData = {
    Annual: {
      1: {
        Spread: [ 45.4, 20, 18.6, 11.6, 33.5, 24, 47.9, 63.9, 63.1, 64.3, 74.5, 72.2],
        Period: [ "2015-04-01T00:00", "2015-05-01T00:00", "2015-06-01T00:00", "2015-07-01T00:00", "2015-08-01T00:00", "2015-09-01T00:00", "2015-10-01T00:00", "2015-11-01T00:00", "2015-12-01T00:00", "2016-01-01T00:00", "2016-02-01T00:00", "2016-03-01T00:00",
        ],
        "power-plant-unit-id": "A10",
        "power-title":"Hot",
      },
      2: {
        Spread: [ 45.4, 20, 18.6, 11.6, 33.5, 24, 47.9, 63.9, 63.1, 64.3, 74.5, 72.2],
        Period: [ "2016-04-01T00:00", "2016-05-01T00:00", "2016-06-01T00:00", "2016-07-01T00:00", "2016-08-01T00:00", "2016-09-01T00:00", "2016-10-01T00:00", "2016-11-01T00:00", "2016-12-01T00:00", "2017-01-01T00:00", "2017-02-01T00:00", "2017-03-01T00:00",
        ],
        "power-plant-unit-id": "A50",
        "power-title":"Cool",
      },
      3: {
        Spread: [ 45.4, 20, 18.6, 11.6, 33.5, 24, 47.9, 63.9, 63.1, 64.3, 74.5, 72.2],
        Period: [ "2017-04-01T00:00", "2017-05-01T00:00", "2017-06-01T00:00", "2017-07-01T00:00", "2017-08-01T00:00", "2017-09-01T00:00", "2017-10-01T00:00", "2017-11-01T00:00", "2017-12-01T00:00", "2018-01-01T00:00", "2018-02-01T00:00", "2018-03-01T00:00",
        ],
        "power-plant-unit-id": "A50",
        "power-title":"Hot",
      },
      4: {
        Spread: [ 45.4, 20, 18.6, 11.6, 33.5, 24, 47.9, 63.9, 63.1, 64.3, 74.5, 72.2],
        Period: [ "2018-04-01T00:00", "2018-05-01T00:00", "2018-06-01T00:00", "2018-07-01T00:00", "2018-08-01T00:00", "2018-09-01T00:00", "2018-10-01T00:00", "2018-11-01T00:00", "2018-12-01T00:00", "2019-01-01T00:00", "2019-02-01T00:00", "2019-03-01T00:00",
        ],
        "power-plant-unit-id": "A40",
        "power-title":"Cool",
      },
      5: {
        Spread: [71.3, 55, 67.8, 71.785, 97.4, 96.5, 90.7, 96, 93.1, 95.2, 96],
        Period: [ "2019-04-01T00:00", "2019-05-01T00:00", "2019-06-01T00:00", "2019-07-01T00:00", "2019-08-01T00:00", "2019-09-01T00:00", "2019-10-01T00:00", "2019-11-01T00:00", "2019-12-01T00:00", "2020-01-01T00:00", "2020-02-01T00:00", "2020-03-01T00:00",
        ],
        "power-plant-unit-id": "A30",
        "power-title":"Cool",
      },
      6: {
        Spread: [ 45.4, 20, 18.6, 11.6, 33.5, 24, 47.9, 63.9, 63.1, 64.3, 74.5, 72.2],
        Period: [ "2020-04-01T00:00", "2020-05-01T00:00", "2020-06-01T00:00", "2020-07-01T00:00", "2020-08-01T00:00", "2020-09-01T00:00", "2020-10-01T00:00", "2020-11-01T00:00", "2020-12-01T00:00", "2021-01-01T00:00", "2021-02-01T00:00", "2021-03-01T00:00",
        ],
        "power-plant-unit-id": "A20",
        "power-title":"Hot",
      },
      7: {
       Spread: [71.8, 55, 67.8, 71.785, 97.4, 96.5, 90.7, 96, 93.1, 95.2, 96],
       Period: [ "2021-04-01T00:00", "2021-05-01T00:00", "2021-06-01T00:00", "2021-07-01T00:00", "2021-08-01T00:00", "2021-09-01T00:00", "2021-10-01T00:00", "2021-11-01T00:00", "2021-12-01T00:00", "2022-01-01T00:00", "2022-02-01T00:00", "2022-03-18T00:00",
        ],
        "power-plant-unit-id": "A10",
        "power-title":"Hot",
      },
     
    },
    Monthly:{
        1:{
            Spread: [15.3, 20.8 ,18.8 ,16.7,23,32.2,37.2,32.9,25,27.3,20.6,19.8,20.3,19.6,19.7,15.8,29.1,50.6,48,55.8,63.2,44.8,35.6,44.6,48.8,51,55.5,61.3,37.2,25.6, 26],
            Period: ["2021-10-01T00:00", "2021-10-02T00:00", "2021-10-03T00:00", "2021-10-04T00:00", "2021-10-05T00:00", "2021-10-06T00:00", "2021-10-07T00:00", "2021-10-08T00:00", "2021-10-09T00:00", "2021-10-10T00:00", "2021-10-11T00:00", "2021-10-12T00:00", "2021-10-13T00:00", "2021-10-14T00:00", "2021-10-15T00:00", "2021-10-16T00:00", "2021-10-17T00:00", "2021-10-18T00:00", "2021-10-19T00:00", "2021-10-20T00:00", "2021-10-21T00:00", "2021-10-22T00:00", "2021-10-23T00:00", "2021-10-24T00:00", "2021-10-25T00:00", "2021-10-26T00:00", "2021-10-27T00:00", "2021-10-28T00:00", "2021-10-29T00:00", "2021-10-30T00:00", "2021-10-31T00:00", ],
            "power-plant-unit-id": "A50",
            "power-title":"Cool",
            },
        2:{
            Spread: [15.3, 20.8 ,18.8 ,16.7,23,32.2,37.2,32.9,25,27.3,20.6,19.8,20.3,19.6,19.7,15.8,29.1,50.6,48,55.8,63.2,44.8,35.6,44.6,48.8,51,55.5,61.3,37.2,25.6, null],
            Period: ["2021-11-01T00:00", "2021-11-02T00:00", "2021-11-03T00:00", "2021-11-04T00:00", "2021-11-05T00:00", "2021-11-06T00:00", "2021-11-07T00:00", "2021-11-08T00:00", "2021-11-09T00:00", "2021-11-10T00:00", "2021-11-11T00:00", "2021-11-12T00:00", "2021-11-13T00:00", "2021-11-14T00:00", "2021-11-15T00:00", "2021-11-16T00:00", "2021-11-17T00:00", "2021-11-18T00:00", "2021-11-19T00:00", "2021-11-20T00:00", "2021-11-21T00:00", "2021-11-22T00:00", "2021-11-23T00:00", "2021-11-24T00:00", "2021-11-25T00:00", "2021-11-26T00:00", "2021-11-27T00:00", "2021-11-28T00:00", "2021-11-29T00:00", "2021-11-30T00:00", null, ],
            "power-plant-unit-id": "A40",
            "power-title":"Cool",
            },
        3:{
            Spread: [34.5, 36.9, 38.9, 31.8, 33.1, 25.6, 27.5, 35.4, 36.9, 35.3, 36, 29.3, 15.4, 17.1, 21.1, 22.6, 23.9, 24.6, 20.7, 15.2, 14.8, 16.4, 18.6, 20.1, 20.3, 10.5, 10.2, 10.8, 17.1, 16.2, 16.2, ],
            Period: ["2021-12-01T00:00", "2021-12-02T00:00", "2021-12-03T00:00", "2021-12-04T00:00", "2021-12-05T00:00", "2021-12-06T00:00", "2021-12-07T00:00", "2021-12-08T00:00", "2021-12-09T00:00", "2021-12-10T00:00", "2021-12-11T00:00", "2021-12-12T00:00", "2021-12-13T00:00", "2021-12-14T00:00", "2021-12-15T00:00", "2021-12-16T00:00", "2021-12-17T00:00", "2021-12-18T00:00", "2021-12-19T00:00", "2021-12-20T00:00", "2021-12-21T00:00", "2021-12-22T00:00", "2021-12-23T00:00", "2021-12-24T00:00", "2021-12-25T00:00", "2021-12-26T00:00", "2021-12-27T00:00", "2021-12-28T00:00", "2021-12-29T00:00", "2021-12-30T00:00","2021-01-31T00:00"],
            "power-plant-unit-id": "A30",
            "power-title":"Cool",
            },
        4:{
            Spread: [15.3, 20.8 ,18.8 ,16.7,23,32.2,37.2,32.9,25,27.3,20.6,19.8,20.3,19.6,19.7,15.8,29.1,50.6,48,55.8,63.2,44.8,35.6,44.6,48.8,51,55.5,61.3,37.2,25.6,27.5],
            Period: ["2022-01-01T00:00", "2022-01-02T00:00", "2022-01-03T00:00", "2022-01-04T00:00", "2022-01-05T00:00", "2022-01-06T00:00", "2022-01-07T00:00", "2022-01-08T00:00", "2022-01-09T00:00", "2022-01-10T00:00", "2022-01-11T00:00", "2022-01-12T00:00", "2022-01-13T00:00", "2022-01-14T00:00", "2022-01-15T00:00", "2022-01-16T00:00", "2022-01-17T00:00", "2022-01-18T00:00", "2022-01-19T00:00", "2022-01-20T00:00", "2022-01-21T00:00", "2022-01-22T00:00", "2022-01-23T00:00", "2022-01-24T00:00", "2022-01-25T00:00", "2022-01-26T00:00", "2022-01-27T00:00", "2022-01-28T00:00", "2022-01-29T00:00", "2022-01-30T00:00", "2022-01-31T00:00", ],
            "power-plant-unit-id": "A20",
            "power-title":"Hot",
            },

        5:{
            Spread: [34.5, 36.9, 38.9, 31.8, 33.1, 25.6, 27.5, 35.4, 36.9, 35.3, 36, 29.3, 15.4, 17.1, 21.1, 22.6, 23.9, 24.6, 20.7, 15.2, 14.8, 16.4, 18.6, 20.1, 20.3, 10.5, 10.2, 10.8, null, null, null ],
            Period: ["2022-02-01T00:00", "2022-02-02T00:00", "2022-02-03T00:00", "2022-02-04T00:00", "2022-02-05T00:00", "2022-02-06T00:00", "2022-02-07T00:00", "2022-02-08T00:00", "2022-02-09T00:00", "2022-02-10T00:00", "2022-02-11T00:00", "2022-02-12T00:00", "2022-02-13T00:00", "2022-02-14T00:00", "2022-02-15T00:00", "2022-02-16T00:00", "2022-02-17T00:00", "2022-02-18T00:00", "2022-02-19T00:00", "2022-02-20T00:00", "2022-02-21T00:00", "2022-02-22T00:00", "2022-02-23T00:00", "2022-02-24T00:00", "2022-02-25T00:00", "2022-02-26T00:00", "2022-02-27T00:00", "2022-02-28T00:00", null, null ,null],
            "power-plant-unit-id": "A10",
            "power-title":"Cool",
            },
        6: {
            Spread: [34.5, 36.9, 38.9, 31.8, 33.1, 25.6, 27.5, 35.4, 36.9, 35.3, 36, 29.3, 15.4, 17.1, 21.1, 22.6, 23.9, 24.6, 20.7, 15.2, 14.8, 16.4, 18.6, 20.1, 20.3, 10.5, 10.2, 10.8, 10, 10, 10 ],
            Period: ["2022-03-01T00:00", "2022-03-02T00:00", "2022-03-03T00:00", "2022-03-04T00:00", "2022-03-05T00:00", "2022-03-06T00:00", "2022-03-07T00:00", "2022-03-08T00:00", "2022-03-09T00:00", "2022-03-10T00:00", "2022-03-11T00:00", "2022-03-12T00:00", "2022-03-13T00:00", "2022-03-14T00:00", "2022-03-15T00:00", "2022-03-16T00:00", "2022-03-17T00:00", "2022-03-18T00:00", "2022-03-19T00:00", "2022-03-20T00:00", "2022-03-21T00:00", "2022-03-22T00:00", "2022-03-23T00:00", "2022-03-24T00:00", "2022-03-25T00:00", "2022-03-26T00:00", "2022-03-27T00:00", "2022-03-28T00:00", "2022-03-29T00:00", "2022-03-30T00:00" ,"2022-03-31T00:00"],
            "power-plant-unit-id": "A10",
            "power-title":"Cool",
            },
       
      },
   
  };