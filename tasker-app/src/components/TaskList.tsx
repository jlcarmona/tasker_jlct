import React, { useEffect, useState, ReactElement } from "react";
import taskServices from "../services/Task.services";
import ITask from "../types/tasker.types";
import TaskDetail from "./TaskDetail";

// Params used to call the component
export interface ITaskListParams {
  update(value: boolean): void;
  handleChecked(idTaskSelected: number | null): void;
  mustUpdate: boolean;
  errorHandler(err: Error): void;
}

const TaskList = (params: ITaskListParams): ReactElement => {
  const [list, setList] = useState<ITask[]>([]);

  // Load the data after the DOM is rendered. 
  useEffect(() => {
    taskServices.getAll()
      .then(value => {
        setList(value.data);
        params.update(false);
        params.errorHandler(null);
      })
      .catch(error => {
        params.errorHandler(error)
        console.error('rejected', error);
        params.update(false);
      });
  }, [params.mustUpdate]);

  return (
    <React.Fragment>
      {list === undefined || list.length === 0 ?
        <React.Fragment><div className="noData">No data available</div></React.Fragment> :
        list.map((task: ITask, i: number) => (<TaskDetail key={i} task={task} idCheckSelected={params.handleChecked} />))
      }
    </React.Fragment>
  )
};

export default TaskList;
