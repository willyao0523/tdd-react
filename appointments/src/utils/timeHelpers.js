export const appointmentTimeOfDay = (startAt) => {
  const [h, m] = new Date(startAt).toTimeString().split(":");
  return `${h}:${m}`;
};
