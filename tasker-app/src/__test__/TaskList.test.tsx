import { render, screen } from "@testing-library/react";
import TaskList, { ITaskListParams } from "../components/TaskList";
import { act } from "react-dom/test-utils";
import MockFixtures from "../__fixture__/fixtures"

jest.mock('../services/Task.services', () => {
    return {
        TaskServices: jest.fn().mockImplementation(() => { }),
        getAll: () => MockFixtures.listTasksResolved
    }
});

const renderTestTaskListUpdate = async () => {
    const props: ITaskListParams = {
        update: (Error) => { return null; },
        handleChecked: (idTaskSelected: number | null) => { return 1; },
        mustUpdate: true,
        errorHandler: (Error) => { return null; }
    }
    return render(<TaskList {...props} />);
}

describe("Tasklist component", () => {

    test('The list of the tasks is showed properly', async () => {

        await act(async () => {
            renderTestTaskListUpdate()
        })

        expect(screen.getByText("Task test 1")).toBeInTheDocument();
        expect(screen.getByText("Task test 2")).toBeInTheDocument();
    })

});
