import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(
    () => {
      const promise1 = axios.get("/api/days");
      const promise2 = axios.get("/api/appointments");
      Promise.all([promise1, promise2]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
        })}, []);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        <ul>{dailyAppointments.map((appointment) => <Appointment key={appointment.id} {...appointment} />)}</ul>
      </section>
    </main>
  );
}

