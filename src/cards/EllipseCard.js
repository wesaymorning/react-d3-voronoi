import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Tooltip } from 'react-tooltip';
import { GrAdd, GrSubtract, GrTrash, GrCopy } from "react-icons/gr";

function Ellipse(props) {

      const handleChangeEllipse = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...props.ellipses];
        onChangeValue[index][name] = parseInt(value);
        props.setoEllipses(onChangeValue);
      };

      function handleChangeEllipseValueAdd(index, name) {
        let onChangeValue = [...props.ellipses];
        onChangeValue[index][name] = parseInt(onChangeValue[index][name]) + 1;
        props.setoEllipses(onChangeValue);
      };

      function handleChangeEllipseValueDec(index, name) {
        let onChangeValue = [...props.ellipses];
        onChangeValue[index][name] = parseInt(onChangeValue[index][name]) - 1;
        props.setoEllipses(onChangeValue);
      };
      function handleChangeEllipseRatioAdd(index, name) {
        let onChangeValue = [...props.ellipses];
        onChangeValue[index][name] = parseFloat(onChangeValue[index][name]) + 0.1;
        props.setoEllipses(onChangeValue);
      };

      function handleChangeEllipseRatioDec(index, name) {
        let onChangeValue = [...props.ellipses];
        onChangeValue[index][name] = parseFloat(onChangeValue[index][name]) - 0.1;
        props.setoEllipses(onChangeValue);
      };
    
      function handleChangeEnabled(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.ellipses];
        onChangeValue[index][name] = e.target.checked;
        props.setoEllipses(onChangeValue);
      }
    
      function handleChangeUseCenter(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.ellipses];
        onChangeValue[index][name] = e.target.checked;
        props.setoEllipses(onChangeValue);
      }

      function handleChangeUseRelative(e, index) { 
        let { name, value } = e.target;
        let onChangeValue = [...props.ellipses];
        onChangeValue[index][name] = e.target.checked;
        props.setoEllipses(onChangeValue);
      }

      const handleDeleteEllipse = (index) => {
        const newArray = [...props.ellipses];
        newArray.splice(index, 1);
        props.setoEllipses(newArray);
        props.genPoints();
      };

      const handleCopyEllipse = () => {

        props.setoEllipses([...props.ellipses, { enabled: props.ellipse.enabled, 
                                                 useCenter: props.ellipse.useCenter, 
                                                 useRelative: props.ellipse.useRelative,
                                                 centerX: props.ellipse.centerX, 
                                                 centerY: props.ellipse.centerY, 
                                                 radius: props.ellipse.radius,
                                                 ratio: props.ellipse.ratio,
                                                 startAngle: props.ellipse.startAngle, 
                                                 totalAngle: props.ellipse.totalAngle, 
                                                 sectors: props.ellipse.sectors,

                            }
            ]
          );

      };

    return (
        <>
            <div key={props.index}>
              <Card style={{ width: '18rem' }} className="ellipse_card">
                <Card.Body>
                  <Card.Title>ellipse</Card.Title>

                  <a data-tooltip-id="ellipse_checkbox-tooltip" data-tooltip-content="enable/disable ellipse" data-tooltip-place="top" >

                  <input
                    name="enabled"
                    type="checkbox"
                    checked={props.ellipse.enabled}
                    onChange={(event) => handleChangeEnabled(event, props.index)}
                    placeholder="enabled"
                  />

                  </a>
                  <Tooltip id="ellipse_checkbox-tooltip" />
                  
                  <br/>   

                  <a data-tooltip-id="usecenter-checkbox-tooltip" data-tooltip-content="use window center" data-tooltip-place="top" >
                  <input
                    name="useCenter"
                    type="checkbox"
                    checked={props.ellipse.useCenter}
                    onChange={(event) => handleChangeUseCenter(event, props.index)}
                  />
                  </a>
                  <Tooltip id="usecenter-checkbox-tooltip" />

                  <a data-tooltip-id="usecenter-checkbox-tooltip" data-tooltip-content="use relative" data-tooltip-place="top" >
                  <input
                    name="useRelative"
                    type="checkbox"
                    checked={props.ellipse.useRelative}
                    onChange={(event) => handleChangeUseRelative(event, props.index)}
                  />
                  </a>
                  <Tooltip id="usecenter-checkbox-tooltip" />

                  <a data-tooltip-id="center-x-tooltip" data-tooltip-content="center X" data-tooltip-place="top" >
                    <button onClick={() => handleChangeEllipseValueDec(props.index, "centerX")}><GrSubtract/></button>
                    <input 
                      className="cardo_input"
                      name="centerX"
                      type="text" 
                      placeholder="center X"
                      value={props.ellipse.centerX}
                      onChange={(event) => handleChangeEllipse(event, props.index)}
                    />
                    <button onClick={() => handleChangeEllipseValueAdd(props.index, "centerX")}><GrAdd/></button>
                    
                  </a>
                  
                  <Tooltip id="center-x-tooltip" />

                  <a data-tooltip-id="center-y-tooltip" data-tooltip-content="center Y" data-tooltip-place="top" >
                    <button onClick={() => handleChangeEllipseValueDec(props.index, "centerY")}><GrSubtract/></button>
                    <input 
                      className="cardo_input"
                      name="centerY"
                      type="text" 
                      placeholder="center Y"
                      value={props.ellipse.centerY}
                      onChange={(event) => handleChangeEllipse(event, props.index)}
                    />
                    <button onClick={() => handleChangeEllipseValueAdd(props.index, "centerY")}>
                      <GrAdd/>
                    </button>
                    
                  </a>
                  <Tooltip id="center-y-tooltip" />

                  <br/>

                  <label>radius</label>
                  <a data-tooltip-id="radius-tooltip" data-tooltip-content="radius" data-tooltip-place="top" >
                  <button onClick={() => handleChangeEllipseValueDec(props.index, "radius")}><GrSubtract/></button>
                  <input
                    name="radius"
                    type="text"
                    className="cardo_input" 
                    placeholder="radius"
                    value={props.ellipse.radius}
                    onChange={(event) => handleChangeEllipse(event, props.index)}
                  />
                  <button onClick={() => handleChangeEllipseValueAdd(props.index, "radius")}><GrAdd/></button>
                  </a>
                  <Tooltip id="radius-tooltip" />
                  
                  <br/>

                  <label>ratio</label>
                  <a data-tooltip-id="ratio-tooltip" data-tooltip-content="radius" data-tooltip-place="top" >
                  <button onClick={() => handleChangeEllipseRatioDec(props.index, "ratio")}><GrSubtract/></button>
                  <input
                    name="ratio"
                    type="text"
                    className="cardo_input" 
                    placeholder="ratio"
                    value={props.ellipse.ratio}
                    onChange={(event) => handleChangeEllipse(event, props.index)}
                  />
                  <button onClick={() => handleChangeEllipseRatioAdd(props.index, "ratio")}><GrAdd/></button>
                  </a>
                  <Tooltip id="radius-tooltip" />
                  
                  <br/>

                  <label>angle</label>
                  <button onClick={() => handleChangeEllipseValueDec(props.index, "startAngle")}><GrSubtract/></button>
                  <input
                    name="startAngle"
                    type="text"
                    className="cardo_input" 
                    placeholder="start angle"
                    value={props.ellipse.startAngle}
                    onChange={(event) => handleChangeEllipse(event, props.index)}
                  />
                  <button onClick={() => handleChangeEllipseValueAdd(props.index, "startAngle")}><GrAdd/></button>
                  
                  <button onClick={() => handleChangeEllipseValueDec(props.index, "totalAngle")}><GrSubtract/></button>
                  <input
                    name="totalAngle"
                    type="text"
                    className="cardo_input"
                    placeholder="total angle"
                    value={props.ellipse.totalAngle}
                    onChange={(event) => handleChangeEllipse(event, props.index)}
                  />
                  <button onClick={() => handleChangeEllipseValueAdd(props.index, "totalAngle")}><GrAdd/></button>
                  
                  <br/>
                  <label>sectors</label>
                  <button onClick={() => handleChangeEllipseValueDec(props.index, "sectors")}><GrSubtract/></button>
                  <input
                    name="sectors"
                    type="text"
                    className="cardo_input"
                    placeholder="sectors"
                    value={props.ellipse.sectors}
                    onChange={(event) => handleChangeEllipse(event, props.index)}
                  />
                  <button onClick={() => handleChangeEllipseValueAdd(props.index, "sectors")}><GrAdd/></button>
                  
                <button onClick={() => handleDeleteEllipse(props.index)}><GrTrash /></button>
                <button onClick={() => handleCopyEllipse()}><GrCopy/></button>

                </Card.Body>
              </Card>
            </div>        
        </>
    )
}


export default Ellipse;