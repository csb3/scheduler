export default function getAppointmentsForDay(state, day) {
  console.log("Day: ", day, "State: ", state);
  let selectedDay;
  let appointments = [];
  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      selectedDay = stateDay;
    }
  }

  if (selectedDay) {
    for (const appointment of selectedDay.appointments) {
    appointments.push(state.appointments[appointment]);
    }
  }
  return appointments;
};