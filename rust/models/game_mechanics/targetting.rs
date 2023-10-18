use serde::{Serialize, Deserialize};

/// Represents how an attribute's targetting mechanics work.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct TargetMechanics {
    /// the target type of the attribute
    #[serde(rename = "type")]
    target_type: TargetType,
    /// the number of targets that can be affected by this attribute
    /// note: for radius target types, this will normally be 0, unless there can only be a specific amount of targets
    count: u8,
}

/// A list of available target types.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum TargetType {
    /// the attribute will target either the user and/or their own team
    #[serde(rename = "Self")]
    Ally,
    /// the attribute can only target enemies
    #[serde(rename = "Enemy")]
    Enemy,
    /// the attribute targets an area of choice
    #[serde(rename = "Radius")]
    Radius,
    /// the attribute can target both enemies and allies
    #[serde(rename = "Both")]
    Both,
    /// the attribute can target both enemies and allies and/or can target an area of choice (usually done with AOE skills/weapons)
    #[serde(rename = "All")]
    All
}