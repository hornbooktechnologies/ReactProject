import React from "react";
import AnnualGraphLayout from "../../components/annualTarget/AnnualGraphLayout";
import renderer from "react-test-renderer";
describe("Component: AnnualGraphLayout", () => {
  it("AnnualGraphLayout renders correctly", () => {
    const tree = renderer.create(<AnnualGraphLayout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
