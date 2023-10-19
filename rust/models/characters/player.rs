use serde::{Serialize, Deserialize};

use crate::models::{Weapon, Skill, Item};

/// Represents the player's character and all data related to it.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Player {
    /// the player's level mechanics
    #[serde(rename = "levelMechanics")]
    player_level_mechanics: PlayerLevelMechanics,
    /// the player's base HP at this level
    #[serde(rename = "baseHp")]
    base_hp: f64,
    /// how much HP the player regens per second this level
    #[serde(rename = "baseHpRegen")]
    base_hp_regen: f64,
    /// how fast the player moves (units per second)
    #[serde(rename = "baseMovementSpeed")]
    base_movement_speed: f64,
    /// the player's inventory
    inventory: PlayerInventory,
}

/// Represents the mechanics of the player's level (incl. requirements to level up).
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct PlayerLevelMechanics {
    /// the player's current level
    #[serde(rename = "currentLevel")]
    current_level: u8,
    /// the player's next level
    #[serde(rename = "nextLevel")]
    next_level: u8,
    /// the amount of xp the player has accumulated thus far
    #[serde(rename = "totalXpEarned")]
    total_xp_earned: u32,
    /// the amount of xp needed to level up to `next_level`
    #[serde(rename = "levelUpXpRequired")]
    level_up_xp_required: u32,
}

/// Represents the player's inventory.
/// 
/// We assume that the inventory can be unlimited, thus no need to check for slots available.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct PlayerInventory {
    /// the player's weapons
    weapons: Vec<Weapon>,
    /// the player's skills
    skills: Vec<Skill>,
    /// the player's items
    items: Vec<Item>,
}