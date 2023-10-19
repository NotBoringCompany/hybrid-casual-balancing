use serde::{Serialize, Deserialize};

/// A list of stats available within this game (only limited to the player)
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum Stat {
    #[serde(rename = "HP")]
    HP,
    #[serde(rename = "XP")]
    XP,
    #[serde(rename = "Level")]
    Level,
    #[serde(rename = "HP Regen")]
    HPRegen,
    #[serde(rename = "Movement Speed")]
    MovementSpeed,
}