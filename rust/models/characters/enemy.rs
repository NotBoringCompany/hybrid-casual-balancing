use crate::models::{RangeType, EnemySkill, KillRewards};
use serde::{Deserialize, Serialize};

/// Represents an instance of an enemy with all relevant data and stats.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Enemy {
    /// the enemy's name
    name: String,
    /// a description explaining the enemy
    description: String,
    /// the range type of the enemy
    #[serde(rename = "rangeType")]
    range_type: RangeType,
    /// the enemy's current level
    level: u8,
    /// the enemy's base hp (essentially its max hp for this level)
    #[serde(rename = "baseHp")]
    base_hp: u16,
    /// the enemy's hp regen per second
    #[serde(rename = "baseHpRegen")]
    base_hp_regen: u16,
    /// how fast the enemy moves (units per second)
    #[serde(rename = "baseMovementSpeed")]
    base_movement_speed: u16,
    /// how much damage the enemy deals per attack
    #[serde(rename = "baseDamage")]
    base_damage: u16,
    /// how fast the enemy shoots its projectile (only if ranged; 0 if melee)
    #[serde(rename = "baseProjectileSpeed")]
    base_projectile_velocity: u16,
    /// how far the enemy can start attacking (melee will also have an attack range)
    #[serde(rename = "baseAttackRange")]
    base_attack_range: u16,
    /// how fast each subsequent attack happens (in seconds).
    /// 
    /// note that the first attack will always be half of this (due to the attack animation; ~50% through, attack happens)
    #[serde(rename = "baseAttackTime")]
    base_attack_time: u8,
    /// the probability of dealing a critical hit (in a ratio from 0 to 1)
    #[serde(rename = "critChance")]
    crit_chance: f64,
    /// the enemy's skill
    skill: EnemySkill,
    /// the rewards for killing this enemy
    #[serde(rename = "killRewards")]
    kill_rewards: KillRewards,
}