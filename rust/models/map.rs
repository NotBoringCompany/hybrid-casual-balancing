use serde::{Deserialize, Serialize};

/// Represents a 2D map with an area of `width` by `height` tiles.
#[derive(Serialize, Deserialize, Debug)]
pub struct Map {
    // the width of the map
    pub width: f64,
    // the height of the map
    pub height: f64,
    // the layers that exist within the map
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
    pub height: f64,
    // represents the width of the object
    pub width: f64,
    // if the object is a polygon, this represents the points that make up the polygon
    pub polygon: Option<Vec<Point>>,
    // represents the x coordinate of the object within the map
    pub x: f64,
    // represents the y coordinate of the object within the map
    pub y: f64
}

/// Represents a point on a polygon or a polyline with x and y coordinates relative to the object
#[derive(Clone, Copy, Serialize, Deserialize, Debug)]
pub struct Point {
    // the x coordinate of the point
    pub x: f64,
    // the y coordinate of the point
    pub y: f64
}