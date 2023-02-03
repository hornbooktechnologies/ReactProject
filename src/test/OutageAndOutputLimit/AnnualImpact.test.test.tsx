import React from 'react'
import renderer from 'react-test-renderer'
import AnnualImpact from '../../components/outageOutputlimit/timeOfOutage/annualData/AnnualImpact'
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
describe('Component: AnnualImpact', () => {
  it('AnnualImpact renders correctly', () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <AnnualImpact impactVal={10} impactPreviousVal={20} suffix={'oku'} />
        </I18nextProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
