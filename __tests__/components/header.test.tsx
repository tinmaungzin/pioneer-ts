import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/layout/front/Header";
import { MockUser } from "@/__mocks__/Users";

describe("Header component", () => {
  it("should render logout button", () => {
    render(<Header status="authenticated" user={MockUser} />);
    const profileLink = screen.getByTestId("profile-button");
    expect(profileLink).toBeInTheDocument();
  });

  it("should render login button", () => {
    render(<Header status="unauthenticated" user={MockUser} />);
    const loginLink = screen.getByTestId("login-button");
    expect(loginLink).toBeInTheDocument();
  });
});
