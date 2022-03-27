import axios from "axios";
import taskServices, { TaskServices } from "../services/Task.services";
import mockAxiosAdapter from "axios-mock-adapter";
import Fixtures from "../__fixture__/fixtures";
const { location } = window;

const URL_BASE: string = "http://localhost:8080/task";
let mockAxiosAdptr: mockAxiosAdapter = null;

describe("Task Services", () => {

  beforeAll(() => {
    mockAxiosAdptr = new mockAxiosAdapter(axios);
  });

  beforeEach(() => {
    mockAxiosAdptr.reset();
  });

  test("GetAll operation - get requests with no parameters get all tasks", async () => {

    mockAxiosAdptr.onGet(URL_BASE).reply(200, Fixtures.tasksData);
    const result = await taskServices.getAll();

    expect(mockAxiosAdptr.history.get[0].url).toEqual(URL_BASE);
    expect(JSON.stringify(result.data)).toEqual(JSON.stringify(Fixtures.tasksData));
  });

  test("Get operation - get requests with taskId get task data", async () => {

    const taskId: number = 1;
    const urlRequest: string = URL_BASE + '/' + taskId;

    mockAxiosAdptr.onGet(urlRequest).reply(200, Fixtures.tasksData[0]);
    const result = await taskServices.get(taskId);

    expect(mockAxiosAdptr.history.get[0].url).toEqual(urlRequest);
    expect(JSON.stringify(result.data)).toEqual(JSON.stringify(Fixtures.tasksData[0]));
  });

  test("Delete operation - delete requests with taskId delete task data", async () => {

    const taskId: number = 1;
    const urlRequest: string = URL_BASE + '/' + taskId;

    mockAxiosAdptr.onDelete(urlRequest).reply(200, Fixtures.tasksData[0]);
    const result = await taskServices.delete(taskId);

    expect(mockAxiosAdptr.history.delete[0].url).toEqual(urlRequest);
    expect(JSON.stringify(result.data)).toEqual(JSON.stringify(Fixtures.tasksData[0]));
  });

  test("Create operation - create request with taskId and task data create a new task", async () => {

    mockAxiosAdptr.onPost(URL_BASE).reply(201, Fixtures.tasksData[0]);
    const result = await taskServices.create(Fixtures.tasksData[0]);

    expect(mockAxiosAdptr.history.post[0].url).toEqual(URL_BASE);
    expect(JSON.stringify(result.data)).toEqual(JSON.stringify(Fixtures.tasksData[0]));
  });

  test("Update operation - update request with taskId and task data update the task", async () => {

    const taskId: number = 1;
    const urlRequest: string = URL_BASE + '/' + taskId;

    mockAxiosAdptr.onPut(urlRequest).reply(200, Fixtures.tasksData[0]);
    const result = await taskServices.update(taskId, Fixtures.tasksData[0]);

    expect(mockAxiosAdptr.history.put[0].url).toEqual(urlRequest);
    expect(JSON.stringify(result.data)).toEqual(JSON.stringify(Fixtures.tasksData[0]));
  });

  test("Domain is set up properly depending on where the App is running.", async () => {

    // Get the initial baseURL for the requests
    const initialDomain: string = new TaskServices().baseURL;

    // Change windows.location.hostname from localhost to 10.0.0.0 deleting the window.location object
    // and creating a new one with the new value
    const { location: Location } = window;
    delete window.location;
    const newLocation: Location = {
      hostname: "10.0.0.0", ancestorOrigins: location.ancestorOrigins,
      hash: "", host: "", href: "", origin: "", pathname: "", port: "", protocol: "", search: "",
      assign: location.assign, reload: location.reload, replace: location.replace
    };
    window.location = newLocation;

    // Get the new baseURL for the requests
    const newDomain: string = new TaskServices().baseURL;

    expect(initialDomain).toBe("http://localhost:8080/task");
    expect(newDomain).toBe("/task");

    window.location = location;

  });

});
