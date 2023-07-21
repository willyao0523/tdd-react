import React from "react";
import { appointmentTimeOfDay } from "./utils/timeHelpers";

export const Appointment = ({
  customer: { firstName, lastName, phoneNumber },
  service,
  stylist,
  notes,
  startsAt,
}) => (
  <div id="appointmentView">
    <h3>Today&rsquo;s appointment at {appointmentTimeOfDay(startsAt)}</h3>
    <table>
      <tbody>
        <tr>
          <td>Customer</td>
          <td>
            {firstName} {lastName}
          </td>
        </tr>
        <tr>
          <td>Phone number</td>
          <td>{phoneNumber}</td>
        </tr>
        <tr>
          <td>Stylist</td>
          <td>{stylist}</td>
        </tr>
        <tr>
          <td>Service</td>
          <td>{service}</td>
        </tr>
        <tr>
          <td>Notes</td>
          <td>{notes}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
