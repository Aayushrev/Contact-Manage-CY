import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ContactCard from "../ContactCard";
import "@testing-library/jest-dom";

const mockContact = {
  id: "1",
  name: "John Doe",
  email: "johndoe@example.com"
};

const mockClickHandler = jest.fn();

describe("ContactCard Component", () => {
  it("renders the ContactCard component without crashing", () => {
    render(
      <Router>
        <ContactCard contact={mockContact} clickHander={mockClickHandler} />
      </Router>
    );
  });

  it("displays the correct contact name and email", () => {
    render(
      <Router>
        <ContactCard contact={mockContact} clickHander={mockClickHandler} />
      </Router>
    );

    const nameElement = screen.getByText(/john doe/i);
    const emailElement = screen.getByText(/johndoe@example.com/i);

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
  });

  it("has the correct image with alt text", () => {
    render(
      <Router>
        <ContactCard contact={mockContact} clickHander={mockClickHandler} />
      </Router>
    );

    const imgElement = screen.getByAltText("user");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveClass("ui avatar image");
  });

  it("has a link to the contact details page with the correct state", () => {
    render(
      <Router>
        <ContactCard contact={mockContact} clickHander={mockClickHandler} />
      </Router>
    );

    const linkElement = screen.getByRole("link", { name: /john doe/i });
    expect(linkElement).toHaveAttribute("href", `/contact/${mockContact.id}`);
  });

  it("calls the click handler when the delete icon is clicked", () => {
    render(
      <Router>
        <ContactCard contact={mockContact} clickHander={mockClickHandler} />
      </Router>
    );

    const deleteIcon = screen.getByTestId("delete-icon");
    fireEvent.click(deleteIcon);
    expect(mockClickHandler).toHaveBeenCalledWith(mockContact.id);
  });

  it("renders the edit icon with the correct link", () => {
    render(
      <Router>
        <ContactCard contact={mockContact} clickHander={mockClickHandler} />
      </Router>
    );

    const editIconLink = screen.getByTestId("edit-icon").closest("a");
    expect(editIconLink).toHaveAttribute("href", "/edit");
  });

});
