import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AddContact from "../AddContact";
import "@testing-library/jest-dom";

describe("AddContact Component", () => {
  const mockAddContactHandler = jest.fn();

  test("renders AddContact component without crashing", () => {
    render(
      <Router>
        <AddContact addContactHandler={mockAddContactHandler} />
      </Router>
    );

    expect(screen.getByText(/add contact/i)).toBeInTheDocument();
  });

  test("renders input fields correctly", () => {
    render(
      <Router>
        <AddContact addContactHandler={mockAddContactHandler} />
      </Router>
    );

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test("displays an alert when fields are empty", () => {
    window.alert = jest.fn();

    render(
      <Router>
        <AddContact addContactHandler={mockAddContactHandler} />
      </Router>
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(window.alert).toHaveBeenCalledWith("All fields are mandatory!");
  });

  test("calls addContactHandler with correct input values", () => {
    render(
      <Router>
        <AddContact addContactHandler={mockAddContactHandler} />
      </Router>
    );

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.click(addButton);

    expect(mockAddContactHandler).toHaveBeenCalledWith({
      name: "John Doe",
      email: "johndoe@example.com",
    });
  });

  test("clears input fields after form submission", () => {
    render(
      <Router>
        <AddContact addContactHandler={mockAddContactHandler} />
      </Router>
    );

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.click(addButton);

    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
  });
});
