import React from "react";
import renderer from "react-test-renderer";
import SalesStats from "../../../components/outageOutputlimit/salesOutage/SalesStats";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: SalesStats", () => {
  it("SalesStats renders correctly", () => {
    const salesTestData = {
        plannedPlan: 8,
        plannedActual: 2,
        unplannedActual: 4,
        plannedActualSubValue: 3,
        unplannedActualSubValue: 2.2,
        plannedPlanSubValue: 1.2,
        header: 'Planned'
    }
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <SalesStats {...salesTestData} />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
