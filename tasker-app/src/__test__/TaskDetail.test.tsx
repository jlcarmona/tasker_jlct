import { act, fireEvent, render, RenderResult, screen } from "@testing-library/react";
import TaskDetail, { ITaskDetailParams } from "../components/TaskDetail";
import Fixtures from "../__fixture__/fixtures";

const renderTestDetail = () => {
    const props: ITaskDetailParams = {
        task: Fixtures.taskDetail,
        idCheckSelected: (value: 1) => { }
    }
    return render(<TaskDetail {...props} />);
}

const renderTestDetailNoTask = () => {
    const props: ITaskDetailParams = {
        task: null,
        idCheckSelected: (value: 1) => { }
    }
    return render(<TaskDetail {...props} />);
}

describe("TaskDetail component", () => {

    test('Component is initied with the task data when task data is passed', async () => {

        await act(async () => {
            renderTestDetail();
        });

        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText(new Date(Date.UTC(2022, 3, 1)).toLocaleDateString())).toBeInTheDocument();

    });

    test('Task id is properly fed properly to the root element of the container', async () => {

        let component: RenderResult = null;
        await act(async () => {
            component = renderTestDetail();
        });

        expect(component.container.firstElementChild).toHaveAttribute("id", "{task.id}");

    });

    test('Checkbox is rendered properly and is unchecked', async () => {

        await act(async () => {
            renderTestDetail();
        });

        expect(screen.getByRole("checkbox")).not.toBeChecked()

    });

    test('Checkbox calls onChangeCheckBox function when changed', async () => {

        await act(async () => {
            renderTestDetail();
        });

        const onChangeCheckBox = jest.fn();
        const event = {
            target: { checked: true }
        } as React.ChangeEvent<HTMLInputElement>;

        const checkBoxTask = screen.getByRole("checkbox");
        fireEvent.click(checkBoxTask, event);
        expect(onChangeCheckBox).toBeCalled;

    });

    test('Calling component with no params renders empty element', async () => {

        let component: RenderResult = null;
        await act(async () => {
            component = renderTestDetailNoTask();
        });

        expect(component.container.firstElementChild.firstChild).toBeNull();

    });

});
