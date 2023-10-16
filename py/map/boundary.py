from typing import List, Dict
import json

### A PYTHON VERSION OF `rust/utils/map/position_handling.rs/get_map_boundary` ###

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        
def load_map() -> dict:
    # Read the JSON file containing the map data into a dictionary
    with open("src/map/invertedMapData.json", "r") as json_file:
        map_data = json.load(json_file)
        
    return map_data
        
def get_map_boundary() -> List[Point]:
    # Create an empty list to store the map boundary points
    map_boundary_points = []
    
    # Load map data (You'll need to replace this with your actual data loading)
    map_data = load_map()
    
    # get the layers of the map and find a layer called `Map Boundaries`
    map_boundaries_layer = None
    for layer in map_data["layers"]:
        if layer["name"] == "Map Boundaries":
            map_boundaries_layer = layer
            break
        
    # get the objects of the `map_boundaries_layer`
    map_boundary_objects = map_boundaries_layer["objects"]
    
    # return the first index of `map_boundary_objects` (as its the only object in the layer) and get its:
    # 1. polygon
    # 2. x and y coordinates
    map_boundary_polygon = map_boundary_objects[0]["polygon"]
    map_boundary_x = map_boundary_objects[0]["x"]
    map_boundary_y = map_boundary_objects[0]["y"]
    
    # for each point in `map_boundary_polygon`, add the x and y values of the starting point to the x and y values of the point
    # and add the point to `map_boundary_points`
    for point in map_boundary_polygon:
        map_boundary_points.append(Point(point["x"] + map_boundary_x, point["y"] + map_boundary_y))
        
    
    # get the values of each point in `map_boundary_points` and return it
    return [(point.x, point.y) for point in map_boundary_points]