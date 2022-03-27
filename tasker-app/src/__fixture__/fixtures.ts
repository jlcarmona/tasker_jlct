import { AxiosResponse } from "axios"
import ITask, { Task } from "../types/tasker.types"


class Fixtures {

    // Promise resolved with no error returning a tasks array
    static listTasksResolved: Promise<AxiosResponse<ITask[]>> = new Promise((resolve, reject) => {
        resolve(
            {
                data: [
                    { id: 1, name: 'Task test 1', taskDate: new Date(Date.UTC(2022, 3, 15)) },
                    { id: 2, name: 'Task test 2', taskDate: new Date(Date.UTC(2022, 3, 15)) }
                ],
                status: 200, statusText: 'OK', config: {}, headers: {}
            }
        )
    });

    // Promise resolved with no error returning one task
    static taskResolved: Promise<AxiosResponse<ITask>> = new Promise((resolve, reject) => {
        resolve(
            {
                data: { id: 1, name: 'Task test 1', taskDate: new Date(Date.UTC(2022, 3, 15)) },
                status: 200, statusText: 'OK', config: {}, headers: {}
            }
        )
    })

    // Promise resolved with no error returning an empty array
    static resolvedNoData: Promise<AxiosResponse<ITask[]>> = new Promise((resolve, reject) => {
        resolve(
            { data: [], status: 200, statusText: 'OK', config: {}, headers: {} }
        )
    });

    // A task 
    static taskDetail: ITask = new Task(1, "Task 1", new Date(Date.UTC(2022, 3, 1)));

    // An array of tasks
    static tasksData: ITask[] = [{ id: 1, name: 'Task test 1', taskDate: new Date(Date.UTC(2022, 3, 15)) },
                                { id: 2, name: 'Task test 2', taskDate: new Date(Date.UTC(2022, 3, 16)) }]

};

export default Fixtures;
