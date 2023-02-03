import React from "react";
import renderer from "react-test-renderer";
import ImpactOfOutageData from "../../components/outageOutputlimit/impactOfOutage/ImpactOfOutageData";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
describe("Component: ImpactOfOutageData", () => {
  it("ImpactOfOutageData renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
        <ImpactOfOutageData
          value={10}
          impactVal={10}
          impactVal1={10}
          title={"ImpactOfOutageDataTitle"}
        />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
