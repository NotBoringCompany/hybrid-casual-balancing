use serde::{Deserialize, Serialize};

/// Represents a tileset used in a Tiled map.
#[derive(Debug, Deserialize)]
struct Tileset {
    #[serde(rename = "firstgid")]
    first_gid: i32,     // The first global tile ID for this tileset.
    source: String,    // The source file (external tileset) associated with this tileset.
}

/// Represents a vertex with X and Y coordinates.
#[derive(Debug, Deserialize)]
struct Vertex {
    x: f32,             // The X-coordinate of a vertex in a polygon.
    y: f32,             // The Y-coordinate of a vertex in a polygon.
}

/// Represents an object placed on a layer in a Tiled map.
#[derive(Debug, Deserialize)]
struct Object {
    height: f32,        // The height of the object in pixels.
    id: i32,            // A unique identifier for the object within the layer.
    name: String,       // The name of the object.
    polygon: Vec<Vertex>, // A list of vertices defining the shape of the object if it's a polygon.
    rotation: f32,      // The rotation angle of the object in degrees.
    #[serde(rename = "type")]
    object_type: String, // The type or category of the object.
    visible: bool,      // Indicates whether the object is visible (true) or hidden (false).
    width: f32,         // The width of the object in pixels.
    x: f32,             // The X-coordinate of the object's origin on the map.
    y: f32,             // The Y-coordinate of the object's origin on the map.
}

/// Represents a layer containing objects or tiles in a Tiled map.
#[derive(Debug, Deserialize)]
struct Layer {
    #[serde(rename = "draworder")]
    draw_order: String, // Specifies how objects on the layer should be drawn.
    id: i32,            // A unique identifier for the layer.
    name: String,       // The name of the layer.
    objects: Vec<Object>, // A list of objects placed on this layer.
}

/// Represents the overall data structure of a Tiled map.
#[derive(Debug, Deserialize)]
struct MapData {
    #[serde(rename = "compressionlevel")]
    compression_level: i32, // The compression level (if applicable).
    height: i32,            // The height of the map in tiles.
    infinite: bool,         // Indicates whether the map is infinite (true) or not (false).
    #[serde(rename = "nextlayerid")]
    next_layer_id: i32,     // The next available layer ID.
    #[serde(rename = "nextobjectid")]
    next_object_id: i32,    // The next available object ID.
    orientation: String,    // The map orientation (e.g., orthogonal).
    #[serde(rename = "renderorder")]
    render_order: String,   // The rendering order of the map (e.g., right-down).
    #[serde(rename = "tiledversion")]
    tiled_version: String,  // The version of the Tiled map editor used.
    #[serde(rename = "tileheight")]
    tile_height: i32,       // The height of individual tiles in pixels.
    #[serde(rename = "tilesets")]
    tile_sets: Vec<Tileset>, // A list of tilesets used in the map.
    #[serde(rename = "tilewidth")]
    tile_width: i32,        // The width of individual tiles in pixels.
    #[serde(rename = "type")]
    map_type: String,       // The type or category of the map.
    version: String,        // The version of the map format.
    width: i32,             // The width of the map in tiles.
    layers: Vec<Layer>,     // A list of layers containing objects and tiles.
}