export default interface ITask {
    id?: number,
    name: string,
    taskDate: Date
}

export class Task implements ITask {
    id?: number;
    name: string;
    taskDate: Date;

    constructor(id:number, name:string, taskDate:Date){
        this.id = id;
        this.name = name;
        this.taskDate = taskDate;
    }
}
  