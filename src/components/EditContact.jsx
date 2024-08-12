import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const contact = location.state?.contact || {};

  const [contactDetails, setContactDetails] = useState({
    id: contact.id || "",
    name: contact.name || "",
    email: contact.email || "",
  });

  useEffect(() => {
    if (!contact.id) {
      navigate("/"); // Redirect if no contact data is found
    }
  }, [contact, navigate]);

  const update = (e) => {
    e.preventDefault();
    if (contactDetails.name === "" || contactDetails.email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    updateContactHandler(contactDetails);
    setContactDetails({ name: "", email: "" });
    navigate("/");
  };

  if (!contactDetails.id) {
    return <div>No contact found to edit.</div>;
  }

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contactDetails.name}
            onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={contactDetails.email}
            onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
