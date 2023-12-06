import React from "react";
import FarmForm from "./index";

describe("<FarmForm />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FarmForm />);
  });
});
