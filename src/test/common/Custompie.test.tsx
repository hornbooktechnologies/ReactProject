import React from "react";
import CustomPie from "../../components/common/customPie/CustomPie";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
describe("Component: CustomPie", () => {
  var ChartData = {
    series1: {
      title: "plan",
      seriesValue: 50,
      prefix: "",
      suffix1: "",
      suffix2: "",
    },
    series2: {
      title: "plan",
      seriesValue: 50,
      prefix: "",
      suffix1: "",
      suffix2: "",
    },
    value: 20,
    plan: 20,
    forecast: 10,
  };

  var Props = {
    chartGradientType: "green",
    gradientColor1: "#000",
    gradientColor2: "#fff",
    type: "large",
    height: 190,
    width: 190,
    color: "#ddd",
    data: ChartData,
  };
  

  it("CustomPie renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <CustomPie {...Props} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
