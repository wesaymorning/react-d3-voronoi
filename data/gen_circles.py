import json
import sys

out_filename = sys.argv[1]
print(out_filename)

points = []

sectors = 20

#for center_x in list(range(200, 900, 25)):
for center_y in list(range(20, 500, 20)):

    points.append(
        {
            "type": "archimedian",
            "useCenter": False, 
            "centerX": center_y,
            "centerY": 500,
            "startAngle": 0, 
            "totalAngle": 180,
            "startRadius": center_y, 
            "stopRadius": center_y,
            "sectors": sectors, 
            "timedRelease": False, 
            "timeDelay": 50
        }
    )
    sectors += 1

sectors = 20
for center_y in list(range(20, 250, 20)):

    points.append(
        {
            "type": "archimedian",
            "useCenter": False, 
            "centerX": 950 - center_y,
            "centerY": 500,
            "startAngle": 180, 
            "totalAngle": 180,
            "startRadius": center_y, 
            "stopRadius": center_y,
            "sectors": sectors, 
            "timedRelease": False, 
            "timeDelay": 50
        }
    )
    sectors += 1

points_fh = open(out_filename, 'w')
json.dump(points, points_fh, indent=2)
points_fh.close()
