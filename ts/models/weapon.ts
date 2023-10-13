import { Attribute } from './attribute'
import { PurchaseCost } from './purchase';
import { RangeType } from './range';
import { UpgradeCost } from './upgradeCost';

/**
 * Shows the minimum level required for the player to level up their weapon to a certain level.
 */
export interface WeaponLevelRequirement {
    // the weapon level
    level: number,
    // the minimum player level required to level up the weapon to this level
    minPlayerLevelRequired: number,
}

/**
 * Represents a weapon.
 */
export interface Weapon {
    // the weapon's name
    name: string,
    // the weapon's description
    description: string,
    // the rarity of the weapon
    rarity: WeaponRarity,
    // the weapon's range type
    rangeType: RangeType,
    // the cost to purchase this weapon (if it is a purchasable weapon)
    purchaseCost: PurchaseCost,
    // the weapon's attribute (i.e. characteristics)
    levelMechanics: WeaponLevelMechanics[],
}

/**
 * Lists all current weapon rarities.
 */
export enum WeaponRarity {
    Common = 'Common',
    Uncommon = 'Uncommon',
    Rare = 'Rare',
    Epic = 'Epic',
    Legendary = 'Legendary'
}

/**
 * Represents an instance of a weapon's attribute
 */
export interface WeaponAttribute {
    // the weapon's attribute
    attribute: Attribute,
    // the chance for the attribute to play out
    chance: number,
    // the weapon's attribute modifier
    modifier: WeaponAttributeModifier,
    // the radius of effect of the weapon's attribute
    radius: number,
}

/**
 * Represents a weapon's data level by level
 */
export interface WeaponLevelMechanics {
    // the weapon's level
    level: number,
    // the weapon's base damage at this level
    baseDamage: number,
    // the weapon's base attack range at this level
    baseAttackRange: number,
    // the weapon's base attack time at this level
    baseAttackTime: number,
    // the weapon's crit chance at this level
    critChance: number,
    // the weapon's attributes at this level
    attributes: WeaponAttribute[],
    // the weapon's upgrade cost at this level
    upgradeCost: UpgradeCost,
}

/**
 * Represents a weapon's attribute modifier.
 */
export interface WeaponAttributeModifier {
    type: WeaponAttributeModifierType,
    value: number,

}

/**
 * Lists all current weapon attribute modifier types.
 */
export enum WeaponAttributeModifierType {
    Percentage = 'Percentage',
    Number = 'Number',
}