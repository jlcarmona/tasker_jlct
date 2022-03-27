import { act, render, screen } from "@testing-library/react";
import Modal, { IModalParameters } from "../components/Modal";

const renderModal = () => {
  const defaultProps: IModalParameters = {
    showModal: true,
    children: "Child component"
  };
  return render(<Modal {...defaultProps} />);
}

const renderModalHide = () => {
  const defaultProps: IModalParameters = {
    showModal: false,
    children: "Child component"
  };
  return render(<Modal {...defaultProps} />);
}

describe("Modal component", () => {

  test("Modal window is created properly with a children component", async () => {

    await act(async () => {
      renderModal();
    });

    const childElement = await screen.findByText("Child component");
    expect(childElement).toHaveTextContent("Child component");

  });

  test("Modal window is showed when showModal is true", async () => {

    let component = null;
    await act(async () => {
      component = renderModal();
    });
    expect(component.container.firstChild).toHaveClass("display-block");

  });

  test("Modal window is not showed when showModal is false", async () => {

    let component = null;
    await act(async () => {
      component = renderModalHide();
    });
    expect(component.container.firstChild).toBeNull();

  });

});
