import React from "react";
import renderer from "react-test-renderer";
import SpreadLineChart from "../../components/unitOperation/specificationSpread/SpreadLineChart";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";


describe("Component: SpreadLineChart", () => {
  it("SpreadLineChart renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <SpreadLineChart selectValue={"AnnualData"} selectedUnitId={"A10"} selectedTitleDropdown={"hot"} list={[]} data={[]}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
