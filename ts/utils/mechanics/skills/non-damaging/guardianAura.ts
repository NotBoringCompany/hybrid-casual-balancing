import path from 'path'
import fs from 'fs'
import { TargetMechanics, TargetType } from '../../../../models/target'
import { RangeType } from '../../../../models/range'
import { PurchaseCost } from '../../../../models/purchase'
import { NonDamagingSkill, NonDamagingSkillAttribute, NonDamagingSkillLevelMechanics, SkillModifierType } from '../../../../models/skill'
import { Attribute } from '../../../../models/attribute'
import { Resource } from '../../../../models/resource'
import { MAX_SKILL_LEVEL } from '../skill'

/**
 * Guardian Aura constants
 */
// the base healing of a guardian aura at level 1
const GUARDIAN_AURA_BASE_RESISTANCE = 30
// increment of resistance every level
const GUARDIAN_AURA_RESISTANCE_MODIFIER = 5
// guardian aura's target mechanics is constant
const GUARDIAN_AURA_TARGET_MECHANICS: TargetMechanics = {
    type: TargetType.Self,
    count: 1,
}
// guardian aura's range type is constant
const GUARDIAN_AURA_RANGE_TYPE = RangeType.Ranged
// guardian aura's base attack range is constant (0 because you target self)
const GUARDIAN_AURA_SKILL_RANGE = 0
// guardian aura's base cast time at level 1
const GUARDIAN_AURA_BASE_SKILL_CAST_TIME = 1.3
// guardian aura's base cooldown at level 1
const GUARDIAN_AURA_BASE_COOLDOWN = 25
// cooldown reduction modifier every level
const GUARDIAN_AURA_COOLDOWN_REDUCTION_MODIFIER = 1
// cost to purchase guardian aura
const GUARDIAN_AURA_PURCHASE_COST: PurchaseCost = {
    coins: 150,
    energyCores: 0,
    resources: null,
}
// guardian aura's duration
const GUARDIAN_AURA_DURATION = 5

/**
 * Gets guardian aura's attribute (Resilience) and its stats for a specific level
 */
const getRestorativeTouchAttribute = (level: number): NonDamagingSkillAttribute => {
    // get the `attributes.json` file
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../../../mechanics/attributes.json')).toString('utf-8')
    const attributes = JSON.parse(inputPath) as Attribute[]

    // find `Resilience` and return it as an Attribute instance
    const resilience: Attribute = attributes.filter((attribute: Attribute) => attribute.name === 'Resilience').pop()

    return {
        attribute: resilience,
        chance: 1,
        modifier: {
            type: SkillModifierType.Percentage,
            value: GUARDIAN_AURA_BASE_RESISTANCE + (GUARDIAN_AURA_RESISTANCE_MODIFIER * (level - 1)),
        },
        radius: 0,
    }
}

/**
 * Gets guardian aura's upgrade cost for a specific level and return an UpgradeCost instance.
 */
const getRestorativeTouchUpgradeCost = (level: number): PurchaseCost => {
    // coins required
    const coins = Math.floor((4 * Math.pow(level, 3)) + (5 * level) + 15)

    if (level === 1) {
        return {
            coins: 0,
            energyCores: 0,
            resources: null,
        }
    }

    // if level is 2 - 4
    if (level > 1 && level <= 4) {
        return {
            coins,
            energyCores: 1,
            resources: null,
        }
    }

    // if level is 5 - 9
    if (level >= 5 && level <= 9) {
        return {
            coins,
            energyCores: 1,
            resources: [
                { type: Resource.Wood, amount: 15 },
                { type: Resource.Stone, amount: 10 },
            ],
        }
    }

    if (level === 10) {
        return {
            coins,
            energyCores: 3,
            resources: [
                { type: Resource.Wood, amount: 50 },
                { type: Resource.Stone, amount: 30 },
                { type: Resource.Coal, amount: 10 },
            ],
        }
    }

    // otherwise, throw an error because the level is invalid
    throw new Error('Invalid level')
}

/**
 * Creates the base stats for guardian aura
 */
const restorativeTouchBaseStats: NonDamagingSkillLevelMechanics = {
    level: 1,
    baseSkillCastTime: GUARDIAN_AURA_BASE_SKILL_CAST_TIME,
    duration: GUARDIAN_AURA_DURATION,
    cooldown: GUARDIAN_AURA_BASE_COOLDOWN,
    attributes: [getRestorativeTouchAttribute(1)],
    upgradeCost: getRestorativeTouchUpgradeCost(1),
}

/**
 * Gets guardian aura's level mechanics and returns it as an array of NonDamagingSkillLevelMechanics.
 */
const getRestorativeTouchLevelMechanics = (): NonDamagingSkillLevelMechanics[] => {
    const levelMechanics: NonDamagingSkillLevelMechanics[] = [restorativeTouchBaseStats]

    for (let i = 2; i <= MAX_SKILL_LEVEL; i++) {
        // get the cooldown
        const cooldown = levelMechanics[i-2].cooldown - GUARDIAN_AURA_COOLDOWN_REDUCTION_MODIFIER
        // get the upgrade cost for this level
        const upgradeCost = getRestorativeTouchUpgradeCost(i)

        const currentLevelMechanics: NonDamagingSkillLevelMechanics = {
            level: i,
            baseSkillCastTime: GUARDIAN_AURA_BASE_SKILL_CAST_TIME,
            duration: GUARDIAN_AURA_DURATION,
            cooldown,
            attributes: [getRestorativeTouchAttribute(i)],
            upgradeCost,
        }

        levelMechanics.push(currentLevelMechanics)
    }

    return levelMechanics
}

/**
 * Creates guardian aura's data for all levels and stores it as a JSON file.
 */
const createGuardianAuraData = (): void => {
    const levelMechanics: NonDamagingSkillLevelMechanics[] = getRestorativeTouchLevelMechanics()

    const restorativeTouch: NonDamagingSkill = {
        name: 'Guardian Aura',
        description: 'Call forth an ethereal shield, reducing incoming damage taken.',
        targetMechanics: GUARDIAN_AURA_TARGET_MECHANICS,
        rangeType: GUARDIAN_AURA_RANGE_TYPE,
        range: GUARDIAN_AURA_SKILL_RANGE,
        purchaseCost: GUARDIAN_AURA_PURCHASE_COST,
        levelMechanics,
    }

    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../../mechanics/skills/non-damaging/guardianAura.json')
    fs.writeFileSync(outputPath, JSON.stringify(restorativeTouch, null, 4))

    console.log('guardian aura data created')
}

createGuardianAuraData()