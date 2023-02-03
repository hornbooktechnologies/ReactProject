import React from "react";
import renderer from "react-test-renderer";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import { NegGrossmarginTableRowModel } from "../../../models/unitOperation/NegOperationGrossmarginModel";
import NegativeGrossMarginTableRow from "../../../components/unitOperation/NegativeOperationGrossMargin/NegativeGrossMarginTableRow";

describe("Component: NegativeGrossMarginTableRow", () => {
  it("NegativeGrossMarginTableRow renders correctly", () => {
    const mockData: NegGrossmarginTableRowModel = {
      index: 1,
      prefix: "¥",
      suffix: "Oku",
      negativeGrossMarginRowData: {
        actualOrForcast: 20,
        customClass: "uk-tooltip-bottom-custom",
        header: "Annual",
        impactOnEBITDA: 9,
        plan: 31,
        previousActualOrForcast: 20,
        previousImpactOnEBITDA: 10,
        previousPlan: 30,
      },
    };
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <NegativeGrossMarginTableRow {...mockData} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
