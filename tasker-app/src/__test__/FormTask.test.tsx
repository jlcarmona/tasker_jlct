import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormTask, { IFormTaskParams } from "../components/FormTask";
import ITask from "../types/tasker.types";
import MockFixtures from "../__fixture__/fixtures";

// Mocking taskservices
jest.mock('../services/Task.services', () => {
  return {
    get: (taskId: number) => MockFixtures.taskResolved,
    update: (taskId: number, task: ITask) => MockFixtures.taskResolved,
    create: (task: ITask) => MockFixtures.taskResolved
  }
});

describe("FormTask component", () => {

  const renderFormTaskUpdate = () => {
    const props: IFormTaskParams = {
      updateAction: () => jest.fn(),
      cancelAction: () => jest.fn(),
      taskId: 1
    }
    return render(<FormTask {...props} />);
  }

  const renderFormTaskCreate = () => {
    const props: IFormTaskParams = {
      updateAction: () => jest.fn(),
      cancelAction: () => jest.fn(),
      taskId: null
    }
    return render(<FormTask {...props} />);
  }

  test("When form is invoked with no task, name field is empty and date field is init with today", async () => {
    await act(async () => {
      renderFormTaskCreate();
    });

    // Default value for taskDate
    const expectedValue: string = new Date().toISOString().substr(0, 10)

    expect(screen.getByRole("textbox")).toHaveValue("");

    // input type="date" ar not matched using getByRole("textbox")
    expect(document.querySelector("#taskDate")).toHaveValue(expectedValue);

  });

  test("When form is invoked with a task, form fields are fed ", async () => {
    await act(async () => {
      renderFormTaskUpdate();
    });

    expect(screen.getByRole("textbox")).toHaveValue("Task test 1");
    expect(document.querySelector("#taskDate")).toHaveValue("2022-04-15");

  });

  test("When form is invoked with a task, form data is sent properly when saving", async () => {

    await act(async () => {
      renderFormTaskUpdate();
    });

    const saveButton: HTMLElement = screen.getByRole("button", { name: "Save" });

    await act(async () => {
      userEvent.click(saveButton);
    });

    expect(screen.getByTitle("task form")).toHaveFormValues({ name: "Task test 1", taskDate: "2022-04-15" });
  });

  test("When form is invoked without a task and the form fields are fed, form data is sent properly when saving", async () => {

    let container = null;
    await act(async () => {
      container = renderFormTaskCreate();
    });

    const saveButton: HTMLElement = screen.getByRole("button", { name: "Save" });

    // Simulate user input 
    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "T");
    });

    // Save button is clicked
    await act(async () => {
      userEvent.click(saveButton);
    });

    const expectedValue: string = new Date().toISOString().substr(0, 10)
    expect(screen.getByTitle("task form")).toHaveFormValues({ name: "T", taskDate: expectedValue });
  });

});
