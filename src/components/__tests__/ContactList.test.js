import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ContactList from "../ContactList";
import ContactCard from "../ContactCard";
import "@testing-library/jest-dom";

// Mock the ContactCard component since it's imported in ContactList
jest.mock("../ContactCard", () => ({ contact, clickHander }) => (
  <div data-testid="contact-card">
    <div>{contact.name}</div>
    <button onClick={() => clickHander(contact.id)}>Delete</button>
  </div>
));

describe("ContactList Component", () => {
  const mockContacts = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Doe", email: "janedoe@example.com" },
  ];

  const mockGetContactId = jest.fn();
  const mockSearchKeyword = jest.fn();

  it("renders the contact list with the correct number of contacts", () => {
    render(
      <Router>
        <ContactList
          contacts={mockContacts}
          getContactId={mockGetContactId}
          searchKeyword={mockSearchKeyword}
          term=""
        />
      </Router>
    );

    const contactCards = screen.getAllByTestId("contact-card");
    expect(contactCards).toHaveLength(mockContacts.length);
  });

  it("calls the delete contact handler when the delete button is clicked", () => {
    render(
      <Router>
        <ContactList
          contacts={mockContacts}
          getContactId={mockGetContactId}
          searchKeyword={mockSearchKeyword}
          term=""
        />
      </Router>
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(mockGetContactId).toHaveBeenCalledWith(mockContacts[0].id);
  });

  it("renders the 'Add Contact' button with the correct link", () => {
    render(
      <Router>
        <ContactList
          contacts={mockContacts}
          getContactId={mockGetContactId}
          searchKeyword={mockSearchKeyword}
          term=""
        />
      </Router>
    );

    const addButton = screen.getByText("Add Contact");
    expect(addButton.closest("a")).toHaveAttribute("href", "/add");
  });

  it("displays the correct message when no contacts are available", () => {
    render(
      <Router>
        <ContactList
          contacts={[]}
          getContactId={mockGetContactId}
          searchKeyword={mockSearchKeyword}
          term=""
        />
      </Router>
    );

    expect(screen.getByText("No Contacts available")).toBeInTheDocument();
  });

  it("calls the search handler with the correct input value", () => {
    render(
      <Router>
        <ContactList
          contacts={mockContacts}
          getContactId={mockGetContactId}
          searchKeyword={mockSearchKeyword}
          term=""
        />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText("Search Contacts");
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(mockSearchKeyword).toHaveBeenCalledWith("John");
  });
});
