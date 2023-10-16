use crate::{models::Point, utils::load_map};

/// Gets the starting point of the player within the map.
pub fn get_starting_point() -> Point {
    // load the map data
    let map_data = load_map();

    // get the layers of the map and find a layer called `Starting Point`
    let starting_point_layer = map_data.layers.iter().find(|layer| layer.name == "Starting Point").unwrap();

    // get `objects` and its first index; return the x and y values of the first index
    let starting_point_object = &starting_point_layer.objects.as_ref().unwrap()[0];

    println!("starting point: {:?}", starting_point_object);
    Point {
        x: starting_point_object.x,
        y: starting_point_object.y
    }
}