import React from "react";
import renderer from "react-test-renderer";
import ReferenceSpecificationOfSpreadOperation from "../../components/unitOperation/specificationSpread/ReferenceSpecificationOfSpreadOperation";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import { unitOperationMockData } from "../../models/unitOperation/_mockData";



describe("Component: ReferenceSpecificationOfSpreadOperation", () => {
  it("ReferenceSpecificationOfSpreadOperation renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <ReferenceSpecificationOfSpreadOperation {...unitOperationMockData.referenceSpecification}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
