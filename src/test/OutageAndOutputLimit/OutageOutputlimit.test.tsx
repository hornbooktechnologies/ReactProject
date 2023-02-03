import React from 'react'
import renderer from 'react-test-renderer'
import OutageOutputlimit from '../../components/outageOutputlimit/OutageOutputlimit'
import i18n from '../../i18nForTests'
import { I18nextProvider } from 'react-i18next'

describe('Component: OutageOutputlimit', () => {
  it('OutageOutputlimit renders correctly', () => {
    var ChartData = {
      className: 'main-timeline-chart',
      timelinecharts: [
        {
          name: 'Plan',
          data: [
            {
              x: 'Plan',
              y: [0, 0],
              fillColor: '#33A0D7',
            },
          ],
        },
        {
          name: 'Actual & Forecast',
          data: [
            {
              x: 'Actual & Forecast',
              y: [0, 0],
              fillColor: '#33A0D7',
            },
          ],
        },
      ],
      selectYear: 2021,
      xaxisMin: 1647492950138,
      xaxisMax: 1647492950138,
      isUnitWiseView: false,
    }

    var subChartData = {
      className: 'sub-timeline-chart',
      timelinecharts: [
        {
          name: '',
          data: [
            {
              x: 'Generator 2',
              y: [0, 0],
              fillColor: '#ED9933',
            },
          ],
        },
        {
          name: '',
          data: [
            {
              x: 'Generator 3',
              y: [0, 0],
              fillColor: '#ED9933',
            },
          ],
        },
        {
          name: '',
          data: [
            {
              x: 'Generator 4',
              y: [0, 0],
              fillColor: '#ED9933',
            },
          ],
        },
        {
          name: '',
          data: [
            {
              x: 'Generator 5',
              y: [0, 0],
              fillColor: '#ED9933',
            },
          ],
        },
        {
          name: 'HE2テスト7',
          data: [
            {
              x: 'Generator 2',
              y: [1643709600000, 1645009200000],
              fillColor: '#33A0D7',
            },
          ],
        },
        {
          name: 'HE5テスト8',
          data: [
            {
              x: 'Generator 5',
              y: [1646215200000, 1646301600000],
              fillColor: '#33A0D7',
            },
          ],
        },
        {
          name: '',
          data: [
            {
              x: 'Generator 3',
              y: [1630746000000, 1632754800000],
              fillColor: '#E0515A',
            },
          ],
        },
      ],
      selectYear: 2021,
      xaxisMin: 1617215400000,
      xaxisMax: 1648751400000,
      noOfUnits: 5,
    }
    var outageLineChartData = {
      className: "outage-line-chart",
      prices: [
          {
              x: 1617235200000,
              y: 5.605833333333333
          },
          {
              x: 1617321600000,
              y: 5.580833333333333
          },
          {
              x: 1617408000000,
              y: 5.140833333333333
          },
          {
              x: 1617494400000,
              y: 5.885833333333333
          },
          {
              x: 1617580800000,
              y: 5.68375
          },
          {
              x: 1617667200000,
              y: 6.45625
          },
          {
              x: 1617753600000,
              y: 5.9
          },
          {
              x: 1617840000000,
              y: 6.265416666666667
          },
        
         
      ],
      selectYear: 2021,
      xaxisMin: 1617215400000,
      xaxisMax: 1648751400000,
      noOfUnits: 5
  }

    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <OutageOutputlimit
            ChartData={ChartData}
            subChartData={subChartData}
            outageLineChartData={outageLineChartData}
          />
        </I18nextProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
