use serde::{Serialize, Deserialize};

/// Represents the rewards for defeating an enemy.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct KillRewards {
    /// The amount of coins the player receives.
    coins: u16,
    /// The amount of experience points the player receives.
    xp: u16,
}