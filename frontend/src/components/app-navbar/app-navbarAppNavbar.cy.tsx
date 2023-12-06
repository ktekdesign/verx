import React from "react";
import AppNavbar from ".";

describe("<AppNavbar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AppNavbar />);
  });
});
