use super::load::load_map;

/// By default, the coordinate system has top left as the origin (0, 0). This means that the y value goes up as you go down the map.
/// 
/// To simplify mathematical processes, we will convert the coordinate system to have bottom left as the origin (0, 0). This means that the y value goes up as you go up the map.
/// 
/// The process is to just get the "true y value" by reducing the map height with the current y value within the map.
pub fn convert_coord_system() -> () {
    // load the map data
    let mut map_data = load_map();

    // height of the map (pixels, since the map is 32x32)
    let map_height: f64 = 1024.0;

    for layer in &mut map_data.layers {
        if let Some(objects) = &mut layer.objects {
            for object in objects {
                object.y = map_height - object.y;

                // since the points that exist within the polygon is respective to the STARTING POINT of the polygon,
                // we want to invert the y value of that particular point instead of minusing it from the map height.
                if let Some(polygon_points) = &mut object.polygon {
                    for point in polygon_points {
                        point.y = -point.y;
                    }
                }
            }
        }
    }

    let modified_json = serde_json::to_string_pretty(&map_data).unwrap();

    std::fs::write("src/map/invertedMapData.json", modified_json).expect("Failed to write to invertedMapData.json");

    println!("Successfully converted the coordinate system of the map!");
}