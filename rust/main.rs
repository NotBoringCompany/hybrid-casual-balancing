mod models;
mod utils;

use models::Point;
use salvo::prelude::*;
use utils::{load_map, get_map_boundary, convert_coord_system};
use crate::utils::{is_point_inside_polygon};

/// Checks to see if Salvo is running
#[handler]
async fn run_salvo() -> &'static str {
    "Salvo is running"
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().init();

    let map_boundary = get_map_boundary();
    let point = Point { x: 146.0, y: 282.0 };

    println!("is point inside polygon: {}", is_point_inside_polygon(&point, &map_boundary));

    let router = Router::new().get(run_salvo);
    let acceptor = TcpListener::new("127.0.0.1:5800").bind().await;
    Server::new(acceptor).serve(router).await;
}