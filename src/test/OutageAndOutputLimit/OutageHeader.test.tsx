import React from "react";
import renderer from "react-test-renderer";
import OutageHeader from "../../components/outageOutputlimit/OutageHeader";

describe("Component: OutageHeader", () => {
  it("OutageHeader renders correctly", () => {
    const tree = renderer.create(<OutageHeader title="OutageHeader"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
