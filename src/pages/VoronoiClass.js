import React, { useState, useEffect, useRef } from 'react'
import { ReactDOM } from 'react-dom';
import * as d3 from "d3";
import { Delaunay } from "d3";
import Button from 'react-bootstrap/Button';
import AddCircle from './AddCircle';

class Voronoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(), 
      centerX: 200,
      centerY: 200,
      points: [],
      showPoints: true,
      showDelaunay: true,
      showVoronoi: true,
    };
    width = window.innerWidth * 0.9;
    height = window.innerHeight * 0.7;
    xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
    yScale = d3.scaleLinear().domain([0, height]).range([0, height]);
    svgRef = useRef();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  changePointsDisplay() {this.setState({showPoints: !showPoints})};
  changeDelaunayDisplay() {this.setState({showDelaunay: !showDelaunay})};
  changeVoronoiDisplay() {this.setState({showVoronoi: !showVoronoi})};
  clearPoints() {this.setState({points: []})};

  addPoint() {
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

  addCircle(centerX, centerY, radius, sectors) {
    console.log('x:' + centerX + ' y:' + centerY + ' r:' + radius + ' s:' + sectors);

    let angularInc = 360/sectors;

    centerX = Number(centerX);
    centerY = Number(centerY);
    radius = Number(radius);
    sectors = Number(sectors);

    for (let i = 0; i < sectors; i++) {
      let iFloat = parseFloat(i);
      let circleX = centerX + (radius * Math.cos(iFloat * angularInc * Math.PI/180));									
			let circleY = centerY + (radius * Math.sin(iFloat * angularInc * Math.PI/180));

      let point = {
        x: circleX,
        y: circleY
      }

      this.setState({points: [this.state.points, point]});
    }
  }

  useEffect(){
      console.log('use Effect');

      // Delaunay
      const formattedData = pointdata.map((d) => [xScale(d.x), yScale(d.y)]);
      const delaunay = Delaunay.from(formattedData);

      const delaunayPath = delaunay.render();

      //Voronoi
      const voronoi = delaunay.voronoi([0, 0, width, height]);
      const voronoiPath = voronoi.render();

      const svg = d3.select('#chart')

      //while (svg.lastChild) {
      //  svg.removeChild(svg.lastChild);
      //}
    
      //svg.selectAll("*").remove()
      //d3.select('#chart').remove()
      if (firstLoad) {
        firstLoad = !firstLoad; 
        svg.selectAll('*').remove()
        console.log('all removed')
      }

      if (this.state.showPoints) {
        pointdata.forEach((point, index) => {
          svg.append('circle')
             .attr('key', index)
             .attr('cx', xScale(point.x))
             .attr('cy', yScale(point.y))
             .attr('r', 1.3)
        });
      }
      
      if (this.state.showDelaunay) {
        svg.append('path')
          .attr('d', delaunayPath)
          .attr('fill', 'transparent')
          .attr('stroke', 'grey')
          .attr('opacity', 0.6)
      }

      if (this.state.showVoronoi) {
        svg.append('path')
          .attr('d', voronoiPath)
          .attr('fill', 'red')
          .attr('stroke', 'black')
      }
    } [this.state.points, showPoints, showDelaunay, showVoronoi]

  render() {
    return (
      <>
        <div className="voronoi" id="container" >
          <svg id="chart" ref={svgRef} width={width} height={height} onClick={addPoint}>
          </svg>
          <Button variant="primary" onClick={changePointsDisplay}>
            {showPoints ? "Hide Points" : "Show Points"}
          </Button>
          <Button variant="primary" onClick={changeDelaunayDisplay}>
            {showDelaunay ? "Hide Delaunay" : "Show Delaunay"}
            </Button>
          <Button variant="primary" onClick={changeVoronoiDisplay}>
            {showVoronoi ? "Hide Voronoi" : "Show Voronoi"}
            </Button>
          <Button variant="primary" onClick={clearPoints}>Clear Points</Button>
          <AddCircle 
            centerX={screenCenterX} 
            centerY={screenCenterY} 
            radius="200" 
            sectors="100" 
          />
        </div>
      </>
    );
  }
}

function Voronoi() {

  var firstLoad = true;

  var data = [];
  for (let i = 0; i < 400; i++) {
    var point = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    }
    data.push(point);
  }  

  //const [pointdata, setPointdata] = useState(data);
  //const [showPoints, setShowPoints] = useState(true);
  //const [showDelaunay, setShowDelaunay] = useState(false);
  //const [showVoronoi, setShowVoronoi] = useState(true);
  const [screenCenterX, setScreenCenterX] = useState(200);
  const [screenCenterY, setScreenCenterY] = useState(200);

  function getScreenCenterX () { return screenCenterX; }
  
  //const svgRect = svgRef.current.getBoundingClientRect();
  //setScreenCenterX(svgRect.width/2);
  //setScreenCenterY(svgRect.height/2);
  //const svgRect = svgRef.current.getBoundingClientRect();

  useEffect(
    ()=>{
      console.log('use Effect');

      // Delaunay
      const formattedData = pointdata.map((d) => [xScale(d.x), yScale(d.y)]);
      const delaunay = Delaunay.from(formattedData);

      const delaunayPath = delaunay.render();

      //Voronoi
      const voronoi = delaunay.voronoi([0, 0, width, height]);
      const voronoiPath = voronoi.render();

      const svg = d3.select('#chart')

      //while (svg.lastChild) {
      //  svg.removeChild(svg.lastChild);
      //}
    
      //svg.selectAll("*").remove()
      //d3.select('#chart').remove()
      if (firstLoad) {
        firstLoad = !firstLoad; 
        svg.selectAll('*').remove()
        console.log('all removed')
      }

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
          .attr('opacity', 0.6)
      }

      if (showVoronoi) {
        svg.append('path')
          .attr('d', voronoiPath)
          .attr('fill', 'red')
          .attr('stroke', 'black')
      }
    }, [pointdata, showPoints, showDelaunay, showVoronoi]
  )

  return (
    <>
    <div className="voronoi" id="container" >
      <svg id="chart" ref={svgRef} width={width} height={height} onClick={addPoint}>
      </svg>
      <Button variant="primary" onClick={changePointsDisplay}>
        {showPoints ? "Hide Points" : "Show Points"}
      </Button>
      <Button variant="primary" onClick={changeDelaunayDisplay}>
        {showDelaunay ? "Hide Delaunay" : "Show Delaunay"}
        </Button>
      <Button variant="primary" onClick={changeVoronoiDisplay}>
        {showVoronoi ? "Hide Voronoi" : "Show Voronoi"}
        </Button>
      <Button variant="primary" onClick={clearPoints}>Clear Points</Button>
      <AddCircle 
        centerX={screenCenterX} 
        centerY={screenCenterY} 
        radius="200" 
        sectors="100" 
      />
    </div>
  </>
  );
}

export default Voronoi;