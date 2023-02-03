import React from "react";
import renderer from "react-test-renderer";
import PredictivePreviousData from "../../components/outageOutputlimit/timeOfOutage/predictive&PreviousData/PredictivePreviousData";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";

describe("Component: PredictivePreviousData", () => {
  it("PredictivePreviousData renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <PredictivePreviousData/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
