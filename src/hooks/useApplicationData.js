import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state.day, state.days, appointments);
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => {
        return { ...prev, appointments, days };
      });
    });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state.day, state.days, appointments);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => {
        return { ...prev, appointments, days };
      });
    });
  };

  const updateSpots = function (day, days, appointments) {
    let spots = 0;
    const dayObj = days.find((dayEntry) => dayEntry.name === day);
    for (const appointmentID of dayObj.appointments) {
      if (!appointments[appointmentID].interview) {
        spots++;
      }
    }
    const newDayObj = { ...dayObj, spots };
    const newArray = days.map((item) => (item.name === day ? newDayObj : item));
    return newArray;
  };

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");
    Promise.all([promise1, promise2, promise3]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
