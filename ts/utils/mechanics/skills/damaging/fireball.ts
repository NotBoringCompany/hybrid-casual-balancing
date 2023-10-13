import path from 'path'
import fs from 'fs' 
import { TargetMechanics, TargetType } from '../../../../models/target'
import { PurchaseCost } from '../../../../models/purchase'
import { RangeType } from '../../../../models/range'
import { DamagingSkill, DamagingSkillAttribute, DamagingSkillLevelMechanics, SkillModifierType } from '../../../../models/skill'
import { Attribute } from '../../../../models/attribute'
import { UpgradeCost } from '../../../../models/upgradeCost'
import { Resource } from '../../../../models/resource'
import { MAX_SKILL_LEVEL } from '../skill'

// each level range has a different damage increment, attribute chance and attribute modifier increment
// base attribute modifier for each level range is the base modifier at `fromLevel`
// e.g. at level 5, the base attribute modifier is 2.5
const FIREBALL_LEVEL_RANGE = [
    { fromLevel: 1, toLevel: 4, damageIncrement: 45, attributeChance: 0.1, baseAttributeModifier: 1.5, attributeModifierIncrement: 0.2 },
    { fromLevel: 5, toLevel: 9, damageIncrement: 65, attributeChance: 0.15, baseAttributeModifier: 2.5, attributeModifierIncrement: 0.4 },
    { fromLevel: 10, toLevel: 10, damageIncrement: 100, attributeChance: 0.25, baseAttributeModifier: 5, attributeModifierIncrement: 0.9 }
]

/**
 * Fireball constants
 */
// the base damage of a fireball at level 1
const FIREBALL_BASE_DAMAGE = 75
// fireball's target mechanics is constant
const FIREBALL_TARGET_MECHANICS: TargetMechanics = {
    type: TargetType.Enemy,
    count: 1,
}
// fireball's range type is constant
const FIREBALL_RANGE_TYPE = RangeType.Ranged
// fireball's base attack range is constant
const FIREBALL_SKILL_RANGE = 900
// fireball's base cast time at level 1
const FIREBALL_BASE_SKILL_CAST_TIME = 1.3
// fireball's base cooldown at level 1
const FIREBALL_BASE_COOLDOWN = 12.5
// cost to purchase fireball
const FIREBALL_PURCHASE_COST: PurchaseCost = {
    coins: 220,
    energyCores: 0,
    resources: null,
}
// cooldown reduction modifier every level
const FIREBALL_COOLDOWN_REDUCTION_MODIFIER = 0.5
// fireball's duration
const FIREBALL_DURATION = 3

/**
 * Gets the final Ignite (Fireball's attribute) modifier based on the skill's level
 */
const finalIgniteModifier = (level: number) => {
    if (level === 1) return FIREBALL_LEVEL_RANGE[0].baseAttributeModifier

    const levelRange = FIREBALL_LEVEL_RANGE.filter((levelRange) => level >= levelRange.fromLevel && level <= levelRange.toLevel).pop()

    if (!levelRange) return 0

    return levelRange.baseAttributeModifier + (levelRange.attributeModifierIncrement * (level - levelRange.fromLevel))
}

/**
 * Gets Fireball's attribute (Ignite) and its stats for a specific level
 */
const getFireballAttribute = (level: number): DamagingSkillAttribute => {
    // get the `attributes.json` file
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../../../mechanics/attributes.json')).toString('utf-8')
    const attributes = JSON.parse(inputPath) as Attribute[]

    // find `Ignite` and return it as an Attribute instance
    const ignite: Attribute = attributes.filter((attribute: Attribute) => attribute.name === 'Ignite').pop()

    // find the attribute chance from the level range
    const attributeChance = FIREBALL_LEVEL_RANGE.filter((levelRange) => level >= levelRange.fromLevel && level <= levelRange.toLevel).pop()?.attributeChance ?? 0

    return {
        attribute: ignite,
        chance: attributeChance,
        modifier: {
            type: SkillModifierType.Number,
            value: finalIgniteModifier(level),
        },
        radius: 0
    }
}

