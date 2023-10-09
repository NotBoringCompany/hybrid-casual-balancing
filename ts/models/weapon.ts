import { Attribute } from './attribute'
import { UpgradeCost } from './upgrade'

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
    // the weapon's attribute (i.e. characteristics)
    levelMechanics: WeaponLevelMechanics[],
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
    attributes: Attribute[],
    // the weapon's upgrade cost at this level
    upgradeCost: UpgradeCost,
}