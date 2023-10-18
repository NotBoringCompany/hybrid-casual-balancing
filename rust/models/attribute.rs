use serde::{Serialize, Deserialize};

use super::{StatusEffect, TargetMechanics};

/// Represents an attribute's data/details.
/// 
/// Attributes are essentially the characteristics of a skill or a weapon.
/// 
/// Note that `Attribute` itself doesn't contain the skill or weapon's level mechanics. This is done separately.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Attribute {
    /// the attribute's name
    name: String,
    /// a description explaining the attribute
    description: String,
    /// the attribute's types (can be multiple)
    types: Vec<AttributeType>,
    #[serde(rename = "targetMechanics")]
    /// the attribute's target mechanics
    target_mechanics: TargetMechanics,
    /// the status effects inflicted by the attribute (if any; can be multiple)
    #[serde(rename = "statusEffects")]
    status_effects: Option<Vec<StatusEffect>>
}

/// A list of all available attribute types.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum AttributeType {
    /// has a fixed amount of damage
    #[serde(rename = "Set Damage")]
    SetDamage,
    /// deals damage based on own hp
    #[serde(rename = "Own HP Damage")]
    OwnHPDamage,
    /// deals damage based on enemy's hp
    #[serde(rename = "Enemy HP Damage")]
    EnemyHPDamage,
    /// has a fixed amount of healing
    #[serde(rename = "Set Healing")]
    SetHealing,
    /// heals based on own hp
    #[serde(rename = "HP Healing")]
    HPHealing,
    /// deals a status effect
    /// 
    /// the difference between `StatusEffect` and other types is that any attribute that has a duration more than 0 will be considered a status effect
    #[serde(rename = "Enemy HP Healing")]
    StatusEffect
}