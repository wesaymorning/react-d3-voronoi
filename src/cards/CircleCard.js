import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Tooltip } from 'react-tooltip';
import { GrAdd, GrSubtract, GrTrash } from "react-icons/gr";

function Circle(props) {

      const handleChangeCircle = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...props.circles];
        onChangeValue[index][name] = parseInt(value);
        props.setoCircles(onChangeValue);
      };

      function handleChangeCircleValueAdd(index, name) {
        let onChangeValue = [...props.circles];
        onChangeValue[index][name] = parseInt(onChangeValue[index][name]) + 1;
        props.setoCircles(onChangeValue);
      };

      function handleChangeCircleValueDec(index, name) {
        let onChangeValue = [...props.circles];
        onChangeValue[index][name] = parseInt(onChangeValue[index][name]) - 1;
        props.setoCircles(onChangeValue);
      };
    
      function handleChangeEnabled(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.circles];
        onChangeValue[index][name] = e.target.checked;
        props.setoCircles(onChangeValue);
      }
    
      function handleChangeUseCenter(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.circles];
        onChangeValue[index][name] = e.target.checked;
        props.setoCircles(onChangeValue);
      }

      function handleChangeUseRelative(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.circles];
        onChangeValue[index][name] = e.target.checked;
        props.setoCircles(onChangeValue);
      }

      const handleDeleteCircle = (index) => {
        const newArray = [...props.circles];
        newArray.splice(index, 1);
        props.setoCircles(newArray);
        props.genPoints();
      };

    return (
        <>
            <div key={props.index}>
              <Card style={{ width: '18rem' }} className="circle_card">
                <Card.Body>
                  <Card.Title>circle</Card.Title>

                  <a data-tooltip-id="circle_checkbox-tooltip" data-tooltip-content="enable/disable circle" data-tooltip-place="top" >

                  <input
                    name="enabled"
                    type="checkbox"
                    checked={props.circle.enabled}
                    onChange={(event) => handleChangeEnabled(event, props.index)}
                    placeholder="enabled"
                  />

                  </a>
                  <Tooltip id="circle_checkbox-tooltip" />
                  
                  <br/>   

                  <a data-tooltip-id="usecenter-checkbox-tooltip" data-tooltip-content="use window center" data-tooltip-place="top" >
                  <input
                    name="useCenter"
                    type="checkbox"
                    checked={props.circle.useCenter}
                    onChange={(event) => handleChangeUseCenter(event, props.index)}
                  />
                  </a>
                  <Tooltip id="usecenter-checkbox-tooltip" />

                  <a data-tooltip-id="usecenter-checkbox-tooltip" data-tooltip-content="use relative" data-tooltip-place="top" >
                  <input
                    name="useRelative"
                    type="checkbox"
                    checked={props.circle.useRelative}
                    onChange={(event) => handleChangeUseRelative(event, props.index)}
                  />
                  </a>
                  <Tooltip id="usecenter-checkbox-tooltip" />

                  <a data-tooltip-id="center-x-tooltip" data-tooltip-content="center X" data-tooltip-place="top" >
                    <button onClick={() => handleChangeCircleValueDec(props.index, "centerX")}><GrSubtract/></button>
                    <input 
                      className="cardo_input"
                      name="centerX"
                      type="text" 
                      placeholder="center X"
                      value={props.circle.centerX}
                      onChange={(event) => handleChangeCircle(event, props.index)}
                    />
                    <button onClick={() => handleChangeCircleValueAdd(props.index, "centerX")}><GrAdd/></button>
                    
                  </a>
                  
                  <Tooltip id="center-x-tooltip" />

                  <a data-tooltip-id="center-y-tooltip" data-tooltip-content="center Y" data-tooltip-place="top" >
                    <button onClick={() => handleChangeCircleValueDec(props.index, "centerY")}><GrSubtract/></button>
                    <input 
                      className="cardo_input"
                      name="centerY"
                      type="text" 
                      placeholder="center Y"
                      value={props.circle.centerY}
                      onChange={(event) => handleChangeCircle(event, props.index)}
                    />
                    <button onClick={() => handleChangeCircleValueAdd(props.index, "centerY")}>
                      <GrAdd/>
                    </button>
                    
                  </a>
                  <Tooltip id="center-y-tooltip" />

                  <br/>

                  <label>radius</label>
                  <a data-tooltip-id="radius-tooltip" data-tooltip-content="radius" data-tooltip-place="top" >
                  <button onClick={() => handleChangeCircleValueDec(props.index, "radius")}><GrSubtract/></button>
                  <input
                    name="radius"
                    type="text"
                    className="cardo_input" 
                    placeholder="radius"
                    value={props.circle.radius}
                    onChange={(event) => handleChangeCircle(event, props.index)}
                  />
                  <button onClick={() => handleChangeCircleValueAdd(props.index, "radius")}><GrAdd/></button>
                  </a>
                  <Tooltip id="radius-tooltip" />
                  
                  <br/>

                  <label>angle</label>
                  <button onClick={() => handleChangeCircleValueDec(props.index, "startAngle")}><GrSubtract/></button>
                  <input
                    name="startAngle"
                    type="text"
                    className="cardo_input" 
                    placeholder="start angle"
                    value={props.circle.startAngle}
                    onChange={(event) => handleChangeCircle(event, props.index)}
                  />
                  <button onClick={() => handleChangeCircleValueAdd(props.index, "startAngle")}><GrAdd/></button>
                  
                  <button onClick={() => handleChangeCircleValueDec(props.index, "totalAngle")}><GrSubtract/></button>
                  <input
                    name="totalAngle"
                    type="text"
                    className="cardo_input"
                    placeholder="total angle"
                    value={props.circle.totalAngle}
                    onChange={(event) => handleChangeCircle(event, props.index)}
                  />
                  <button onClick={() => handleChangeCircleValueAdd(props.index, "totalAngle")}><GrAdd/></button>
                  
                  <br/>
                  <label>sectors</label>
                  <button onClick={() => handleChangeCircleValueDec(props.index, "sectors")}><GrSubtract/></button>
                  <input
                    name="sectors"
                    type="text"
                    className="cardo_input"
                    placeholder="sectors"
                    value={props.circle.sectors}
                    onChange={(event) => handleChangeCircle(event, props.index)}
                  />
                  <button onClick={() => handleChangeCircleValueAdd(props.index, "sectors")}><GrAdd/></button>
                  
                <button onClick={() => handleDeleteCircle(props.index)}>
                  <GrTrash />
                </button>

                </Card.Body>
              </Card>
            </div>        
        </>
    )
}


export default Circle;