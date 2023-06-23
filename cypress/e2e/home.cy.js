describe("Home, Login and Logout", () => {
  it("should navigate to login page, perform login, and logout", () => {
    cy.visit("");
    //before login

    cy.scrollTo(0, 600);
    cy.get('[data-testid="table_0"]').should("be.visible").click();
    cy.get('[data-testid="book-button"]').should("be.visible").click();
    cy.get('[data-testid="login-dialog-button"]').should("be.visible").click();
    cy.url().should("include", "/login");
    cy.get("p").contains("login").should("be.visible");
    cy.get('[data-testid="phone-input"]')
      .should("be.visible")
      .type("09961996949");
    cy.get('[data-testid="password-input"]')
      .should("be.visible")
      .type("1111111");
    cy.get('[data-testid="login-submit"]').should("be.visible").click();
    cy.url().should("include", "/");

    //after login
    cy.scrollTo(0, 600);
    cy.get('[data-testid="table_0"]').should("be.visible").click();

    cy.get('[data-testid="book-button"]').should("be.visible").click();
    cy.get('[data-testid="use-balance-switch"]').should("be.visible").click();
    cy.get('[data-testid="book-table"]').should("be.visible").click();
  });
});
