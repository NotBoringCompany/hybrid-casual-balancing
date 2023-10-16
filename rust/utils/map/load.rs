use std::fs::read_to_string;
use serde_json::from_str;

use crate::models::Map;

/// Loads the contents of `invertedMapData.json` into a Map instance.
pub fn load_map() -> Map {
    // reads the JSON file containing the map data into a string
    let json_data = read_to_string("src/map/invertedMapData.json").expect("Failed to read invertedMapData.json");
    let map_data = from_str(&json_data).expect("Failed to parse mapData.json");

    return map_data
}

/// Loads the contents of `mapData.json` where the starting coordinates is top left (0, 0) into a Map instance.
pub fn load_map_uninverted() -> Map {
    // reads the JSON file containing the map data into a string
    let json_data = read_to_string("src/map/mapData.json").expect("Failed to read mapData.json");
    let map_data = from_str(&json_data).expect("Failed to parse mapData.json");

    return map_data
}