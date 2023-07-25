import React from "react";

import {
  initializeReactContainer,
  render,
  click,
  element,
  elements,
  textOf,
  typesOf,
} from "./reactTestExtensions";
import { AppointmentsDayView } from "../src/appointments-day-view";

describe("AppointmentsDayView", () => {
  const today = new Date();
  const twoAppointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: {
        firstName: "Ashley",
      },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: {
        firstName: "Jordan",
      },
    },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(element("ol")).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("ol > li");

    expect(listChildren).toHaveLength(2);
  });

  it("returns the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0]).toContainText("12:00");
    expect(listChildren[1]).toContainText("13:00");

    expect(textOf(elements("li"))).toEqual(["12:00", "13:00"]);
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(document.body.textContent).toContain("Ashley");
    expect(document.body).toContainText("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
    expect(typesOf(elements("li > *"))).toEqual(["button", "button"]);
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const secondButton = () => elements("button")[1];
    click(secondButton());
    expect(secondButton().className).toContain("toggled");
    expect(document.body).toContainText("Jordan");
  });
});
