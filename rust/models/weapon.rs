use serde::{Serialize, Deserialize};

use super::{RangeType, Attribute};

/// Represents a weapon and its data.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Weapon {
    /// the name of the weapon
    name: String,
    /// the weapon's description
    description: String,
    /// the weapon's level
    level: u8,
    /// the weapon's rarity
    rarity: WeaponRarity,
    /// the weapon's range type
    #[serde(rename = "rangeType")]
    range_type: RangeType,
    /// represents the weapon's attributes
    attributes: Vec<WeaponAttribute>,
    /// the weapon's base damage
    #[serde(rename = "baseDamage")]
    base_damage: f64,
    /// the weapon's base attack range
    #[serde(rename = "baseAttackRange")]
    base_attack_range: f64,
    /// the weapon's base attack speed
    #[serde(rename = "baseAttackSpeed")]
    base_attack_speed: f64,
    /// the weapon's crit chance
    #[serde(rename = "critChance")]
    crit_chance: f64,
}

/// Represents a weapon's attributes.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct WeaponAttribute {
    /// the weapon's attribute
    attribute: Attribute,
    /// the chance for the attribute to play out (in a ratio from 0 to 1)
    chance: f64,
    /// the attribute's modifier
    modifier: WeaponAttributeModifier,
    /// the attribute's radius of effect (in units)
    radius: f64,
}

/// A list of all available weapon rarities.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum WeaponRarity {
    #[serde(rename = "Common")]
    Common,
    #[serde(rename = "Uncommon")]
    Uncommon,
    #[serde(rename = "Rare")]
    Rare,
    #[serde(rename = "Epic")]
    Epic,
    #[serde(rename = "Legendary")]
    Legendary
}

/// Represents a weapon's attribute modifier.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct WeaponAttributeModifier {
    /// the type of modifier
    #[serde(rename = "modifierType")]
    modifier_type: WeaponAttributeModifierType,
    /// the value of the modifier
    value: f64,
}

/// A list of available weapon attribute modifier types.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum WeaponAttributeModifierType {
    /// the modifier is a percentage
    #[serde(rename = "Percentage")]
    Percentage,
    /// the modifier is either an integer, unsigned integer or a float
    #[serde(rename = "Number")]
    Number,
}
