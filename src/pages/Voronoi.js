import React, { useState, useEffect, useRef } from 'react'
import * as d3 from "d3";
import { Delaunay } from "d3";
import Button from 'react-bootstrap/Button';
import AddCircle from './AddCircle';
import AddEllipse from './AddEllipse';
import AddArchimedean from './AddArchimedean';
import './Voronoi.css';

function Voronoi() {

  const width = window.innerWidth - 200;
  const height = window.innerHeight;

  var firstLoad = true;

  var delayedPoints = [];

  var data = [];
  for (let i = 0; i < 100; i++) {
    var point = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    }
    data.push(point);
  }  

  const xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

  const [pointdata, setPointdata] = useState(data);
  const [delayedPointData, setDelayedPointData] = useState([]);
  const [showPoints, setShowPoints] = useState(true);
  const [showDelaunay, setShowDelaunay] = useState(false);
  const [showVoronoi, setShowVoronoi] = useState(true);
  const [pointsChanged, setPointsChanged] = useState(true);
  
  const svgRef = useRef();

  let timerId = setInterval(() => {
    addDelayedPoint();
  }, 1000);

  clearTimeout(timerId);

  const changePointsDisplay = () => { setShowPoints(!showPoints); }
  const changeDelaunayDisplay = () => { setShowDelaunay(!showDelaunay); }
  const changeVoronoiDisplay = () => { setShowVoronoi(!showVoronoi); }
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
        {
          x: tempX,
          y: tempY
        },
    ]);
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

  function addCircle(useCenter, centerX, centerY, radius, sectors, timedRelease, timeDelay) {
 
    if (useCenter) {
      const svgRect = svgRef.current.getBoundingClientRect();
      centerX = svgRect.width/2;
      centerY = svgRect.height/2;
    }

    let angularInc = 360/sectors;

    centerX = Number(centerX);
    centerY = Number(centerY);
    radius = Number(radius);
    sectors = Number(sectors);
    timeDelay = Number(timeDelay);
    timedRelease = Boolean(timedRelease);

    for (let i = 0; i < sectors; i++) {
      let iFloat = parseFloat(i);
      let circleX = centerX + (radius * Math.cos(iFloat * angularInc * Math.PI/180));									
			let circleY = centerY + (radius * Math.sin(iFloat * angularInc * Math.PI/180));

      let point = {
        x: circleX,
        y: circleY
      }

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

      let point = {
        x: circleX,
        y: circleY
      }

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

      let point = {
        x: circleX,
        y: circleY
      }

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

  useEffect(
    ()=>{

      // Delaunay
      const formattedData = pointdata.map((d) => [xScale(d.x), yScale(d.y)]);
      const delaunay = Delaunay.from(formattedData);

      const delaunayPath = delaunay.render();

      //Voronoi
      const voronoi = delaunay.voronoi([0, 0, width, height]);
      const voronoiPath = voronoi.render();

      const svg = d3.select('#chart')
    
      // clear svg canvas
      svg.selectAll('*').remove();

      if (showPoints) {
        pointdata.forEach((point, index) => {
          svg.append('circle')
             .attr('key', index)
             .attr('cx', xScale(point.x))
             .attr('cy', yScale(point.y))
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
        svg.append('path')
          .attr('d', voronoiPath)
          .attr('fill', 'red')
          .attr('stroke', 'black')
      }
    }, [pointdata, showPoints, showDelaunay, showVoronoi, pointsChanged]
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
      </div>
      <div className="voronoi" id="container" class="w3-container">
        <svg id="chart" ref={svgRef} width={width} height={height} onClick={addPoint}>
        </svg>
      </div>
    </>
  );
}

export default Voronoi;