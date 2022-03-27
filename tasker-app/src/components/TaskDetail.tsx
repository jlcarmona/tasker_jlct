import React from 'react';
import ITask from "../types/tasker.types";

//Params used to call the component
export interface ITaskDetailParams {
  task: ITask;
  idCheckSelected(value: number | null): void;
}

// It's only allow to have one checkbox checked
const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>, taskId: number, params: ITaskDetailParams) => {
  const isChecked: boolean = e.target.checked;
  params.idCheckSelected(isChecked ? taskId : null);
  const checkboxes = document.getElementsByClassName("taskCheckBox");
  for (let i = 0; i < checkboxes.length; i++)
    (checkboxes[i] as HTMLInputElement).checked = false;
  e.target.checked = isChecked;
};

const TaskDetail = (params: ITaskDetailParams) => {

  return params.task != null ? (

    <div className="task" id="{task.id}">
      <div className="taskDet">
        <div className="taskName">{params.task.name}</div>
        <div className="taskDate">{new Date(params.task.taskDate).toLocaleDateString()}</div>
      </div>
      <div className="taskBut">
        <input type="checkbox" className="taskCheckBox" onChange={(e) => onChangeCheckBox(e, params.task.id, params)} />
      </div>
    </div>
  ) : <div />
}

export default TaskDetail;
