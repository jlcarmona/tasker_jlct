import { useState } from 'react';
import TaskList from './components/TaskList';
import FormTask from './components/FormTask';
import Modal from './components/Modal';
import taskerServices from './services/Task.services';


// When a task is deleted all checkboxes have to be unchecked
const setAllChecksFalse = () => {
  const checkboxes = document.getElementsByClassName("taskCheckBox");
  for (let i = 0; i < checkboxes.length; i++)
    (checkboxes[i] as HTMLInputElement).checked = false;
};

const App = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [checkSelected, setCheckedSelected] = useState<number | null>();
  const [showModal, isShowModal] = useState<boolean>(false);
  const [taskIdSelected, setTaskIdSelected] = useState<number>();
  const [error, setError] = useState<Error>();

  const handleEdit = () => {
    setTaskIdSelected(checkSelected);
    isShowModal(true);
    setError(null);
  };
  const handleClose = () => {
    isShowModal(false);
    setRefresh(true);
    setError(null);
  }
  const handleNew = () => {
    setTaskIdSelected(null);
    isShowModal(true);
    setError(null);
  }
  const handleDelete = () => {
    taskerServices.delete(checkSelected)
      .then((response) => { setRefresh(true); setAllChecksFalse(); setCheckedSelected(null); setError(null); })
      .catch((err) => { console.error(err); setError(new Error("Error deleting task.", err)); });
  }
  const handleChecked = (idCheckSelected) => {
    setCheckedSelected(idCheckSelected);
    setError(null);
  }
  const handleError = (err: Error) => {
    const finalError: Error = err != null ? new Error("Error loading tasks list", err) : null;
    setError(finalError);
  }

  return (
    <div className="App">
      <div className="headerContainer">
        <div className="titleHeader"><h2>Tasker</h2></div>
        <div className="copyright"><h2>Jose Luis Carmona</h2></div>
      </div>
      <div className="buttonsContainer">
        <div className="errorApp">{error != null ? error.message : null}</div>
        <button name="New" className="buttonHeader" onClick={handleNew}>New</button>
        <button name="Edit" className="buttonHeader" onClick={handleEdit} disabled={checkSelected == null}>Edit</button>
        <button name="Delete" className="buttonHeader" onClick={handleDelete} disabled={checkSelected == null}>Delete</button>
      </div>
      <div className="tasksContainer">
        <TaskList mustUpdate={refresh} update={setRefresh} handleChecked={handleChecked} errorHandler={handleError} />
      </div>
      <div>
        <Modal showModal={showModal}>
          <FormTask updateAction={handleClose} cancelAction={handleClose} taskId={taskIdSelected}></FormTask>
        </Modal>
      </div>
    </div>
  );
}

export default App;
