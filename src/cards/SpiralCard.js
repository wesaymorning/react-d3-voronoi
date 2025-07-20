import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Tooltip } from 'react-tooltip'
import { GrAdd, GrSubtract, GrTrash, GrCopy } from "react-icons/gr";

function Spiral(props) {

    const handleChangeSpiral = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...props.spirals];
        onChangeValue[index][name] = parseInt(value);
        props.setoSpirals(onChangeValue);
      };

      function handleChangeSpiralValueAdd(index, name) {
        let onChangeValue = [...props.spirals];
        onChangeValue[index][name] = parseInt(onChangeValue[index][name]) + 1;
        props.setoSpirals(onChangeValue);
      };

      function handleChangeSpiralValueDec(index, name) {
        let onChangeValue = [...props.spirals];
        onChangeValue[index][name] = parseInt(onChangeValue[index][name]) - 1;
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

      function handleChangeUseRelative(e, index) { 
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

      const handleCopySpiral = () => {
        props.setoSpirals([...props.spirals, { enabled: props.spiral.enabled,
                                               useCenter: props.spiral.useCenter, 
                                               useRelative: props.spiral.useRelative,
                                               centerX: props.spiral.centerX, 
                                               centerY: props.spiral.centerY, 
                                               startRadius: props.spiral.startRadius, 
                                               stopRadius: props.spiral.stopRadius,
                                               startAngle: props.spiral.startAngle, 
                                               totalAngle: props.spiral.totalAngle, 
                                               sectors: props.spiral.sectors
                                              }
            ]
          );
      };
    
      // 

    return (
        <>

            <div key={props.index}>
              <Card style={{ width: '18rem' }} className="spiral_card">
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

                  <a data-tooltip-id="usecenter-checkbox-tooltip" data-tooltip-content="use relative" data-tooltip-place="top" >
                  <input
                    name="useRelative"
                    type="checkbox"
                    checked={props.spiral.useRelative}
                    onChange={(event) => handleChangeUseRelative(event, props.index)}
                  />
                  </a>
                  <Tooltip id="usecenter-checkbox-tooltip" />

                  <a data-tooltip-id="center-x-tooltip" data-tooltip-content="center X" data-tooltip-place="top" >
                    <button onClick={() => handleChangeSpiralValueDec(props.index, "centerX")}><GrSubtract/></button>
                    <input 
                      class="cardo_input"
                      name="centerX"
                      type="text" 
                      placeholder="center X"
                      value={props.spiral.centerX}
                      onChange={(event) => handleChangeSpiral(event, props.index)}
                    />
                  </a>
                  <button onClick={() => handleChangeSpiralValueAdd(props.index, "centerX")}><GrAdd/></button>
                  <Tooltip id="center-x-tooltip" />

                  <a data-tooltip-id="center-y-tooltip" data-tooltip-content="center Y" data-tooltip-place="top" >
                    <button onClick={() => handleChangeSpiralValueDec(props.index, "centerY")}><GrSubtract/></button>
                    <input 
                      class="cardo_input"
                      name="centerY"
                      type="text" 
                      placeholder="center Y"
                      value={props.spiral.centerY}
                      onChange={(event) => handleChangeSpiral(event, props.index)}
                    />
                  </a>
                  <button onClick={() => handleChangeSpiralValueAdd(props.index, "centerY")}><GrAdd/></button>
                  <Tooltip id="center-y-tooltip" />

                  <br/>

                  <label>radius   </label>
                  <a data-tooltip-id="start-radius-tooltip" data-tooltip-content="start radius" data-tooltip-place="top" >
                  <button onClick={() => handleChangeSpiralValueDec(props.index, "startRadius")}><GrSubtract/></button>
                  
                  <input
                    name="startRadius"
                    type="text"
                    class="cardo_input" 
                    placeholder="start radius"
                    value={props.spiral.startRadius}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                    width="50px"
                  />
                  </a>
                  
                  <button onClick={() => handleChangeSpiralValueAdd(props.index, "startRadius")}><GrAdd/></button>
                  <Tooltip id="start-radius-tooltip" />
                  <a data-tooltip-id="stop-radius-tooltip" data-tooltip-content="stop radius" data-tooltip-place="top" >
                  <button onClick={() => handleChangeSpiralValueDec(props.index, "stopRadius")}><GrSubtract/></button>
                  <input
                    name="stopRadius"
                    type="text"
                    class="cardo_input" 
                    placeholder="stop radius"
                    value={props.spiral.stopRadius}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  </a>
                  <Tooltip id="stop-radius-tooltip" />
                  <button onClick={() => handleChangeSpiralValueAdd(props.index, "stopRadius")}><GrAdd/></button>
                  <br/>

                  <label>angle</label>
                  <a data-tooltip-id="start-angle-tooltip" data-tooltip-content="start angle" data-tooltip-place="top" >
                  <button onClick={() => handleChangeSpiralValueDec(props.index, "startAngle")}><GrSubtract/></button>
                  <input
                    name="startAngle"
                    type="text"
                    class="cardo_input" 
                    placeholder="start angle"
                    value={props.spiral.startAngle}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  </a>
                  <Tooltip id="start-angle-tooltip" />
                  <button onClick={() => handleChangeSpiralValueAdd(props.index, "startAngle")}><GrAdd/></button>
                  <a data-tooltip-id="total-angle-tooltip" data-tooltip-content="total angle" data-tooltip-place="top" >
                  <button onClick={() => handleChangeSpiralValueDec(props.index, "totalAngle")}><GrSubtract/></button>
                  <input
                    name="totalAngle"
                    type="text"
                    class="cardo_input"
                    placeholder="total angle"
                    value={props.spiral.totalAngle}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  </a>
                  <Tooltip id="total-angle-tooltip" />
                  <button onClick={() => handleChangeSpiralValueAdd(props.index, "totalAngle")}><GrAdd/></button>
                  <br/>
                  <label>sectors</label>
                  <button onClick={() => handleChangeSpiralValueDec(props.index, "sectors")}><GrSubtract/></button>
                  <input
                    name="sectors"
                    type="text"
                    class="cardo_input"
                    placeholder="sectors"
                    value={props.spiral.sectors}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  <button onClick={() => handleChangeSpiralValueAdd(props.index, "sectors")}><GrAdd/></button>
                <button onClick={() => handleDeleteSpiral(props.index)}><GrTrash/></button>
                <button onClick={() => handleCopySpiral()}><GrCopy /></button>
                </Card.Body>
              </Card>
            </div>
        
        </>
    )
}


export default Spiral;