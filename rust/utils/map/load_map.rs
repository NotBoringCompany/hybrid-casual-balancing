use std::fs::{File, read_to_string};
use serde_json::from_str;

use crate::models::{Map};

pub async fn load_map() -> () {
    // reads the JSON file containing the map data into a string
    let mut json_data = read_to_string("src/map/mapData.json").expect("Failed to read mapData.json");
    let mut map_data: Map = from_str(&json_data).expect("Failed to parse mapData.json");

    println!("{:?}", map_data);
}