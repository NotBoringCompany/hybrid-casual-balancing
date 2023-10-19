use serde::{Serialize, Deserialize};

use super::{Attribute, TargetMechanics, RangeType};
/// Represents a skill instance and its data.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Skill {
    /// the skill's name
    name: String,
    /// the skill's description
    description: String,
    /// the skill's type (damaging or non-damaging)
    skill_type: SkillType,
    /// the skill's targetting mechanics
    #[serde(rename = "targetMechanics")]
    target_mechanics: TargetMechanics,
    /// the skill's range type
    #[serde(rename = "rangeType")]
    range_type: RangeType,
    /// the skill's activation range
    #[serde(rename = "activationRange")]
    activation_range: f64,
    /// the skill's level
    level: u8,
    /// the skill's base damage (if damaging skill)
    #[serde(rename = "baseDamage")]
    base_damage: Option<f64>,
    /// the skill's cast time (in seconds)
    cast_time: f64,
    /// the skill's duration in seconds (0 if not status effect)
    duration: f64,
    /// the skill's cooldown (in seconds)
    cooldown: f64,
    /// the skill's attributes
    attributes: Vec<SkillAttribute>
}

/// Lists all available skill types.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum SkillType {
    #[serde(rename = "Damaging")]
    Damaging,
    #[serde(rename = "NonDamaging")]
    NonDamaging,
}

/// Represents a skill's attribute.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct SkillAttribute {
    /// the skill's attribute
    attribute: Attribute,
    /// the chance for the attribute to play out (in a ratio from 0 to 1)
    chance: f64,
    /// the attribute's modifier
    modifier: SkillModifier,
    /// the attribute's radius of effect (in units)
    radius: f64,
}

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
    duration: f64,
    /// the skill's modifier
    modifier: SkillModifier,
    /// the chance for the skill to play out (in a ratio from 0 to 1)
    chance: f64,
    /// the skill's radius of effect (in units)
    radius: f64,
}

/// Represents a skill's modifier
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct SkillModifier {
    /// the type of modifier
    #[serde(rename = "modifierType")]
    modifier_type: SkillModifierType,
    /// the value of the modifier
    value: f64,
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