import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time="12pm"/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={props.interview.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm onConfirm={deleteInterview} onCancel={back} message="Delete the appointment?"/>
      )}
      {mode === EDIT && (
        <Form name={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onCancel={back} onSave={save}/>
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" />
      )}
    </article>
  )
}