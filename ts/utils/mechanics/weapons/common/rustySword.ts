import path from 'path'
import fs from 'fs'

import { Attribute } from '../../../../models/attribute'
import { RangeType } from '../../../../models/range'
import { WeaponAttribute, WeaponAttributeModifierType, WeaponLevelMechanics } from '../../../../models/weapon'

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
 * Creates the base stats for Common Rusty Sword.
 */
const commonRustySwordBaseStats: WeaponLevelMechanics = {
    level: 1,
    baseDamage: COMMON_RUSTY_SWORD_BASE_DAMAGE,
    baseAttackRange: COMMON_RUSTY_SWORD_BASE_ATTACK_RANGE,
    baseAttackTime: COMMON_RUSTY_SWORD_LEVEL_RANGE.find((range) => 1 >= range.fromLevel && 1 <= range.toLevel).baseAttackTime,
    critChance: COMMON_RUSTY_SWORD_CRIT_CHANCE,
    attributes: [getCommonRustySwordAttribute()],
    upgradeCost: 

}

/**
 * Gets Common Rusty Sword's level mechanics and returns it as an array of WeaponLevelMechanics instances.
 */
const getCommonRustySwordLevelMechanics = (): WeaponLevelMechanics[] => {

}


