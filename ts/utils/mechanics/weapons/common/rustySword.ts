import path from 'path'
import fs from 'fs'

import { Attribute } from '../../../../models/attribute'
import { RangeType } from '../../../../models/range'
import { Weapon, WeaponAttribute, WeaponAttributeModifierType, WeaponLevelMechanics, WeaponRarity } from '../../../../models/weapon'
import { UpgradeCost } from '../../../../models/upgradeCost'
import { Resource } from '../../../../models/resource'
import { MAX_WEAPON_LEVEL } from '../weapon'

// each level range corresponds to a specific damage increment and base attack time per level for a common rusty sword
const COMMON_RUSTY_SWORD_LEVEL_RANGE = [
    { fromLevel: 1, toLevel: 14, damageIncrement: 5, baseAttackTime: 1.5 },
    { fromLevel: 15, toLevel: 29, damageIncrement: 8, baseAttackTime: 1.45 },
    { fromLevel: 30, toLevel: 39, damageIncrement: 10, baseAttackTime: 1.4 },
    { fromLevel: 40, toLevel: 49, damageIncrement: 15, baseAttackTime: 1.35 },
    { fromLevel: 50, toLevel: 50, damageIncrement: 25, baseAttackTime: 1.25 }
]

/**
 * Common Rusty Sword constants
 */
// the base damage of a common rusty sword at level 1
const COMMON_RUSTY_SWORD_BASE_DAMAGE = 20
// range type for common rusty sword is constant
const COMMON_RUSTY_SWORD_RANGE_TYPE = RangeType.Melee
// common rusty sword's base attack range is constant
const COMMON_RUSTY_SWORD_BASE_ATTACK_RANGE = 175
// common rusty sword's crit chance is constant
const COMMON_RUSTY_SWORD_CRIT_CHANCE = 0.05
// common rusty sword's attribute chance is constant
const COMMON_RUSTY_SWORD_ATTR_CHANCE = 0.05
// common rusty sword's attribute modifier type is constant
const COMMON_RUSTY_SWORD_ATTR_MODIFIER_TYPE = WeaponAttributeModifierType.Percentage
// common rusty sword's attribute modifier value is constant
const COMMON_RUSTY_SWORD_ATTR_MODIFIER_VALUE = 3

/**
 * Gets Common Rusty Sword's attribute (Basic Laceration).
 * 
 * Note that Common Rusty Sword's attribute is constant throughout all levels, meaning that this code can be kept as such.
 */
const getCommonRustySwordAttribute = (): WeaponAttribute => {
    // get the `attributes.json` file
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../../../mechanics/attributes.json')).toString('utf-8')
    const attributes = JSON.parse(inputPath) as Attribute[]

    // find `Basic Laceration` and return it as an Attribute instance
    const basicLaceration: Attribute = attributes.filter((attribute: Attribute) => attribute.name === 'Basic Laceration').pop()

    return {
        attribute: basicLaceration,
        chance: COMMON_RUSTY_SWORD_ATTR_CHANCE,
        modifier: {
            type: COMMON_RUSTY_SWORD_ATTR_MODIFIER_TYPE,
            value: COMMON_RUSTY_SWORD_ATTR_MODIFIER_VALUE,
        },
        radius: 0,
    }
}

/**
 * Gets Common Rusty Sword's upgrade cost for a specific level and return an UpgradeCost instance.
 */
