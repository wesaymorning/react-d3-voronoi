import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddCircle(props) {
  const [show, setShow] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [centerX, setCenterX] = useState(200);
  const [centerY, setCenterY] = useState(200);
  const [radius, setRadius] = useState(props.radius);
  const [sectors, setSectors] = useState(props.sectors);
  const [useCenter, setUseCenter] = useState(true);
  const [timedRelease, setTimedRelease] = useState(false);
  const [timeDelay, setTimeDelay] = useState(100);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) { setUseCenter(e.target.checked); }
  function handleTimedChange(e) { setTimedRelease(e.target.checked); }
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Circle
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
              checked={timedRelease}
              onChange={handleTimedChange}
            />
            Use timed delay point release
          </label>
          <form
              onSubmit={(e) => {
                  handleClose();
                  e.preventDefault();
                  props.addCircle(useCenter, centerX, centerY, startAngle, radius, sectors, timedRelease, timeDelay);
              }}
              id="editmodal"
              className="w-full max-w-sm"
          >
          {useCenter ? <></> :
            <>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  Center X
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="centerX"
                  type="number"
                  value={centerX}
                  onChange={(e) => { setCenterX(e.target.value); }}
                />
              </div>
            </div>
            
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  Center Y
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="centerY"
                  type="number"
                  value={centerY}
                  onChange={(e) => {
                    setCenterY(e.target.value);
                  }}
                />
              </div>
            </div>
            </>
            }

          <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  Start Angle
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="radius"
                  type="number"
                  value={startAngle}
                  onChange={(e) => {
                    setStartAngle(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  Radius
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="radius"
                  type="number"
                  value={radius}
                  onChange={(e) => {
                    setRadius(e.target.value);
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

            {!timedRelease ? <></> :
            <>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  Time delay between points (mS)
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="centerX"
                  type="number"
                  value={timeDelay}
                  onChange={(e) => { setTimeDelay(e.target.value); }}
                />
              </div>
            </div>
            </>
            }
              
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
              Add Circle
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCircle;