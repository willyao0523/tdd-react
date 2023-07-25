import React from "react";
import {
  initializeReactContainer,
  render,
  form,
  field,
  click,
  submit,
  submitButton,
  change,
  labelFor,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/customer-form.js";

describe("CustomerForm", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "xxx-xxxxxxxx",
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  const itRendersAsATextBox = (fieldName) => {
    it("renders as a text box", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName)).toBeInputFieldOfType("text");
      expect(field(fieldName).type).toEqual("text");
    });
  };

  const itIncludesTheExistingValue = (fieldName, existing) => {
    it("includes the existing value", () => {
      const customer = { [fieldName]: existing };
      render(<CustomerForm original={customer} />);
      expect(field(fieldName).value).toEqual(existing);
    });
  };

  const itRendersALabel = (fieldName, text) => {
    it("renders a label for the text box", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(labelFor(fieldName)).not.toBeNull();
    });

    it(`renders '${text} as the label content`, () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(labelFor(fieldName)).toContainText(text);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
    it("assigns an id that matches the label id", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it("saves existing value when submitted", () => {
      expect.hasAssertions();
      const customer = { [fieldName]: value };
      render(
        <CustomerForm
          original={customer}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );
      click(submitButton());
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it("saves new value when submitted", () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          original={blankCustomer}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );
      change(field(fieldName), value);
      click(submitButton());
    });

  describe("first name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersALabel("firstName", "First name");
    itAssignsAnIdThatMatchesTheLabelId("firstName");
    itSubmitsExistingValue("firstName", "Ashley");
    itSubmitsNewValue("firstName", "Jamie");
  });

  describe("first name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "existingValue");
    itRendersALabel("firstName", "First name");
    itAssignsAnIdThatMatchesTheLabelId("firstName");
    itSubmitsExistingValue("firstName", "existingValue");
    itSubmitsNewValue("firstName", "newValue");
  });

  describe("last name field", () => {
    itRendersAsATextBox("lastName");
    itIncludesTheExistingValue("lastName", "existingValue");
    itRendersALabel("lastName", "Last name");
    itAssignsAnIdThatMatchesTheLabelId("lastName");
    itSubmitsExistingValue("lastName", "existingValue");
    itSubmitsNewValue("lastName", "newValue");
  });

  describe("phone number field", () => {
    itRendersAsATextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "12345");
    itRendersALabel("phoneNumber", "Phone number");
    itAssignsAnIdThatMatchesTheLabelId("phoneNumber");
    itSubmitsExistingValue("phoneNumber", "12345");
    itSubmitsNewValue("phoneNumber", "67890");
  });

  it("prevents the default action when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} onSubmit={() => {}} />);

    const event = submit(form());
    expect(event.defaultPrevented).toBe(true);
  });
});
