import * as d3 from "d3";

function drawSubPolygons(parent, parentPols, level) {
    // TOOD: generate random points, should be limited to the bounding box
    var points2 = generateRandomPoints(pointSeed * (level * pointIncreaseFactor), 0, width, 0, height);
    var parentLevel = level-1;

    // we process each of the parent polygons
    var i = 0;
    var selection = d3.selectAll('path[data-level="' + parentLevel +'"]');

    var totalPolygons = [];
    selection.each(function(d, i) {
        var box = this.getBBox();

        // var points3 = generateRandomPoints(pointSeed * (level * pointIncreaseFactor), box.x, box.x + box.width, box.y, box.y + box.height);
        var points20 = generateRandomPoints(pointSeed * level, box.x, box.x + box.width, box.y, box.y + box.height);

        // var points20 = points3.filter(function(p) {
        //     return d ? d3.polygonContains(d, p) : false;
        // })


        // use the extent to define where the new voronoi needs to be rendered.
        var voronoi2 = d3.voronoi().extent([[box.x, box.y], [box.x + box.width, box.y+box.height]]);
        var polygons2 = voronoi2.polygons(points20)

        // draw the new voronois
        if (polygons2.length > 0) {
            // the new voronois need to be added in the group with the parent clippath
            drawVoronoi(d3.select(this.parentNode), polygons2,"cp-" + parentLevel + "-" + i, level);
            addClipPath(d, "cp-" + parentLevel + "-" + i);
        }

        totalPolygons = totalPolygons.concat(polygons2)
    });

    return _.flatten(totalPolygons)
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

function generateRandomPoints(nPoints, minX, maxX, minY, maxY) {
    return d3.range(0, nPoints).map( function(i) {
        return [Math.floor(Math.random() * (maxX-minX)) + minX, Math.floor(Math.random() * (maxY-minY)) + minY]
    })
}

function addClipPath(outline, pathId) {
    defs.append("clipPath")
        .attr("id",pathId)
        .append("path").attr("d", polyToPath(outline));

}