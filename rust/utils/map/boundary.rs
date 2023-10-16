use crate::models::{Point};

use super::load::load_map;

/// Map boundary is a set of points that make up a polygon to represent the boundaries of the map.
/// 
/// From the JSON file, the vector of points is relative to the polygon's starting point, meaning that we need to add the starting point's x and y values to each point.
/// 
/// This will then return the true coordinates of the map boundary's points within the map.
pub fn get_map_boundary() -> Vec<Point> {
    // create an empty vector to store the map boundary points
    let mut map_boundary_points: Vec<Point> = Vec::new();
    let map_data = load_map();

    // get the layers of the map, find a layer called `Map Boundaries`
    let map_boundaries = map_data.layers.iter().find(|layer| layer.name == "Map Boundaries").unwrap();

    // get the objects of the `Map Boundaries` layer
    let map_boundary_objects = map_boundaries.objects.as_ref().unwrap();

    // return the first index of `map_boundary_objects` (as its the only object in the layer) and get its:
    // 1. polygon
    // 2. x and y coordinates
    let map_boundary_polygon = map_boundary_objects[0].polygon.as_ref().unwrap();
    let map_boundary_x = map_boundary_objects[0].x;
    let map_boundary_y = map_boundary_objects[0].y;

    // for each point in `map_boundary_polygon`, add the x and y values of the starting point to the point's x and y values
    for point in map_boundary_polygon {
        let new_point = Point {
            x: point.x + map_boundary_x,
            y: point.y + map_boundary_y
        };

        map_boundary_points.push(new_point);
    }

    println!("map boundary points: {:?}", map_boundary_points);
    map_boundary_points
}

/// Checks if any given point (x, y) is inside the map boundary
///
/// This is mainly used to check whether the player is still within the map boundary.
pub fn is_point_inside_map_boundary(point: &Point, polygon: &[Point]) -> bool {
    let px = point.x;
    let py = point.y;

    // counter to check how many times the ray intersects with the polygon
    let mut counter = 0;

    for i in 0..polygon.len() {
        // get the current point in the polygon
        let (x1, y1) = (polygon[i].x, polygon[i].y);

        // get the next point in the polygon
        let (x2, y2) = (polygon[(i + 1) % polygon.len()].x, polygon[(i + 1) % polygon.len()].y);

        // if the ray intersects with the polygon, increment the counter
        if (py < y1) != (py < y2) && px < x1 + (((py - y1) / (y2-y1)) * (x2 - x1)) {
            counter += 1;
        }
    }

    println!("counter: {}", counter);

    counter % 2 == 1
}