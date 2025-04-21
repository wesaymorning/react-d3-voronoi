import Stack from 'react-bootstrap/Stack';  
import Card from 'react-bootstrap/Card';
import handleChangeEnabled from './Voronoi'
import Voronoi from './Voronoi';

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
              

                  <input
                    name="enabled"
                    type="checkbox"
                    checked={props.spiral.enabled}
                    onChange={(event) => handleChangeEnabled(event, props.index)}
                    placeholder="enabled"
                  />
                  <br/>   
                  <input
                    name="useCenter"
                    type="checkbox"
                    checked={props.spiral.useCenter}
                    onChange={(event) => handleChangeUseCenter(event, props.index)}
                  />
         
                  <input
                    name="centerX"
                    type="text" 
                    placeholder="center X"
                    maxLength="4"
                    value={props.spiral.centerX}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />

                  <input
                    name="centerY"
                    type="int"
                    class="input-box" 
                    placeholder="center Y"
                    value={props.spiral.centerY}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />

                  <input
                    name="startRadius"
                    type="text"
                    class="input-box" 
                    placeholder="start radius"
                    value={props.spiral.startRadius}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  <input
                    name="stopRadius"
                    type="text"
                    class="input-box" 
                    placeholder="stop radius"
                    value={props.spiral.stopRadius}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  <br/>
                  <input
                    name="startAngle"
                    type="text"
                    class="input-box" 
                    placeholder="start angle"
                    value={props.spiral.startAngle}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  <input
                    name="totalAngle"
                    type="text"
                    class="input-box" 
                    placeholder="total angle"
                    value={props.spiral.totalAngle}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                
                  <input
                    name="sectors"
                    type="text"
                    class="input-box" 
                    placeholder="sectors"
                    value={props.spiral.sectors}
                    onChange={(event) => handleChangeSpiral(event, props.index)}
                  />
                  <br/>
                <button onClick={() => handleDeleteSpiral(props.index)}>Delete</button>

                </Card.Body>
              </Card>
            </div>
        
        </>
    )
}


export default Spiral;