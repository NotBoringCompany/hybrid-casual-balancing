mod models;
mod utils;

use salvo::prelude::*;
use utils::{get_pfufu_location, convert_coord_system};

/// Checks to see if Salvo is running
#[handler]
async fn run_salvo() -> &'static str {
    "Salvo is running"
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().init();

    get_pfufu_location();

    convert_coord_system();

    let router = Router::new().get(run_salvo);
    let acceptor = TcpListener::new("127.0.0.1:5800").bind().await;
    Server::new(acceptor).serve(router).await;
}