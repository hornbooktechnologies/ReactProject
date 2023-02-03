import React from "react";
import renderer from "react-test-renderer";
import TheLayout from "../../components/organisms/TheLayout";
import { BrowserRouter } from "react-router-dom";

describe("Component: TheLayout", () => {
  it("TheLayout renders correctly", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <TheLayout />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toBeDefined();
  });
});
