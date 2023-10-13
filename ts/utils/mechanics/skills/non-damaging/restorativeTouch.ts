import path from 'path'
import fs from 'fs'
import { TargetMechanics, TargetType } from '../../../../models/target'
import { RangeType } from '../../../../models/range'
import { PurchaseCost } from '../../../../models/purchase'
import { NonDamagingSkill, NonDamagingSkillAttribute, NonDamagingSkillLevelMechanics, SkillModifierType } from '../../../../models/skill'
import { Attribute } from '../../../../models/attribute'
import { Resource } from '../../../../models/resource'
import { MAX_SKILL_LEVEL } from '../skill'

// each level range has a different healing increment
const RESTORATIVE_TOUCH_LEVEL_RANGE = [
    { fromLevel: 1, toLevel: 4, healingIncrement: 55, baseHealingModifier: 65 },
    { fromLevel: 5, toLevel: 9, healingIncrement: 90, baseHealingModifier: 320 },
    { fromLevel: 10, toLevel: 10, healingIncrement: 150, baseHealingModifier: 830 }
]

/**
 * Restorative Touch constants
 */
// the base healing of a restorative touch at level 1
const RESTORATIVE_TOUCH_BASE_HEALING = 65
// restorative touch's target mechanics is constant
const RESTORATIVE_TOUCH_TARGET_MECHANICS: TargetMechanics = {
    type: TargetType.Self,
    count: 1,
}
// restorative touch's range type is constant
const RESTORATIVE_TOUCH_RANGE_TYPE = RangeType.Ranged
// restorative touch's base attack range is constant (0 because you target self)
const RESTORATIVE_TOUCH_SKILL_RANGE = 0
// restorative touch's base cast time at level 1
const RESTORATIVE_TOUCH_BASE_SKILL_CAST_TIME = 1.3
// restorative touch's base cooldown at level 1
const RESTORATIVE_TOUCH_BASE_COOLDOWN = 20
// cooldown reduction modifier every level
const RESTORATIVE_TOUCH_COOLDOWN_REDUCTION_MODIFIER = 0.5
// cost to purchase restorative touch
const RESTORATIVE_TOUCH_PURCHASE_COST: PurchaseCost = {
    coins: 200,
    energyCores: 0,
    resources: null,
}
// restorative touch's duration
const RESTORATIVE_TOUCH_DURATION = 0

/**
 * Gets the final Heal (Restorative Touch's attribute) modifier based on the skill's level
 */
const finalHealModifier = (level: number) => {
    if (level === 1) return RESTORATIVE_TOUCH_LEVEL_RANGE[0].baseHealingModifier

    const levelRange = RESTORATIVE_TOUCH_LEVEL_RANGE.filter((levelRange) => level >= levelRange.fromLevel && level <= levelRange.toLevel).pop()

    if (!levelRange) return 0

    return levelRange.baseHealingModifier + (levelRange.healingIncrement * (level - levelRange.fromLevel))
}

/**
 * Gets Restorative Touch's attribute (Heal) and its stats for a specific level
 */
const getRestorativeTouchAttribute = (level: number): NonDamagingSkillAttribute => {
    // get the `attributes.json` file
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../../../mechanics/attributes.json')).toString('utf-8')
    const attributes = JSON.parse(inputPath) as Attribute[]

    // find `Heal` and return it as an Attribute instance
    const heal: Attribute = attributes.filter((attribute: Attribute) => attribute.name === 'Heal').pop()

    return {
        attribute: heal,
        chance: 1,
        modifier: {
            type: SkillModifierType.Number,
            value: finalHealModifier(level),
        },
        radius: 0,
    }
}

/**
 * Gets Restorative Touch's upgrade cost for a specific level and return an UpgradeCost instance.
 */
const getRestorativeTouchUpgradeCost = (level: number): PurchaseCost => {
    // coins required
    const coins = Math.floor((5 * Math.pow(level, 3)) + (7 * level) + 20)

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
                { type: Resource.Wood, amount: 25 },
                { type: Resource.Stone, amount: 15 },
            ],
        }
    }

    if (level === 10) {
        return {
            coins,
            energyCores: 3,
            resources: [
                { type: Resource.Wood, amount: 75 },
                { type: Resource.Stone, amount: 25 },
                { type: Resource.Coal, amount: 20 },
            ],
        }
    }

    // otherwise, throw an error because the level is invalid
    throw new Error('Invalid level')
}

/**
 * Creates the base stats for Restorative Touch
 */
const restorativeTouchBaseStats: NonDamagingSkillLevelMechanics = {
    level: 1,
    baseSkillCastTime: RESTORATIVE_TOUCH_BASE_SKILL_CAST_TIME,
    duration: RESTORATIVE_TOUCH_DURATION,
    cooldown: RESTORATIVE_TOUCH_BASE_COOLDOWN,
    attributes: [getRestorativeTouchAttribute(1)],
    upgradeCost: getRestorativeTouchUpgradeCost(1),
}

/**
 * Gets Restorative Touch's level mechanics and returns it as an array of NonDamagingSkillLevelMechanics.
 */
const getRestorativeTouchLevelMechanics = (): NonDamagingSkillLevelMechanics[] => {
    const levelMechanics: NonDamagingSkillLevelMechanics[] = [restorativeTouchBaseStats]

    for (let i = 2; i <= MAX_SKILL_LEVEL; i++) {
        // get the cooldown
        const cooldown = levelMechanics[i-2].cooldown - RESTORATIVE_TOUCH_COOLDOWN_REDUCTION_MODIFIER
        // get the upgrade cost for this level
        const upgradeCost = getRestorativeTouchUpgradeCost(i)

        const currentLevelMechanics: NonDamagingSkillLevelMechanics = {
            level: i,
            baseSkillCastTime: RESTORATIVE_TOUCH_BASE_SKILL_CAST_TIME,
            duration: RESTORATIVE_TOUCH_DURATION,
            cooldown,
            attributes: [getRestorativeTouchAttribute(i)],
            upgradeCost,
        }

        levelMechanics.push(currentLevelMechanics)
    }

    return levelMechanics
}

/**
 * Creates Restorative Touch's data for all levels and stores it as a JSON file.
 */
const createRestorativeTouchData = (): void => {
    const levelMechanics: NonDamagingSkillLevelMechanics[] = getRestorativeTouchLevelMechanics()

    const restorativeTouch: NonDamagingSkill = {
        name: 'Restorative Touch',
        description: 'A touch that mends wounds and soothes ailments',
        targetMechanics: RESTORATIVE_TOUCH_TARGET_MECHANICS,
        rangeType: RESTORATIVE_TOUCH_RANGE_TYPE,
        range: RESTORATIVE_TOUCH_SKILL_RANGE,
        purchaseCost: RESTORATIVE_TOUCH_PURCHASE_COST,
        levelMechanics,
    }

    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../../mechanics/skills/non-damaging/restorativeTouch.json')
    fs.writeFileSync(outputPath, JSON.stringify(restorativeTouch, null, 4))

    console.log('Restorative Touch data created')
}

createRestorativeTouchData()

