import React from "react";
import renderer from "react-test-renderer";
import ImpactOfOutage from "../../components/outageOutputlimit/impactOfOutage/ImpactOfOutage";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: ImpactOfOutage", () => {
  it("ImpactOfOutage renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <ImpactOfOutage />
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
