use serde::{Serialize, Deserialize};

use super::{Attribute, StatusEffect, Stat};

/// Represents an item instance and its data.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Item {
    /// the name of the item
    name: String,
    /// the description of the item
    description: String,
    /// the item's attributes
    attributes: Vec<ItemAttribute>,
}

/// Represents an item's attribute.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct ItemAttribute {
    /// the item's attribute
    attribute: Attribute,
    /// the chance for the attribute to play out (in a ratio from 0 to 1)
    chance: f64,
    /// the attribute's modifier
    modifier: ItemModifier,
    /// the attribute's radius of effect (in units)
    radius: f64,
}

/// Represents an item's modifier.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct ItemModifier {
    /// the item type
    item_type: ItemType,
    /// status effects inflicted (if any)
    status_effects: Option<Vec<StatusEffect>>,
    /// stat boost (if any)
    stat_boost: Option<Vec<Stat>>,
    /// the value of the modifier (0 if `status_effects` is present)
    /// 
    /// note: if stat_boost is present, the length of `value` MUST be equal to the length of `stat_boost`
    value: Vec<f64>,
}

/// Lists all available item types.
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum ItemType {
    /// items that deal damage
    #[serde(rename = "Damage")]
    Damage,
    /// items that heal
    #[serde(rename = "Healing")]
    Healing,
    /// items that deal status effects
    #[serde(rename = "StatusEffect")]
    StatusEffect,
    /// items that grant the player XP
    #[serde(rename = "GainXP")]
    GainXP,
    /// items that grant the player coins
    #[serde(rename = "GainCoins")]
    GainCoins,
    /// items that grant the player miscellanous currency
    #[serde(rename = "MiscCurrency")]
    MiscCurrency,
    /// items that grant the player a stat boost
    #[serde(rename = "StatBoost")]
    StatBoost,
}