/**
 * Gets Fireball's upgrade cost for a specific level and return an UpgradeCost instance.
 */
const getFireballUpgradeCost = (level: number): UpgradeCost => {
    // coins required
    const coins = Math.floor((8.3 * Math.pow(level, 3)) + (10 * level) + 25)

    if (level === 1) {
        return {
            coins: 0,
            energyCores: 0,
            resources: null,
        }
    }

    // if level 2 - 4
    if (level > 1 && level <= 4) {
        return {
            coins,
            energyCores: 1,
            resources: null
        }
    }

    // if level 5 - 9
    if (level >= 5 && level <= 9) {
        return {
            coins,
            energyCores: 2,
            resources: [
                { type: Resource.Wood, amount: 35 },
                { type: Resource.Stone, amount: 25 },
                { type: Resource.Coal, amount: 20 }
            ]
        }
    }

    // if level 10
    if (level === 10) {
        return {
            coins,
            energyCores: 5,
            resources: [
                { type: Resource.Wood, amount: 100 },
                { type: Resource.Stone, amount: 45 },
                { type: Resource.Coal, amount: 35 }
            ]
        }
    }

    // otherwise, throw an error because the level is invalid
    throw new Error('Invalid level')
}

/**
 * Creates the base stats for Fireball
 */
const fireballBaseStats: DamagingSkillLevelMechanics = {
    level: 1,
    baseDamage: 75,
    baseSkillCastTime: 1.3,
    duration: FIREBALL_DURATION,
    cooldown: 12.5,
    attributes: [getFireballAttribute(1)],
    upgradeCost: getFireballUpgradeCost(1),
}

/**
 * Gets Fireball's level mechanics and returns it as an array of DamagingSkillLevelMechanics.
 */
const getFireballLevelMechanics = (): DamagingSkillLevelMechanics[] => {
    const levelMechanics: DamagingSkillLevelMechanics[] = [fireballBaseStats]

    for (let i = 2; i <= MAX_SKILL_LEVEL; i++) {
        // increment the base damage based on the level range
        const baseDamage = levelMechanics[i-2].baseDamage + FIREBALL_LEVEL_RANGE.find((range) => i >= range.fromLevel && i <= range.toLevel).damageIncrement
        // reduce the cooldown based on the cooldown reduction modifier
        const cooldown = levelMechanics[i-2].cooldown - FIREBALL_COOLDOWN_REDUCTION_MODIFIER
        // get the upgrade cost for this level
        const upgradeCost = getFireballUpgradeCost(i)

        const currentLevelMechanics: DamagingSkillLevelMechanics = {
            level: i,
            baseDamage,
            baseSkillCastTime: FIREBALL_BASE_SKILL_CAST_TIME,
            duration: FIREBALL_DURATION,
            cooldown,
            attributes: [getFireballAttribute(i)],
            upgradeCost
        }

        levelMechanics.push(currentLevelMechanics)
    }

    return levelMechanics
}

/**
 * Creates Fireball's data for all levels and stores it as a JSON file.
 */
const createFireballData = (): void => {
    const levelMechanics: DamagingSkillLevelMechanics[] = getFireballLevelMechanics()

    const fireball: DamagingSkill = {
        name: 'Fireball',
        description: 'A blazing sphere of fiery destruction.',
        targetMechanics: FIREBALL_TARGET_MECHANICS,
        rangeType: FIREBALL_RANGE_TYPE,
        purchaseCost: FIREBALL_PURCHASE_COST,
        levelMechanics: levelMechanics,
    }

    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../../mechanics/skills/damaging/fireball.json')
    fs.writeFileSync(outputPath, JSON.stringify(fireball, null, 4))

    console.log('Fireball data created.')
}

createFireballData()