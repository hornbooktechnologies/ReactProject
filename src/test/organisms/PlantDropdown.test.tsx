import React from "react";
import renderer from "react-test-renderer";
import PlantDropdown from "../../components/organisms/PlantDropdown";

describe("Component: PlantDropdown", () => {
  it("PlantDropdown renders correctly", () => {
    const tree = renderer.create(<PlantDropdown />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
