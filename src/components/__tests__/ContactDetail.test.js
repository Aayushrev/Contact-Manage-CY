import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ContactDetail from "../ContactDetail";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("ContactDetail Component", () => {

  test("renders 'No contact data available.' when no contact data is passed", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/contact/1", state: {} }]}>
        <ContactDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/No contact data available./i)).toBeInTheDocument();
  });

  test("renders contact details correctly when contact data is passed", () => {
    const contact = { name: "John Doe", email: "johndoe@example.com" };

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/contact/1", state: { contact } }]}
      >
        <ContactDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("user")).toBeInTheDocument();
  });

  test("renders 'Back to Contact List' button", () => {
    const contact = { name: "John Doe", email: "johndoe@example.com" };

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/contact/1", state: { contact } }]}
      >
        <ContactDetail />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", { name: /back to contact list/i });
    expect(backButton).toBeInTheDocument();
  });

  test("renders correct route for back button", async () => {
    const contact = { name: "John Doe", email: "johndoe@example.com" };

    render(
      <MemoryRouter initialEntries={[{ pathname: "/contact/1", state: { contact } }]}>
        <Routes>
          <Route path="/contact/1" element={<ContactDetail />} />
          <Route path="/" element={<div>Contact List</div>} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", { name: /back to contact list/i });
     await act (async () => { await userEvent.click(backButton); })

    expect(screen.getByText("Contact List")).toBeInTheDocument();
  });

});
