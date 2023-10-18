use serde::{Serialize, Deserialize};

use super::Attribute;

/// Represents an enemy's skill data.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct EnemySkill {
    /// the skill's attribute (i.e. characteristics)
    attributes: Vec<Attribute>,
    /// an additional description to explain the skill (on top of the attribute's description if needed)
    #[serde(rename = "addDescription")]
    add_description: String,
    /// the skill's level
    level: u8,
    /// how long the skill plays out (in seconds)
    duration: u8,
    /// the skill's modifier
    modifier: SkillModifier,
    /// the chance for the skill to play out (in a ratio from 0 to 1)
    chance: f64,
    /// the skill's radius of effect (in units)
    radius: u16,
}

/// Represents a skill's modifier
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct SkillModifier {
    /// the type of modifier
    skill_modifier_type: SkillModifierType,
    /// the value of the modifier
    value: u16,
}

/// A list of available skill modifier types.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum SkillModifierType {
    /// the modifier is a percentage
    #[serde(rename = "Percentage")]
    Percentage,
    /// the modifier is either an integer, unsigned integer or a float
    #[serde(rename = "Number")]
    Number,
}