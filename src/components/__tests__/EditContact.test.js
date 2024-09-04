import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import EditContact from "../EditContact";
import "@testing-library/jest-dom";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("EditContact Component", () => {
  const mockNavigate = jest.fn();
  const mockUpdateContactHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders EditContact component with contact data", () => {
    const contact = { id: "1", name: "John Doe", email: "johndoe@example.com" };
    
    // Mock useLocation to return contact data
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      state: { contact },
    });

    render(
      <MemoryRouter>
        <EditContact updateContactHandler={mockUpdateContactHandler} />
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("johndoe@example.com")).toBeInTheDocument();
  });

  test("redirects to home page if no contact data is provided", () => {
    // Mock useLocation to return no contact data
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      state: {},
    });

    render(
      <MemoryRouter>
        <EditContact updateContactHandler={mockUpdateContactHandler} />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("updates contact when form is submitted", () => {
    const contact = { id: "1", name: "John Doe", email: "johndoe@example.com" };
    
    // Mock useLocation to return contact data
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      state: { contact },
    });

    render(
      <MemoryRouter>
        <EditContact updateContactHandler={mockUpdateContactHandler} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "janedoe@example.com" },
    });

    fireEvent.click(screen.getByText("Update"));

    expect(mockUpdateContactHandler).toHaveBeenCalledWith({
      id: "1",
      name: "Jane Doe",
      email: "janedoe@example.com",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("shows alert if required fields are empty", () => {
    const contact = { id: "1", name: "John Doe", email: "johndoe@example.com" };
    
    // Mock useLocation to return contact data
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      state: { contact },
    });

    render(
      <MemoryRouter>
        <EditContact updateContactHandler={mockUpdateContactHandler} />
      </MemoryRouter>
    );

    // Clear the input fields
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "" },
    });

    // Mock window.alert
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.click(screen.getByText("Update"));

    expect(mockAlert).toHaveBeenCalledWith("All the fields are mandatory!");
    expect(mockUpdateContactHandler).not.toHaveBeenCalled();
  });
});
