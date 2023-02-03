import React from "react";
import renderer from "react-test-renderer";
import SpecificationSpread from "../../components/unitOperation/specificationSpread/SpecificationSpread";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import { getCutoffFractionTime } from "../../utils/utils";
import { spreadOperationMockData } from "../../models/unitOperation/_mockData";


describe("Component: SpecificationSpread", () => {
  it("SpecificationSpread renders correctly", () => {
    const noDataHandler = (val: number, selectValue: string) => {
      }
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <SpecificationSpread time={getCutoffFractionTime()} spreadOperation={spreadOperationMockData} noDataHandler={noDataHandler}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
