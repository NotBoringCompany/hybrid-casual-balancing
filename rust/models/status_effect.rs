use serde::{Serialize, Deserialize};

/// A list of all available status effects.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum StatusEffect {
    /// poisons the enemy and deals damage over time
    #[serde(rename = "Toxic")]
    Toxic,
    /// burns the enemy and deals damage over time
    #[serde(rename = "Burn")]
    Burn,
    /// bleeds the enemy and deals damage over time
    #[serde(rename = "Bleed")]
    Bleed,
    /// stuns the enemy, preventing them from moving
    #[serde(rename = "Stun")]
    Stun,
    /// blinds the enemy, reducing their accuracy
    #[serde(rename = "Blind")]
    Blind,
    /// gives resistance to any kind of attack (weapon or skill)
    #[serde(rename = "Resilience")]
    Resilience,
    /// no status effect
    #[serde(rename = "None")]
    None
}