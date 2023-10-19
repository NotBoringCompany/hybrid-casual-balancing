use crate::models::{RangeType, EnemySkill, KillRewards, StatusEffect, Point};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

/// Represents an instance of an enemy with all relevant data and stats.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Enemy {
    /// the enemy's name
    name: String,
    /// a description explaining the enemy
    description: String,
    /// a Point instance representing where this particular enemy spawns (relative to the map)
    /// 
    /// note that, with this logic, the spawn position will always be the same for each enemy
    #[serde(rename = "spawnPosition")]
    spawn_position: Point,
    /// the amount of time (in seconds) it takes for a defeated enemy to be respawned
    #[serde(rename = "respawnTime")]
    respawn_time: u8,
    /// the range type of the enemy
    #[serde(rename = "rangeType")]
    range_type: RangeType,
    /// the enemy's current level
    level: u8,
    /// represents the live state of the enemy (with real time data)
    #[serde(rename = "liveState")]
    live_state: EnemyState,
    /// the enemy's base hp (essentially its max hp for this level)
    #[serde(rename = "baseHp")]
    base_hp: f64,
    /// the enemy's hp regen per second
    #[serde(rename = "baseHpRegen")]
    base_hp_regen: f64,
    /// how fast the enemy moves (units per second)
    #[serde(rename = "baseMovementSpeed")]
    base_movement_speed: f64,
    /// how much damage the enemy deals per attack
    #[serde(rename = "baseDamage")]
    base_damage: f64,
    /// how fast the enemy shoots its projectile (only if ranged; 0 if melee)
    #[serde(rename = "baseProjectileSpeed")]
    base_projectile_velocity: f64,
    /// how far the enemy can start attacking (melee will also have an attack range)
    #[serde(rename = "baseAttackRange")]
    base_attack_range: f64,
    /// how fast each subsequent attack happens (in seconds).
    /// 
    /// note that the first attack will always be half of this (due to the attack animation; ~50% through, attack happens)
    #[serde(rename = "baseAttackTime")]
    base_attack_time: f64,
    /// the probability of dealing a critical hit (in a ratio from 0 to 1)
    #[serde(rename = "critChance")]
    crit_chance: f64,
    /// the enemy's skill
    skill: EnemySkill,
    /// the rewards for killing this enemy
    #[serde(rename = "killRewards")]
    kill_rewards: KillRewards,
}

/// Represents the state of an `Enemy` instance at real time during gameplay.
/// 
/// For instance, if a player damages an enemy for 10 HP, it will update here.
/// 
/// `EnemyState` currently includes only fields that are dynamic based on current gameplay. Should the gameplay be updated, this struct will be updated as well.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct EnemyState {
    /// checks whether the enemy is defeated or not
    /// 
    /// if true, this enemy can respawn again after `respawn_time` in `Enemy`
    #[serde(rename = "isDead")]
    is_dead: bool,
    /// the enemy's current hp
    #[serde(rename = "currentHp")]
    current_hp: f64,
    /// the status effects inflicted to the enemy (if any; can be multiple)
    #[serde(rename = "currentStatusEffects")]
    current_status_effects: Option<Vec<StatusEffect>>,
    /// whenever the enemy moves, this field will be updated to reflect its current position
    #[serde(rename = "currentPosition")]
    current_position: Point,
    /// a timestamp to reflect the enemy's last death. this is used to determine when the enemy can respawn again, based on `respawn_time` in `Enemy`
    last_death: DateTime<Utc>,
    /// a timestamp to reflect the enemy's last attack. since this is a purely coded version of the game, attack animations don't really "play out"; instead, we use this field to determine when the enemy can attack again
    #[serde(rename = "lastAttack")]
    last_attack: DateTime<Utc>,
}