const getCommonRustySwordUpgradeCost = (level: number): UpgradeCost => {
    // the coins required
    const coins = Math.floor(Math.pow(level, 2.25) + (level * 3))

    // if level 1 - 14
    if ((level >= 1 && level <= 14) || (level >= 15 && level <= 29)) {
        return {
            coins,
            energyCores: 0,
            resources: null,
        }
    }

    // if level is 15 - 29, return:
    if (level >= 15 && level <= 29) {
        return {
            coins,
            energyCores: 1,
            resources: null,
        }
    }

    // if level is 30 - 39, return:
    if (level >= 30 && level <= 39) {
        return {
            coins,
            energyCores: 1,
            resources: [
                { type: Resource.Wood, amount: 5 },
                { type: Resource.Stone, amount: 5 },
                { type: Resource.Coal, amount: 5 }
            ]
        }
    }

    // if level is 40 - 45, return:
    if (level >= 40 && level <= 45) {
        return {
            coins,
            energyCores: 2,
            resources: [
                { type: Resource.Wood, amount: 15 },
                { type: Resource.Stone, amount: 15 },
                { type: Resource.Coal, amount: 10 }
            ]
        }
    }

    // if level is 46 - 49, return:
    if (level >= 46 && level <= 49) {
        return {
            coins,
            energyCores: 3,
            resources: [
                { type: Resource.Wood, amount: 35 },
                { type: Resource.Stone, amount: 15 },
                { type: Resource.Coal, amount: 10 }
            ]
        }
    }

    // if level is 50, return:
    if (level === 50) {
        return {
            coins,
            energyCores: 3,
            resources: [
                { type: Resource.Wood, amount: 65 },
                { type: Resource.Stone, amount: 40 },
                { type: Resource.Coal, amount: 30 }
            ]
        }
    }

    // otherwise, throw an error because the level is invalid
    throw new Error(`Invalid level ${level} for Common Rusty Sword.`)
}

/**
 * Creates the base stats for Common Rusty Sword.
 */
const commonRustySwordBaseStats: WeaponLevelMechanics = {
    level: 1,
    baseDamage: COMMON_RUSTY_SWORD_BASE_DAMAGE,
    baseAttackRange: COMMON_RUSTY_SWORD_BASE_ATTACK_RANGE,
    baseAttackTime: COMMON_RUSTY_SWORD_LEVEL_RANGE.find((range) => 1 >= range.fromLevel && 1 <= range.toLevel).baseAttackTime,
    critChance: COMMON_RUSTY_SWORD_CRIT_CHANCE,
    attributes: [getCommonRustySwordAttribute()],
    upgradeCost: getCommonRustySwordUpgradeCost(1)

}

/**
 * Gets Common Rusty Sword's level mechanics and returns it as an array of WeaponLevelMechanics instances.
 */
const getCommonRustySwordLevelMechanics = (): WeaponLevelMechanics[] => {
    const levelMechanics: WeaponLevelMechanics[] = [commonRustySwordBaseStats]

    for (let i = 2; i <= MAX_WEAPON_LEVEL; i++) {
        // increment the base damage based on the level range
        const baseDamage = levelMechanics[i - 2].baseDamage + COMMON_RUSTY_SWORD_LEVEL_RANGE.find((range) => i >= range.fromLevel && i <= range.toLevel).damageIncrement
        // get the base attack time based on the level range
        const baseAttackTime = COMMON_RUSTY_SWORD_LEVEL_RANGE.find((range) => i >= range.fromLevel && i <= range.toLevel).baseAttackTime
        
        const currentLevelMechanics: WeaponLevelMechanics = {
            level: i,
            baseDamage,
            baseAttackRange: COMMON_RUSTY_SWORD_BASE_ATTACK_RANGE,
            baseAttackTime,
            critChance: COMMON_RUSTY_SWORD_CRIT_CHANCE,
            attributes: [getCommonRustySwordAttribute()],
            upgradeCost: getCommonRustySwordUpgradeCost(i)
        }

        levelMechanics.push(currentLevelMechanics)
    }

    return levelMechanics
}

/**
 * Creates Common Rusty Sword's data for all levels and stores it as a JSON file.
 */
const createCommonRustySwordData = (): void => {
    const commonRustySwordLevelMechanics: WeaponLevelMechanics[] = getCommonRustySwordLevelMechanics()

    const commonRustySword: Weapon = {
        name: 'Common Rusty Sword',
        rarity: WeaponRarity.Common,
        description: 'A Worn and weathered, this aged sword still holds hidden strength. A relic of battles past, it longs for a new hero to carve their legend.',
        levelMechanics: commonRustySwordLevelMechanics,
    }

    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../../mechanics/weapons/common/commonRustySword.json')
    fs.writeFileSync(outputPath, JSON.stringify(commonRustySword, null, 4))

    console.log('Common Rusty Sword data created.')
}

createCommonRustySwordData()


