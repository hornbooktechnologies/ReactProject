import React from 'react'
// import CustomTooltip from '../../components/common/lineChart/CustomTooltip';
import CustomTooltip from '../../components/annualTarget/CustomTooltip'
import renderer from 'react-test-renderer'
describe('Component: CustomTooltip', () => {
  it('CustomTooltip renders correctly', () => {
    var selectValue = 'AnnualData'
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
    var active = false
    var payload = [
      {
        stroke: '#ED9933',
        strokeWidth: '3',
        fill: '#fff',
        points: [],
        dataKey: 'Planned',
        name: 'Planned',
        color: '#ED9933',
        value: 15.31,
        payload: {
          Period: '2021-04-01T00:00',
          Forecast: null,
          Actual: 52.7,
          Planned: 15.31,
          TimeStamp: 1617215400000,
        },
      },
      {
        stroke: '#E0515A',
        strokeWidth: '3',
        fill: '#fff',
        points: [],
        dataKey: 'Actual',
        name: 'Actual',
        color: '#E0515A',
        value: 52.7,
        payload: {
          Period: '2021-04-01T00:00',
          Forecast: null,
          Actual: 52.7,
          Planned: 15.31,
          TimeStamp: 1617215400000,
        },
      },
    ]
    const tree = renderer
      .create(
        <CustomTooltip
          selectValue={selectValue}
          linechartData={linechartData}
          active={active}
          payload={payload}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
