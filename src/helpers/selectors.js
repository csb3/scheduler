const getAppointmentsForDay = function(state, day) {
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

const getInterview = function(state, interview) {
  if (interview) {
    for (const interviewer in state.interviewers) {
      if (Number(interviewer) === interview.interviewer) {
        const newObject = {...interview};
        newObject.interviewer = state.interviewers[interviewer];
        return newObject;
      }
    }
  }
  return null;
};

const getInterviewersForDay = function(state, day) {
  let selectedDay;
  let interviewers = [];
  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      selectedDay = stateDay;
    }
  }

  if (selectedDay) {
    for (const interviewer of selectedDay.interviewers) {
    interviewers.push(state.interviewers[interviewer]);
    }
  }
  return interviewers;
};

export {getInterview, getAppointmentsForDay, getInterviewersForDay};