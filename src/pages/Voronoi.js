import React, { useState, useEffect, useRef } from 'react'
import * as d3 from "d3";
import { Delaunay } from "d3";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddCircle from './AddCircle';
import AddEllipse from './AddEllipse';
import AddArchimedean from './AddArchimedean';
import LoadCommandFile from './LoadCommandFile';
import Spiral from './SpiralCard';
import './Voronoi.css';

function Voronoi() {

  const width = window.innerWidth - 200;
  const height = window.innerHeight;

  var firstLoad = true;

  var color = function() {return d3.interpolateRainbow(Math.random())};

  var delayedPoints = [];

  var data = [];
  for (let i = 0; i < 100; i++) {
    var point = [
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height)
    ]
    data.push(point);
  }  

  const xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

  const [pointdata, setPointdata] = useState(data);
  const [delayedPointData, setDelayedPointData] = useState([]);
  const [showPoints, setShowPoints] = useState(true);
  const [showDelaunay, setShowDelaunay] = useState(false);
  const [showVoronoi, setShowVoronoi] = useState(true);
  const [showColours, setShowColours] = useState(false);
  const [pointsChanged, setPointsChanged] = useState(true);
  const [spirals, setSpirals] = useState([]);
  const [hidden, setHidden] = useState(true);
  
  const svgRef = useRef();

  let timerId = setInterval(() => {
    addDelayedPoint();
  }, 1000);

  clearTimeout(timerId);

  const changePointsDisplay = () => { setShowPoints(!showPoints); }
  const changeDelaunayDisplay = () => { setShowDelaunay(!showDelaunay); }
  const changeVoronoiDisplay = () => { setShowVoronoi(!showVoronoi); }
  const changeColoursDisplay = () => { setShowColours(!showColours); }
  const clearPoints = () => { 
    setPointdata([]);
    //setDelayedPointData([]);
    delayedPoints = [];
  }
  const changePointsChanged = () => { setPointsChanged(!pointsChanged); }

  const addPoint = () => {
    var e = window.event;
    const svgRect = svgRef.current.getBoundingClientRect();
    const tempX = e.clientX - svgRect.x;
    const tempY = e.clientY - svgRect.y;

    setPointdata((prevPointdata) => [
        ...prevPointdata,
        [
          tempX,
          tempY
        ],
    ]);
  };

  const handleAddSpiral = () => {
    setSpirals([...spirals, { enabled: true, useCenter: true, centerX: 0, centerY: 0, startRadius: 0, stopRadius: 100, startAngle:0, totalAngle:360, sectors:100}]);
  };

  const handleChangeSpiral = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...spirals];
    onChangeValue[index][name] = parseInt(value);
    setSpirals(onChangeValue);
  };

  function handleChangeEnabled(e, index) { 
    let { name, value } = e.target;
    let onChangeValue = [...spirals];
    onChangeValue[index][name] = e.target.checked;
    setSpirals(onChangeValue);
  }

  function handleChangeUseCenter(e, index) { 
    let { name, value } = e.target;
    let onChangeValue = [...spirals];
    onChangeValue[index][name] = e.target.checked;
    setSpirals(onChangeValue);
  }

  const handleDeleteSpiral = (index) => {
    const newArray = [...spirals];
    newArray.splice(index, 1);
    setSpirals(newArray);
  };

  function deletePoint() {
    if (pointdata.length > 0) {
      pointdata.pop();
      setPointdata(pointdata);
      changePointsChanged();
    }
  }

  function addDelayedPoint() {
    console.log('add delayed point');
    if (delayedPoints.length > 0) {
      let delayedPoint = delayedPoints.shift();

      setPointdata((prevPointdata) => [
        ...prevPointdata,
        delayedPoint,
      ]);
      changePointsChanged();
    }
    else {
      // stop timer
      clearTimeout(timerId);
    }
  }

  function addCircle(useCenter, centerX, centerY, startAngle, radius, sectors, timedRelease, timeDelay) {
 
    if (useCenter) {
      const svgRect = svgRef.current.getBoundingClientRect();
      centerX = svgRect.width/2;
      centerY = svgRect.height/2;
    }

    let angularInc = 360/sectors;

    centerX = Number(centerX);
    centerY = Number(centerY);
    startAngle = Number(startAngle);
    radius = Number(radius);
    sectors = Number(sectors);
    timeDelay = Number(timeDelay);
    timedRelease = Boolean(timedRelease);

    let angularOffset = startAngle * Math.PI/180;

    for (let i = 0; i < sectors; i++) {
      let iFloat = parseFloat(i);
      let circleX = centerX + (radius * Math.cos((iFloat * angularInc * Math.PI/180) - angularOffset));									
			let circleY = centerY + (radius * Math.sin((iFloat * angularInc * Math.PI/180) - angularOffset));

      let point = [circleX, circleY];

      if (timedRelease) {
        delayedPoints.push(point);
      }
      else {
        setPointdata((prevPointdata) => [
          ...prevPointdata,
          point,
        ]);
      }
    }

    // if timedRelease, start timer
    if (timedRelease) {
      //setDelayedPointData(delayedPoints);
      timerId = setInterval(() => {
        addDelayedPoint();
      }, timeDelay);
    }
  }

  function addEllipse(useCenter, centerX, centerY, radius, ratio, sectors, timedRelease, timeDelay) {
    if (useCenter) {
      const svgRect = svgRef.current.getBoundingClientRect();
      centerX = svgRect.width/2;
      centerY = svgRect.height/2;
    }

    let angularInc = 360/sectors;

    centerX = Number(centerX);
    centerY = Number(centerY);
    radius = Number(radius);
    ratio = Number(ratio);
    sectors = Number(sectors);
    timeDelay = Number(timeDelay);
    timedRelease = Boolean(timedRelease);
    let yRadius = ratio * radius;

    for (let i = 0; i < sectors; i++) {
      let iFloat = parseFloat(i);
      let circleX = centerX + (radius * Math.cos(iFloat * angularInc * Math.PI/180));									
			let circleY = centerY + (yRadius * Math.sin(iFloat * angularInc * Math.PI/180));

      let point = [circleX, circleY];

      if (timedRelease) {
        delayedPoints.push(point);
      }
      else {
        setPointdata((prevPointdata) => [
          ...prevPointdata,
          point,
        ]);
      }
    }

    // if timedRelease, start timer
    if (timedRelease) {
      //setDelayedPointData(delayedPoints);
      timerId = setInterval(() => {
        addDelayedPoint();
      }, timeDelay);
    }
  }

  function addArchimedean(useCenter, 
    centerX, 
    centerY, 
    startRadius, 
    stopRadius, 
    startAngle, 
    totalAngle, 
    sectors, 
    timedRelease, 
    timeDelay) {

    console.log('spiral:%d:%d:%d:%d:%d', startRadius, stopRadius, startAngle, totalAngle, sectors);
      
    if (useCenter) {
      const svgRect = svgRef.current.getBoundingClientRect();
      centerX = svgRect.width/2;
      centerY = svgRect.height/2;
    }

    centerX = Number(centerX);
    centerY = Number(centerY);
    startRadius = Number(startRadius);
    stopRadius = Number(stopRadius);
    startAngle = Number(startAngle);
    totalAngle = Number(totalAngle);
    sectors = Number(sectors);
    timeDelay = Number(timeDelay);
    timedRelease = Boolean(timedRelease);
    
    let angularInc = totalAngle/sectors;
    let angularOffset = startAngle * Math.PI/180;
    let radiusInc = (stopRadius - startRadius)/sectors;
    var radius = startRadius;

    for (let i = 0; i < sectors; i++) {
      let iFloat = parseFloat(i);
      let circleX = centerX + (radius * Math.cos((iFloat * angularInc * Math.PI/180) - angularOffset));									
			let circleY = centerY + (radius * Math.sin((iFloat * angularInc * Math.PI/180) - angularOffset));

      radius += radiusInc;

      let point = [circleX, circleY];

      if (timedRelease) {
        delayedPoints.push(point);
      }
      else {
        setPointdata((prevPointdata) => [
          ...prevPointdata,
          point,
        ]);
      }
    }

    // if timedRelease, start timer
    if (timedRelease) {
      //setDelayedPointData(delayedPoints);
      timerId = setInterval(() => {
        addDelayedPoint();
      }, timeDelay);
    }
  }

  function processCommandFile(clearDataPoints, files, fileContents) {
 
    if (clearDataPoints) {
      setPointdata([]);
    }

    console.log('clear data:' + clearDataPoints);
    console.log('files:' + files);
    console.log('file contents:' + fileContents);

    // convert json file contents to structure
    const parsedFile = JSON.parse(fileContents);
    console.log("parsed:" + parsedFile);

    if (parsedFile.length > 0) {
      parsedFile.forEach(processJsonObject)
    }
  }

  function processJsonObject(jObject) {
    switch(jObject["type"]) {
      case "point":
        let point = [jObject["x"], jObject["y"]];
        setPointdata((prevPointdata) => [
          ...prevPointdata,
          point,
        ]);
        break;
      case "circle":
        addCircle(jObject["useCenter"], 
                  jObject["centerX"], 
                  jObject["centerY"], 
                  jObject["startAngle"], 
                  jObject["radius"], 
                  jObject["sectors"], 
                  jObject["timedRelease"], 
                  jObject["timeDelay"]
                  )
        break;
      case "ellipse":
          addEllipse(jObject["useCenter"], 
                    jObject["centerX"], 
                    jObject["centerY"],  
                    jObject["radius"], 
                    jObject["ratio"],
                    jObject["sectors"], 
                    jObject["timedRelease"], 
                    jObject["timeDelay"]
                    )
          break;
      case "archimedian":
            addArchimedean(jObject["useCenter"], 
                          jObject["centerX"], 
                          jObject["centerY"],  
                          jObject["startRadius"], 
                          jObject["stopRadius"],
                          jObject["startAngle"], 
                          jObject["totalAngle"],
                          jObject["sectors"], 
                          jObject["timedRelease"], 
                          jObject["timeDelay"]
                          )
            break;
      default:
    }
  }

  function drawVoronoi(parent, polygons, clipArea, level) {
    var polygon = parent.insert("g",":first-child")
        .attr("clip-path", function(d) { return clipArea ? "url(#" + clipArea+ ")" : ""})
        .attr("class", "polygons")
        .selectAll("path")
        .data(polygons)
        .enter().insert("path")
        .attr("data-level",level)
        .attr("stroke-width", function() {return 6 / ((level+1)*2) })
        .attr("stroke", function() {d3.hsl("#000").brighter(level)})
        .attr("fill", function() {return level === 0 ? "" : color()})
        .attr("fill-opacity", "0.3")
        .attr("d", polyToPath)
  }

  function polyToPath(polygon) {
      return polygon ? "M" + polygon.join("L") + "Z" : null;
  }

  useEffect(
    ()=>{

      // Delaunay
      //const formattedData = pointdata.map((d) => [xScale(d.x), yScale(d.y)]);
      const delaunay = Delaunay.from(pointdata);

      const delaunayPath = delaunay.render();

      //Voronoi
      var voronoi = delaunay.voronoi([0, 0, width, height]);
      //var polygons = voronoi.cellPolygons()
      //var voronoiFn = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);
      const voronoiPath = voronoi.render();

      const svg = d3.select('#chart')
    
      // clear svg canvas
      svg.selectAll('*').remove();

      if (showPoints) {
        pointdata.forEach((point, index) => {
          svg.append('circle')
             .attr('key', index)
             .attr('cx', xScale(point[0]))
             .attr('cy', yScale(point[1]))
             .attr('r', 1.3)
        });
      }
      
      if (showDelaunay) {
        svg.append('path')
          .attr('d', delaunayPath)
          .attr('fill', 'transparent')
          .attr('stroke', 'grey')
          .attr('opacity', 0.8)
      }

      if (showVoronoi) {
        //var polygons = voronoiFn.polygons(pointdata);
        //drawVoronoi(svg, polygons, undefined, 0);
        svg.append('path')
          .attr('d', voronoiPath)
          .attr('fill', 'red')
          .attr("fill", function() {return color()})
          .attr("fill-opacity", "0.3")
          .attr('stroke', 'black')
      }
    }, [pointdata, showPoints, showDelaunay, showVoronoi, showColours, pointsChanged, spirals]
  )

  return (
    <>
      <div class="w3-sidebar">
        <Button variant="primary" onClick={changePointsDisplay} width="100%">
          {showPoints ? "Hide Points" : "Show Points"}
        </Button><br/>
        <Button variant="primary" onClick={changeDelaunayDisplay}>
          {showDelaunay ? "Hide Delaunay" : "Show Delaunay"}
        </Button><br/>
        <Button variant="primary" onClick={changeVoronoiDisplay}>
          {showVoronoi ? "Hide Voronoi" : "Show Voronoi"}
        </Button><br/>
        <Button variant="primary" onClick={changeColoursDisplay}>
          {showColours ? "Hide Colours" : "Show Colours"}
        </Button><br/>
        <Button variant="primary" onClick={clearPoints}>Clear Points</Button><br/>
        <Button variant="primary" onClick={deletePoint}>Delete Point</Button><br/>
        <AddArchimedean 
          radius="200" 
          sectors="100" 
          addArchimedean={addArchimedean}
        /><br/>
        <AddCircle 
          radius="200" 
          sectors="100" 
          addCircle={addCircle}
        /><br/>
        <AddEllipse 
          radius="200" 
          sectors="100" 
          addEllipse={addEllipse}
        /><br/>
        <LoadCommandFile 
          processCommandFile={processCommandFile}
        /><br/>
        <div className="container">
          <Button onClick={() => handleAddSpiral()}>Add Spiral</Button>
          <br/>

          {spirals === undefined ? 
            <></>
            :

            <>       
            {spirals.length === 0 ?         
              <p>There are no spirals to be found....</p>
              :         
              spirals.map((item, index) => <Spiral index={index} spiral={item} spirals={spirals} setoSpirals={setSpirals}/>)       
            }     
        </> 
      }
        </div>
        
      </div>
      <div className="voronoi" id="container" class="w3-container">
        <svg id="chart" ref={svgRef} width={width} height={height} onClick={addPoint}>
        </svg>
      </div>
    </>
  );
}

export default Voronoi;