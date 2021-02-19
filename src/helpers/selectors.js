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

export function getInterview(state, interview) {
  if (interview) {
    for (const interviewer in state.interviewers) {
      console.log("interviewer: ", interviewer, typeof interviewer);
      console.log("interview.interviewer: ", interview.interviewer, typeof interview.interviewer);
      console.log("interviewer === interview.interviewer: ", interviewer === interview.interviewer);
      if (Number(interviewer) === interview.interviewer) {
        const newObject = {...interview};
        newObject.interviewer = state.interviewers[interviewer];
          return newObject;
      }
    }
  }
  return null;
};