import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Tooltip } from 'react-tooltip'
import { GrAdd, GrSubtract, GrTrash, GrCopy } from "react-icons/gr";

function Line(props) {

    const handleChangeLine = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...props.lines];
        onChangeValue[index][name] = parseInt(value);
        props.setoLines(onChangeValue);
      };

      function handleChangeLineValueAdd(index, name) {
        let onChangeValue = [...props.lines];
        onChangeValue[index][name] = parseInt(onChangeValue[index][name]) + 1;
        props.setoLines(onChangeValue);
      };

      function handleChangeLineValueDec(index, name) {
        let onChangeValue = [...props.lines];
        onChangeValue[index][name] = parseInt(onChangeValue[index][name]) - 1;
        props.setoLines(onChangeValue);
      };
    
      function handleChangeEnabled(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.lines];
        onChangeValue[index][name] = e.target.checked;
        props.setoLines(onChangeValue);
      }
    
      function handleChangeUseCenter(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.lines];
        onChangeValue[index][name] = e.target.checked;
        props.setoLines(onChangeValue);
      }

      function handleChangeUseRelative(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.lines];
        onChangeValue[index][name] = e.target.checked;
        props.setoLines(onChangeValue);
      }

      const handleDeleteLine = (index) => {
        const newArray = [...props.lines];
        newArray.splice(index, 1);
        props.setoLines(newArray);
      };

      const handleCopyLine = () => {
        props.setoLines([...props.lines, { enabled: props.line.enabled,
                                           useCenter: props.line.useCenter, 
                                           useRelative: props.line.useRelative,
                                           x1: props.line.x1, 
                                           y1: props.line.y1, 
                                           x2: props.line.x2, 
                                           y2: props.line.y2, 
                                           sectors: props.line.sectors
                                          }
            ]
          );
      };
    
      // 

    return (
        <>

            <div key={props.index}>
              <Card style={{ width: '18rem' }} className="line_card">
                <Card.Body>
                  <Card.Title>line</Card.Title>

                  <a data-tooltip-id="line_checkbox-tooltip" data-tooltip-content="enable/disable line" data-tooltip-place="top" >

                  <input
                    name="enabled"
                    type="checkbox"
                    checked={props.line.enabled}
                    onChange={(event) => handleChangeEnabled(event, props.index)}
                    placeholder="enabled"
                  />

                  </a>
                  <Tooltip id="line_checkbox-tooltip" />
                  
                   

                  <a data-tooltip-id="usecenter-checkbox-tooltip" data-tooltip-content="use window center" data-tooltip-place="top" >
                  <input
                    name="useCenter"
                    type="checkbox"
                    checked={props.line.useCenter}
                    onChange={(event) => handleChangeUseCenter(event, props.index)}
                  />
                  </a>
                  <Tooltip id="usecenter-checkbox-tooltip" />

                   
                  <a data-tooltip-id="usecenter-checkbox-tooltip" data-tooltip-content="use relative" data-tooltip-place="top" >
                  <input
                    name="useRelative"
                    type="checkbox"
                    checked={props.line.useRelative}
                    onChange={(event) => handleChangeUseRelative(event, props.index)}
                  />
                  </a>
                  <Tooltip id="usecenter-checkbox-tooltip" />
                  <br/> 
                  <label>point 1</label>
                  <a data-tooltip-id="center-x-tooltip" data-tooltip-content="x1" data-tooltip-place="top" >
                    <button onClick={() => handleChangeLineValueDec(props.index, "x1")}><GrSubtract/></button>
                    <input 
                      class="cardo_input"
                      name="x1"
                      type="text" 
                      placeholder="x1"
                      value={props.line.x1}
                      onChange={(event) => handleChangeLine(event, props.index)}
                    />
                  </a>
                  <button onClick={() => handleChangeLineValueAdd(props.index, "x1")}><GrAdd/></button>
                  <Tooltip id="center-x-tooltip" />

                  <a data-tooltip-id="center-y-tooltip" data-tooltip-content="y1" data-tooltip-place="top" >
                    <button onClick={() => handleChangeLineValueDec(props.index, "y1")}><GrSubtract/></button>
                    <input 
                      class="cardo_input"
                      name="y1"
                      type="text" 
                      placeholder="y1"
                      value={props.line.y1}
                      onChange={(event) => handleChangeLine(event, props.index)}
                    />
                  </a>
                  <button onClick={() => handleChangeLineValueAdd(props.index, "y1")}><GrAdd/></button>
                  <Tooltip id="center-y-tooltip" />

                  <br/>

                  <label>point 2</label>
                  <a data-tooltip-id="center-x-tooltip" data-tooltip-content="x2" data-tooltip-place="top" >
                    <button onClick={() => handleChangeLineValueDec(props.index, "x2")}><GrSubtract/></button>
                    <input 
                      class="cardo_input"
                      name="x2"
                      type="text" 
                      placeholder="x2"
                      value={props.line.x2}
                      onChange={(event) => handleChangeLine(event, props.index)}
                    />
                  </a>
                  <button onClick={() => handleChangeLineValueAdd(props.index, "x2")}><GrAdd/></button>
                  <Tooltip id="center-x-tooltip" />

                  <a data-tooltip-id="center-y-tooltip" data-tooltip-content="y2" data-tooltip-place="top" >
                    <button onClick={() => handleChangeLineValueDec(props.index, "y2")}><GrSubtract/></button>
                    <input 
                      class="cardo_input"
                      name="y2"
                      type="text" 
                      placeholder="y2"
                      value={props.line.y2}
                      onChange={(event) => handleChangeLine(event, props.index)}
                    />
                  </a>
                  <button onClick={() => handleChangeLineValueAdd(props.index, "y1")}><GrAdd/></button>
                  <Tooltip id="center-y-tooltip" />

                  <br/>

                  <label>sectors</label>
                  <button onClick={() => handleChangeLineValueDec(props.index, "sectors")}><GrSubtract/></button>
                  <input
                    name="sectors"
                    type="text"
                    class="cardo_input"
                    placeholder="sectors"
                    value={props.line.sectors}
                    onChange={(event) => handleChangeLine(event, props.index)}
                  />
                  <button onClick={() => handleChangeLineValueAdd(props.index, "sectors")}><GrAdd/></button>

                <a data-tooltip-id="line_delete-tooltip" data-tooltip-content="delete line" data-tooltip-place="top" >
                  <button className="icon_deleto" onClick={() => handleDeleteLine(props.index)}><GrTrash size={28}/></button>
                  </a>
                <Tooltip id="line_delete-tooltip" />

                <a data-tooltip-id="line_copy-tooltip" data-tooltip-content="duplicate line" data-tooltip-place="top" >
                  <button className="icon_copy" onClick={() => handleCopyLine()}><GrCopy size={28}/></button>
                  </a>
                <Tooltip id="line_copy-tooltip" />
                
                </Card.Body>
              </Card>
            </div>
        
        </>
    )
}

export default Line;