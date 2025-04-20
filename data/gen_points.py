import json
import sys

out_filename = sys.argv[1]
print(out_filename)

"""
{
        "type": "circle",
        "useCenter": true, 
        "centerX": 0.0,
        "centerY": 0.0, 
        "startAngle": 0, 
        "radius": 500, 
        "sectors": 50, 
        "timedRelease": false, 
        "timeDelay": 50
    }
"""

points = []

circle = dict(
    type='circle',
    useCenter=False,
    centerX=0.0,
    centerY=0.0,
    startAngle=0,
    radius=200,
    sectors=50,
    timedRelease=False,
    timeDelay=50    
)

sectors = 50

#for center_x in list(range(200, 900, 25)):
for center_y in list(range(200, 900, 10)):

    points.append(
        {
            "type": "circle",
            "useCenter": False, 
            "centerX": center_y,
            "centerY": center_y, 
            "startAngle": 0, 
            "radius": center_y, 
            "sectors": sectors, 
            "timedRelease": False, 
            "timeDelay": 50
        }
    )
    #sectors -= 1

points_fh = open(out_filename, 'w')
json.dump(points, points_fh, indent=2)
points_fh.close()
