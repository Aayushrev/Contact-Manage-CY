import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("renders the Header component without crashing", () => {
    render(<Header />);
  });

  it("renders the correct text in the Header", () => {
    render(<Header />);
    const headerElement = screen.getByText(/contact manager/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the Header with the correct structure", () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toHaveClass("ui fixed menu");
    expect(screen.getByText("Contact Manager")).toBeInTheDocument();
  });

  it("renders the content inside a container", () => {
    render(<Header />);
    const containerElement = screen.getByRole("heading", { level: 2 }).parentElement;
    expect(containerElement).toHaveClass("ui container center");
  });

  it("renders the h2 tag with the correct text", () => {
    render(<Header />);
    const headingElement = screen.getByRole("heading", { level: 2 });
    expect(headingElement).toHaveTextContent("Contact Manager");
  });
});
