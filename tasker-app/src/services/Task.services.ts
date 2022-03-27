import axios, { AxiosResponse } from "axios";
import ITask from "../types/tasker.types";

export class TaskServices {

  baseURL: string = null;

  public constructor() {
    const currentDomain: string = window.location.hostname;

    /** I used this approach because a problem with the use of environment variables, due to this 
    "https://github.com/facebook/create-react-app/issues/11773". I tried to force 
    "react-error-overlay": "6.0.9" but it doesn't work for me */
    this.baseURL = currentDomain === "localhost" || currentDomain === "127.0.0.1" ? "http://localhost:8080/task" : "/task"
  }

  async getAll(): Promise<AxiosResponse<ITask[]>> {
    return await axios.get<Array<ITask>>(this.baseURL);
  }
  async get(taskId: number): Promise<AxiosResponse<ITask>> {
    return await axios.get<ITask>(this.baseURL + '/' + taskId);
  }
  async create(task: ITask): Promise<AxiosResponse<ITask>> {
    return await axios.post<ITask>(this.baseURL, task);
  }
  async update(taskId: number, task: ITask): Promise<AxiosResponse<ITask>> {
    return await axios.put<ITask>(this.baseURL + '/' + taskId, task);
  }
  async delete(taskId: number): Promise<AxiosResponse<ITask>> {
    return await axios.delete<ITask>(this.baseURL + '/' + taskId);
  }
}

export default new TaskServices();
