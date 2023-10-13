import path from 'path'
import fs from 'fs'
import { TargetMechanics, TargetType } from '../../../../models/target'
import { RangeType } from '../../../../models/range'
import { PurchaseCost } from '../../../../models/purchase'
import { DamagingSkill, DamagingSkillAttribute, DamagingSkillLevelMechanics, SkillModifierType } from '../../../../models/skill'
import { Attribute } from '../../../../models/attribute'
import { UpgradeCost } from '../../../../models/upgradeCost'
import { Resource } from '../../../../models/resource'
import { MAX_SKILL_LEVEL } from '../skill'

// each level range has a different damage increment, attribute chance and attribute modifier increment
// base attribute modifier for each level range is the base modifier at `fromLevel`
// e.g. at level 5, the base attribute modifier is 2.5
const SHOCKSTREAM_LEVEL_RANGE = [
    { fromLevel: 1, toLevel: 4, damageIncrement: 10, attributeChance: 1, baseAttributeModifier: 50, attributeModifierIncrement: 0 },
    { fromLevel: 5, toLevel: 9, damageIncrement: 18, attributeChance: 1, baseAttributeModifier: 60, attributeModifierIncrement: 0 },
    { fromLevel: 10, toLevel: 10, damageIncrement: 35, attributeChance: 1, baseAttributeModifier: 75, attributeModifierIncrement: 0 }
]

/**
 * Shockstream constants
 */
// the base damage of a shockstream at level 1
const SHOCKSTREAM_BASE_DAMAGE = 25
// shockstream's target mechanics is constant
const SHOCKSTREAM_TARGET_MECHANICS: TargetMechanics = {
    type: TargetType.Enemy,
    count: 3,
}
// shockstream's range type is constant
const SHOCKSTREAM_RANGE_TYPE = RangeType.Ranged
// shockstream's base attack range is constant
const SHOCKSTREAM_SKILL_RANGE = 550
// shockstream's base cast time at level 1
const SHOCKSTREAM_BASE_SKILL_CAST_TIME = 1.3
// shockstream's base cooldown at level 1
const SHOCKSTREAM_BASE_COOLDOWN = 5
// cost to purchase shockstream
const SHOCKSTREAM_PURCHASE_COST: PurchaseCost = {
    coins: 250,
    energyCores: 0,
    resources: null,
}
// cooldown reduction modifier every level
const SHOCKSTREAM_COOLDOWN_REDUCTION_MODIFIER = 0.2
// shockstream's duration
const SHOCKSTREAM_DURATION = 0

/**
 * Gets the final Chain Reaction (Shockstream's attribute) modifier based on the skill's level
 */
const getShockstreamAttribute = (): DamagingSkillAttribute => {
    // get the `attributes.json` file
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../../../mechanics/attributes.json')).toString('utf-8')
    const attributes = JSON.parse(inputPath) as Attribute[]

    // find `Chain Reaction` and return it as an Attribute instance
    const chainReaction: Attribute = attributes.filter((attribute: Attribute) => attribute.name === 'Chain Reaction').pop()

    // find the modifier from the level range
    const modifier = SHOCKSTREAM_LEVEL_RANGE.find((levelRange) => 1 >= levelRange.fromLevel && 1 <= levelRange.toLevel).baseAttributeModifier

    return {
        attribute: chainReaction,
        chance: 1,
        modifier: {
            type: SkillModifierType.Number,
            value: modifier,
        },
        radius: 0,
    }
}

/**
 * Gets Shockstream's upgrade cost for a specific level and return an UpgradeCost instance.
 */
const getShockstreamUpgradeCost = (level: number): UpgradeCost => {
    // coins reequired
    const coins = Math.floor((8.5 * Math.pow(level, 3)) + (8 * level) + 20)

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
            energyCores: 2,
            resources: [
                { type: Resource.Wood, amount: 35 },
                { type: Resource.Stone, amount: 25 },
                { type: Resource.Coal, amount: 20 }
            ],
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
    throw new Error(`Invalid level`)
}

/**
 * Creates the base stats for Shockstream
 */
const shockstreamBaseStats: DamagingSkillLevelMechanics = {
    level: 1,
    baseDamage: SHOCKSTREAM_BASE_DAMAGE,
    baseSkillCastTime: SHOCKSTREAM_BASE_SKILL_CAST_TIME,
    duration: SHOCKSTREAM_DURATION,
    cooldown: SHOCKSTREAM_BASE_COOLDOWN,
    attributes: [getShockstreamAttribute()],
    upgradeCost: getShockstreamUpgradeCost(1),   
}

/**
 * Gets Shockstream's level mechanics and returns it as an array of DamagingSkillLevelMechanics.
 */
export const getShockstreamLevelMechanics = (): DamagingSkillLevelMechanics[] => {
    // create an array of level mechanics
    const levelMechanics: DamagingSkillLevelMechanics[] = [shockstreamBaseStats]

    for (let i = 2; i <= MAX_SKILL_LEVEL; i++) {
        // increment the base damage based on the level range
        const baseDamage = levelMechanics[i - 2].baseDamage + SHOCKSTREAM_LEVEL_RANGE.find((range) => i >= range.fromLevel && i <= range.toLevel).damageIncrement
        // reduce the cooldown based on the cooldown reduction modifier
        const cooldown = levelMechanics[i - 2].cooldown - SHOCKSTREAM_COOLDOWN_REDUCTION_MODIFIER
        // get the upgrade cost for this level
        const upgradeCost = getShockstreamUpgradeCost(i)

        const currentLevelMechanics: DamagingSkillLevelMechanics = {
            level: i,
            baseDamage,
            baseSkillCastTime: SHOCKSTREAM_BASE_SKILL_CAST_TIME,
            duration: SHOCKSTREAM_DURATION,
            cooldown,
            attributes: [getShockstreamAttribute()],
            upgradeCost,
        }

        levelMechanics.push(currentLevelMechanics)
    }

    return levelMechanics
}

/**
 * Creates Shockstream's data for all levels and stores it as a JSON file.
 */
const createShockstreamData = (): void => {
    const levelMechanics: DamagingSkillLevelMechanics[] = getShockstreamLevelMechanics()

    const shockstream: DamagingSkill = {
        name: 'Shockstream',
        description: 'Unleash a torrent of crackling lightning that arcs from foe to foe',
        targetMechanics: SHOCKSTREAM_TARGET_MECHANICS,
        rangeType: SHOCKSTREAM_RANGE_TYPE,
        purchaseCost: SHOCKSTREAM_PURCHASE_COST,
        levelMechanics,
    }

    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../../mechanics/skills/damaging/shockstream.json')
    fs.writeFileSync(outputPath, JSON.stringify(shockstream, null, 4))

    console.log('Shockstream data created')
}

createShockstreamData()