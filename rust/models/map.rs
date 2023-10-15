use serde::{Deserialize, Serialize};

/// Represents a 2D map with an area of `width` by `height` tiles.
#[derive(Serialize, Deserialize, Debug)]
pub struct Map {
    pub width: f32,
    pub height: f32,
    pub layers: Vec<Layer>
}

/// Represents a layer of a Tiled map that contains objects and/or tiles.
#[derive(Serialize, Deserialize, Debug)]
pub struct Layer {
    // the name of the layer
    pub name: String,
    // represents the objects that exist within this layer
    pub objects: Option<Vec<Object>>
}

/// Represents an object that exists within a Layer instance in a Tiled map.
#[derive(Serialize, Deserialize, Debug)]
pub struct Object {
    // represents the name of the object
    pub name: String,
    // used to mark an object as an ellipse
    pub ellipse: Option<bool>,
    // represents the height of the object
    pub height: f32,
    // represents the width of the object
    pub width: f32,
    // if the object is a polygon, this represents the points that make up the polygon
    pub polygon: Option<Vec<Point>>,
    // represents the x coordinate of the object within the map
    pub x: f32,
    // represents the y coordinate of the object within the map
    pub y: f32
}

/// Represents a point on a polygon or a polyline in a Tiled map.
#[derive(Serialize, Deserialize, Debug)]
pub struct Point {
    pub x: f32,
    pub y: f32
}