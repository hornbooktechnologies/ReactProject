import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import { NegGrossmarginTableModel } from "../../../models/unitOperation/NegOperationGrossmarginModel";
import NegativeGrossMarginTable from "../../../components/unitOperation/NegativeOperationGrossMargin/NegativeGrossMarginTable";

describe("Component: NegativeGrossMarginTable", () => {
  it("NegativeGrossMarginTable renders correctly", () => {
    const mockData: NegGrossmarginTableModel = 
     [{
        actualOrForcast: 20,
        customClass: "uk-tooltip-bottom-custom",
        header: "Annual",
        impactOnEBITDA: 9,
        plan: 31,
        previousActualOrForcast: 20,
        previousImpactOnEBITDA: 10,
        previousPlan: 30,
     }]
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <NegativeGrossMarginTable {...mockData} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
