import React from "react";
import renderer from "react-test-renderer";
import ReferenceSpecificationTable from "../../components/unitOperation/specificationSpread/ReferenceSpecificationTable";
import i18n from "../../i18nForTests";
import { I18nextProvider } from "react-i18next";
import { unitOperationMockData } from "../../models/unitOperation/_mockData";



describe("Component: ReferenceSpecificationTable", () => {
  it("ReferenceSpecificationTable renders correctly", () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <ReferenceSpecificationTable {...unitOperationMockData.referenceSpecification}/>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
