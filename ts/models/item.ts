import { Attribute } from './attribute'
import { Stat } from './stat'
import { StatusEffect } from './statusEffect'

/**
 * Represents an instance of an item.
 */
export interface Item {
    // the name of the item
    name: string,
    // the description of the item
    description: string,
    // the item's attributes
    attributes: ItemAttribute[]
}

/**
 * Represents an instance of an item's attribute.
 */
export interface ItemAttribute {
    // the item's type
    type: ItemType,
    // the chance for the attribute to play out
    chance: number,
    // the item's attribute modifier
    modifier: ItemAttributeModifier,
    // the radius of effect of the item's attribute
    radius: number,
}

/**
 * Represents an item's attribute modifier.
 */
export interface ItemAttributeModifier {
    // status effects inflicted (if any)
    statusEffects?: StatusEffect[],
    // stat boosts (if any)
    statBoosts?: Stat[],
    // the value of the modifier (0 if status effects are inflicted)
    // note: if statBoost is present, the length of `values` MUST be equal to the length of `statBoost`
    values: number[],
}

/**
 * Lists all current item types.
 */
export enum ItemType {
    Damage = 'Damage',
    Healing = 'Healing',
    StatusEffect = 'Status Effect',
    GainXP = 'Gain XP',
    GainCoins = 'Gain Coins',
    MiscCurrency = 'Misc Currency',
    StatBoost = 'Stat Boost',
}

/**
 * Lists all available items.
 */
export enum ItemVariants {
    Blueberry = 'Blueberry',
    EnergyCore = 'Energy Core',
}

/**
 * Represents a quest's items required.
 */
export interface ItemsRequired {
    // the item type
    type: ItemVariants,
    // the amount of items required
    amount: number,
}