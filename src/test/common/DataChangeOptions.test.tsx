import React from 'react'
import DataChangeOptions from '../../components/common/DataChangeOptions'
import renderer from 'react-test-renderer'
import i18n from '../../i18nForTests'
import { I18nextProvider } from 'react-i18next'
describe('Component: DataChangeOptions', () => {
  var Props  = {
    forecastHrs: 10,
    forecastpreviousHrs: 12,
    planHrs: 15,
    planpreviousHrs: 14,
    actual: true,
    suffix: 'oku',
  }
  var linechartData = {
    currentDisable: false,
    graphData:
      '{"Actua:[52.7,43.41,45.19,64.06,55.43,51.66,217.55,374.96,311.73,359.21,362.63,null],"Perio:["2021-04-01T00:00","2021-05-01T00:00","2021-06-01T00:00","2021-07-01T00:00","2021-08-01T00:00","2021-09-01T00:00","2021-10-01T00:00","2021-11-01T00:00","2021-12-01T00:00","2022-01-01T00:00","2022-02-01T00:00","2022-03-01T00:00"],"Planne:[15.31,18.49,49.32,68.43,-5.67,43.35,74.05,76.23,102.75,108.93,88.2,66.98],"Forecas:[null,null,null,null,null,null,null,null,null,null,null,438.43],"Estimate:[690.37,2078.44,206.54]}',
    indexFound: true,
    nextDisable: false,
    datelabel: '2021',
    Prefix: '¥',
    Suffix: 'Oku',
    Suffix2: 'Oku',
  }
  var startDate = new Date();
  var selectValue = "AnnualData";
  var customClass = "date-picker-return";

  it('DataChangeOptions renders correctly', () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <DataChangeOptions
            {...Props}
            startDate={startDate}
            linechartData={linechartData}
            selectValue={selectValue}
            customClass={customClass}
          />
        </I18nextProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
