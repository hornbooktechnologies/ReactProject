import React from "react";
import renderer from "react-test-renderer";
import TheContent from "../../components/organisms/TheContent";
import { BrowserRouter } from "react-router-dom";

describe("Component: TheContent", () => {
  it("TheContent renders correctly", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <TheContent />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
