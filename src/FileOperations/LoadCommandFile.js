import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LoadCommandFile(props) {
  const [show, setShow] = useState(false);
  const [clearPoints, setClearPoints] = useState(false);
  const [files, setFiles] = useState("");
  const [fileContents, setFileContents] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) { setClearPoints(e.target.checked); }

  function handleFilesChanged (e) {
    console.log("file changed");

    const file = e.target.files[0];
    //console.log(file)

    setFiles(file);

    if (!file.type) {
        //status.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
        return;
      }
      if (!file.type.match('application/json')) {
        //status.textContent = 'Error: The selected file does not appear to be a jason baby.'
        return;
      }
      const reader = new FileReader();
      reader.addEventListener('load', event => {
        var fileContents = event.target.result;
        //console.log('contents:' + fileContents);
        setFileContents(fileContents);
      });
      reader.readAsText(file);
  }

  function handleOnLoad (e) {
    console.log("file on load event");
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Load Command File
      </Button>

      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Command File selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            <input
              type="checkbox"
              checked={clearPoints}
              onChange={handleChange}
            />
            Clear canvas points
          </label><br/>
          <form
              onSubmit={(e) => {
                  handleClose();
                  e.preventDefault();
                  props.processCommandFile(clearPoints, files, fileContents);
              }}
              id="editmodal"
              className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  Command File Path
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="filePath"
                  type="file"
                  multiple
                  name="jsonfiles"
                  
                  onChange={handleFilesChanged}
                  onLoad={handleOnLoad}
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
              Load command file
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoadCommandFile;