// Params used to call the component
export interface IModalParameters {
    showModal: boolean;
    children: any;
}

const Modal = (params: IModalParameters) => {
    const showHideClassName = params.showModal ? "modal display-block" : "modal display-none";

    return params.showModal ? (
        <div className={showHideClassName} title="taskDetail">
            <div className="modal-main">
                {params.children}
            </div>
        </div>
    ) : null;
};

export default Modal;
