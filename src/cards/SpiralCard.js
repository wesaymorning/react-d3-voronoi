import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Tooltip } from 'react-tooltip'

function Spiral(props) {

    const handleChangeSpiral = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...props.spirals];
        onChangeValue[index][name] = parseInt(value);
        props.setoSpirals(onChangeValue);
      };
    
      function handleChangeEnabled(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.spirals];
        onChangeValue[index][name] = e.target.checked;
        props.setoSpirals(onChangeValue);
      }
    
      function handleChangeUseCenter(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.spirals];
        onChangeValue[index][name] = e.target.checked;
        props.setoSpirals(onChangeValue);
      }

      const handleDeleteSpiral = (index) => {
        const newArray = [...props.spirals];
        newArray.splice(index, 1);
        props.setoSpirals(newArray);
      };
    
      // 

    return (
        <>

            <div key={props.index}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>spiral</Card.Title>

                  <a data-tooltip-id="spiral_checkbox-tooltip" data-tooltip-content="enable/disable spiral" data-tooltip-place="top" >

                  <input
                    name="enabled"
                    type="checkbox"
                    checked={props.spiral.enabled}
                    onChange={(event) => handleChangeEnabled(event, props.index)}
                    placeholder="enabled"
                  />

                  </a>
                  <Tooltip id="spiral_checkbox-tooltip" />
                  
                  <br/>   

                  <a data-tooltip-id="usecenter-checkbox-tooltip" data-tooltip-content="use window center" data-tooltip-place="top" >
                  <input
                    name="useCenter"
                    type="checkbox"
                    checked={props.spiral.useCenter}
                    onChange={(event) => handleChangeUseCenter(event, props.index)}
                  />
                  </a>
                  <Tooltip id="usecenter-checkbox-tooltip" />

                  <a data-tooltip-id="center-x-tooltip" data-tooltip-content="center X" data-tooltip-place="top" >
                    <input 
                      class="cardo_input"
                      name="centerX"
                      type="text" 
                      placeholder="center X"
                      value={props.spiral.centerX}
                      onChange={(event) => handleChangeSpiral(event, props.index)}
                    />
                  </a>
                  <Tooltip id="center-x-tooltip" />

                  <a data-tooltip-id="center-y-tooltip" data-tooltip-content="center Y" data-tooltip-place="top" >
                    <input 
                      class="cardo_input"
                      name="centerY"
                      type="text" 
                      placeholder="center Y"
                      value={props.spiral.centerY}
                      onChange={(event) => handleChangeSpiral(event, props.index)}
                    />
                  </a>
                  <Tooltip id="center-y-tooltip" />

                  <br/>

                  <label>radius   </label>

                  <input
                    name="startRadius"
                    type="text"
                    class="cardo_input" 
                    placeholder="start radius"
                    value={props.spiral.startRadius}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  <input
                    name="stopRadius"
                    type="text"
                    class="cardo_input" 
                    placeholder="stop radius"
                    value={props.spiral.stopRadius}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  <br/>

                  <label>angle   </label>
                  <input
                    name="startAngle"
                    type="text"
                    class="cardo_input" 
                    placeholder="start angle"
                    value={props.spiral.startAngle}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  <input
                    name="totalAngle"
                    type="text"
                    class="cardo_input"
                    placeholder="total angle"
                    value={props.spiral.totalAngle}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  <br/>
                  <label>sectors </label>
                  <input
                    name="sectors"
                    type="text"
                    class="cardo_input"
                    placeholder="sectors"
                    value={props.spiral.sectors}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                <button onClick={() => handleDeleteSpiral(props.index)}>Delete</button>

                </Card.Body>
              </Card>
            </div>
        
        </>
    )
}


export default Spiral;