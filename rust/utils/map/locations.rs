use crate::{models::Point, utils::{load_map, load_map_layer}};

/// Gets the starting point of the player within the map.
pub fn get_starting_point() -> Point {
    // get the layers and find a layer called `Starting Point`
    let starting_point_layer = load_map_layer("Starting Point");

    // get `objects` and its first index; return the x and y values of the first index
    let starting_point_object = &starting_point_layer.objects.as_ref().unwrap()[0];

    Point {
        x: starting_point_object.x,
        y: starting_point_object.y
    }
}

/// Gets Pfufu's location within the map.
pub fn get_pfufu_location() -> Point {
    // get the layers and find a layer called `Pfufu`
    let pfufu_layer = load_map_layer("Pfufu");

    // get `objects` and its first index; get `x`, `y` and `polygon`
    let pfufu_object = &pfufu_layer.objects.as_ref().unwrap()[0];

    let pfufu_polygon = pfufu_object.polygon.as_ref().map(|polygon| polygon).unwrap();
    let pfufu_x = pfufu_object.x;
    let pfufu_y = pfufu_object.y;

    // `x` and `y` represent the first Point of Pfufu's polygon with respect to the map.
    // `pfufu_polygon` represents points relative to `x` and `y`.
    // we want to find the center of pfufu's polygon to determine the true location of Pfufu.
    // hence, we need to get all points of the polygon with respect to the map, and find middle point's x and y.
    let pfufu_polygon_points = pfufu_polygon.iter().map(|point| Point {
        x: pfufu_x + point.x,
        y: pfufu_y + point.y
    }).collect::<Vec<Point>>();

    // get the left and rightmost points of Pfufu's polygon and also the top and bottommost points
    let leftmost_point = pfufu_polygon_points.iter().min_by(|a, b| a.x.partial_cmp(&b.x).unwrap()).unwrap();
    let rightmost_point = pfufu_polygon_points.iter().max_by(|a, b| a.x.partial_cmp(&b.x).unwrap()).unwrap();
    let topmost_point = pfufu_polygon_points.iter().min_by(|a, b| a.y.partial_cmp(&b.y).unwrap()).unwrap();
    let bottommost_point = pfufu_polygon_points.iter().max_by(|a, b| a.y.partial_cmp(&b.y).unwrap()).unwrap();

    // get the middle point of Pfufu's polygon (which will be dubbed as its location)
    let pfufu_middle_point = Point {
        x: (leftmost_point.x + rightmost_point.x) / 2.0,
        y: (topmost_point.y + bottommost_point.y) / 2.0
    };

    pfufu_middle_point
}