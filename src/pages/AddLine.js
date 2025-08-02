import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddLine(props) {
  const [show, setShow] = useState(false);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(200);
  const [y2, setY2] = useState(200);
  const [sectors, setSectors] = useState(40);
  const [useCenter, setUseCenter] = useState(true);
  const [useRelative, setUseRelative] = useState(false);
  const [timedRelease, setTimedRelease] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) { setUseCenter(e.target.checked); }
  function handleChangeRelative(e) { setUseRelative(e.target.checked); }
  function handleTimedChange(e) { setTimedRelease(e.target.checked); }
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Line
      </Button>

      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Circle parameters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            <input
              type="checkbox"
              checked={useCenter}
              onChange={handleChange}
            />
            Use window center
          </label><br/>
          <label>
            <input
              type="checkbox"
              checked={useRelative}
              onChange={handleChangeRelative}
            />
            Use relative distance
          </label>
          <form
              onSubmit={(e) => {
                  handleClose();
                  e.preventDefault();
                  props.addLine(useCenter, useRelative, x1, y1, x2, y2, sectors);
              }}
              id="editmodal"
              className="w-full max-w-sm"
          >
      
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  x1
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="radius"
                  type="number"
                  value={x1}
                  onChange={(e) => {
                    setX1(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  y1
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="radius"
                  type="number"
                  value={y1}
                  onChange={(e) => {
                    setY1(e.target.value);
                  }}
                />
              </div>
            </div>

                        <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  x2
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="radius"
                  type="number"
                  value={x2}
                  onChange={(e) => {
                    setX2(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  y2
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="radius"
                  type="number"
                  value={y2}
                  onChange={(e) => {
                    setY2(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  Sectors
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="sectors"
                  type="number"
                  value={sectors}
                  onChange={(e) => {
                    setSectors(e.target.value);
                  }}
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
              Add Line
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddLine;