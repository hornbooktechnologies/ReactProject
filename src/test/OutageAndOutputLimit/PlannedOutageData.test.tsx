import React from "react";
import renderer from "react-test-renderer";
import PlannedOutageData from "../../components/outageOutputlimit/timeOfOutage/predictive&PreviousData/PlannedOutageData";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
describe('Component: PlannedOutageData', () => {
  it('PlannedOutageData renders correctly', () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <PlannedOutageData />
        </I18nextProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
