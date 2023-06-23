import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/front/Header";
jest.mock("next-auth/react");

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "",
    };
  },
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockReturnValue({ isLoading: false, error: {} }),
}));

describe("Header component", () => {
  it("should render logout button", () => {
    (useSession as jest.Mock).mockReturnValueOnce({ status: "authenticated" });

    render(<Header />);
    const profileLink = screen.getByTestId("profile-button");
    expect(profileLink).toBeInTheDocument();
  });

  it("should render login button", () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      status: "unauthenticated",
    });

    render(<Header />);
    const loginLink = screen.getByTestId("login-button");
    expect(loginLink).toBeInTheDocument();
  });
});
