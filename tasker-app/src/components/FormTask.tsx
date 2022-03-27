import { useState, useEffect } from "react";
import ITask, { Task } from "../types/tasker.types";
import taskServices from "../services/Task.services";

// Params used to call the component
export interface IFormTaskParams {
  updateAction(): void;
  cancelAction(): void;
  taskId?: number;
}

// Empty task
const emptyTask: ITask = new Task(null, "", new Date());
let isUpdate: boolean = false;


export const FormTask = (params: IFormTaskParams) => {

  isUpdate = (params != null && params.taskId != null);
  const taskIdParam: number = params?.taskId;
  const [state, setState] = useState<ITask>(emptyTask);
  const [error, setError] = useState<Error>();

  const insertOrUpdateTask = (state: ITask, isUpdate: boolean, params: IFormTaskParams) => {
    if (isUpdate) {
      taskServices.update(Number(state.id), state)
        .then((value) => { params.updateAction(); })
        .catch((err) => {
          console.error(err);
          setError(new Error("Error saving data"))
        });
    } else {
      taskServices.create(state)
        .then((value) => { params.updateAction(); })
        .catch((err) => {
          console.error(err);
          setError(new Error("Error saving data"));
        });
    }
  }

  // Get the task data from database to avoid dirty reads
  useEffect(() => {
    if (isUpdate) {
      taskServices.get(taskIdParam)
        .then(response => { setState(response.data) })
        .catch(err => { setError(err) });
    }
  }, []);

  // When any changes are made the state is updated
  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setState(prev => ({
      ...prev,
      [key]: value
    }));
  }

  // Task data submission
  const submitData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    insertOrUpdateTask(state, isUpdate, params);
  }

  // Form rendering
  return (
    <form onSubmit={submitData} title="task form">
      <input id="taskId" name="taskId" type="hidden" value={!state ? state?.id : ""}></input>
      <div className="fieldsContainer">
        <div className="taskField">
          <label>Task name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            maxLength={50}
            required
          />
        </div>
        <div className="taskField">
          <label>Task date</label>
          <input
            id="taskDate"
            type="date"
            name="taskDate"
            value={new Date(state.taskDate).toISOString().substr(0, 10)}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="formError">{error != null ? error.message : ""}</div>
      <div className="buttonContanier">
        <input type="submit" className="buttonTask" value="Save" name="Save" />
        <input type="button" className="buttonTask" value="Close" onClick={params.cancelAction} />
      </div>
    </form>
  )
}

export default FormTask;
