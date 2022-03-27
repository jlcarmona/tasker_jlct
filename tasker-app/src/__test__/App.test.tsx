import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import ITask from "../types/tasker.types";
import MockFixtures from "../__fixture__/fixtures";

// Mocking taskservices
jest.mock('../services/Task.services', () => {
  return {
    getAll: () => MockFixtures.listTasksResolved,
    get: (taskId: number) => MockFixtures.taskResolved,
    delete: (taskId: number) => MockFixtures.taskResolved,
    update: (taskId: number, task: ITask) => MockFixtures.taskResolved,
    create: (task: ITask) => MockFixtures.taskResolved
  }
});

describe("App component", () => {

  const renderApp = () => {
    return render(<App />);
  }

  test("When accessing the first time, Edit and Delete buttons are disabled and is showed Task 1 and Task 2 on the list", async () => {

    await act(async () => {
      renderApp();
    });

    const newButton: HTMLElement = screen.getByRole("button", { name: "New" });
    const editButton: HTMLElement = screen.getByRole("button", { name: "Edit" });
    const deleteButton: HTMLElement = screen.getByRole("button", { name: "Delete" });
    const task1: HTMLElement = screen.getByText("Task test 1");
    const task2: HTMLElement = screen.getByText("Task test 2");

    expect(newButton).not.toHaveAttribute("disabled");
    expect(editButton).toHaveAttribute("disabled");
    expect(deleteButton).toHaveAttribute("disabled");
    expect(deleteButton).toHaveAttribute("disabled");
    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();

  });

  test("When button 'New' is clicked a task detail modal window is showed and the field name is empty", async () => {

    await act(async () => {
      renderApp();
    });

    const newButton: HTMLElement = screen.getByRole("button", { name: "New" });

    await act(async () => {
      userEvent.click(newButton);
    });

    expect(screen.getByTitle("taskDetail")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").at(0)).toBeEmptyDOMElement();

  });

  test("When a task is selected and the button 'Edit' is clicked, a task detail modal window is showed and the task data is showed", async () => {

    await act(async () => {
      renderApp();
    });

    const editButton: HTMLElement = screen.getByRole("button", { name: "Edit" });
    const checkboxToBeChecked: HTMLElement = (await screen.findAllByRole("checkbox")).at(0);

    // Task is selected
    await act(async () => {
      userEvent.click(checkboxToBeChecked);
    });

    // Button edit is clicked
    await act(async () => {
      userEvent.click(editButton);
    });

    expect(document.querySelector(".modal")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").at(0)).toHaveValue("Task test 1");

  });

  test("When a task is selected and the button 'Delete' is clicked, a task is deleted and no task are selected", async () => {

    await act(async () => {
      renderApp();
    });

    const deleteButton = screen.getByRole("button", { name: "Delete" });

    const firstCheckBox: HTMLElement = (await screen.findAllByRole("checkbox")).at(0);

    await act(async () => {
      userEvent.click(firstCheckBox);
    });

    await act(async () => {
      userEvent.click(deleteButton);
    });

    expect(document.querySelector("input[type=checkbox]:checked")).toBeNull();
  });

  test("When the button close of the modal window is clicked, the  modal window is not showed anymore", async () => {

    await act(async () => {
      renderApp();
    });
    const newButton = screen.getByRole("button", { name: "New" });
    await act(async () => {
      userEvent.click(newButton);
    });

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: "Close" }));
    });

    expect(document.querySelector(".modal")).not.toBeInTheDocument();
  });

  test("When the button Save of the modal window is clicked, a new insert/update is made and the modal window is not showed anymore", async () => {

    await act(async () => {
      renderApp();
    });

    const editButton: HTMLElement = screen.getByRole("button", { name: "Edit" });
    const checkboxToBeChecked: HTMLElement = (await screen.findAllByRole("checkbox")).at(0);

    // Select task
    await act(async () => {
      userEvent.click(checkboxToBeChecked);
    });

    // Click edit button
    await act(async () => {
      userEvent.click(editButton);
    });

    // Click save button
    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: "Save" }));
    });

    expect(document.querySelector(".modal")).not.toBeInTheDocument();
  });

});
