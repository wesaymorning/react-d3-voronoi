import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SavePointsFile(props) {
  const [show, setShow] = useState(false);
  const [fileName, setFileName] = useState("points.json");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleFileChanged (e) {
    console.log("file changed");

    const file = e.target.value;
    //console.log(file)

    setFileName(file);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Save Points File
      </Button>

      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Points File selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
              onSubmit={(e) => {
                  handleClose();
                  e.preventDefault();
                  props.savePoints(fileName);
              }}
              id="editmodal"
              className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  Points File Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                      class="file_name_input"
                      name="fileName"
                      type="text" 
                      placeholder="file name"
                      value={fileName}
                      onChange={handleFileChanged}
                />
              </div>
            </div>
              
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
              className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleClose}
          >
              Close
          </button>
          <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              form="editmodal"
          >
              Save points file
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SavePointsFile;