import React from "react";
import ResponsiveLineChartContainer from "../../components/annualTarget/ResponsiveLineChartContainer";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
describe("Component: ResponsiveLineChartContainer", () => {
  const props = {
    linechartData: {
      Prefix: "¥",
      Suffix: "Oku",
      Suffix2: "Oku",
      currentDisable: false,
      datelabel: "2021",
      graphData:
        '{"Actual":[3.07,1.99,6.14,1.09,null,null,null,null,null,null,null,null],"Period":["2021-04-01T00:00","2021-05-01T00:00","2021-06-01T00:00","2021-07-01T00:00","2021-08-01T00:00","2021-09-01T00:00","2021-10-01T00:00","2021-11-01T00:00","2021-12-01T00:00","2022-01-01T00:00","2022-02-01T00:00","2022-03-01T00:00"],"Planned":[3.99,1.86,2.76,2.5,23.46,9.83,1.94,1.88,2.88,1.79,2.11,3.49],"Forecast":[null,null,null,null,1.43,2.64,1.67,1.59,2.42,1.64,1.71,3.33],"Estimates":[58.54,12.3,16.47]}',
      indexFound: true,
      nextDisable: false,
    },
    list: [],
    longestLabelLength: 6,
    selectValue: "AnnualData",
    ylabel: "¥ Oku",
    ActualList: [3.07, 1.99, 6.14, 1.09],
    ForecastList: [1.43, 2.64, 1.67, 1.59, 2.42, 1.64, 1.71, 3.33],
    PlannedList: [
      3.99,
      1.86,
      2.76,
      2.5,
      23.46,
      9.83,
      1.94,
      1.88,
      2.88,
      1.79,
      2.11,
      3.49,
    ],
    Today: "2022-03-01T00:00",
    data: [
      {
        Actual: 3.07,
        Forecast: null,
        Period: "2021-04-01T00:00",
        Planned: 3.99,
        TimeStamp: 1617215400000,
      },
      {
        Actual: 3.07,
        Forecast: null,
        Period: "2021-05-01T00:00",
        Planned: 3.99,
        TimeStamp: 1617215400000,
      },
      {
        Actual: 3.07,
        Forecast: null,
        Period: "2021-06-01T00:00",
        Planned: 3.99,
        TimeStamp: 1617215400000,
      },
    ],
  };
  it("ResponsiveLineChartContainer renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <ResponsiveLineChartContainer {...props}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
