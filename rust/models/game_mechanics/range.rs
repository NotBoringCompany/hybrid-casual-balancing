use serde::{Serialize, Deserialize};

/// A list of available range types for enemies, a weapon or a skill.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum RangeType {
    #[serde(rename = "Melee")]
    Melee,
    #[serde(rename = "Ranged")]
    Ranged
}