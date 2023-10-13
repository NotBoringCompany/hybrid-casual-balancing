import path from 'path'
import fs from 'fs'
import { TargetMechanics, TargetType } from '../../../../models/target'
import { RangeType } from '../../../../models/range'
import { DamagingSkill, DamagingSkillAttribute, DamagingSkillLevelMechanics, SkillModifierType } from '../../../../models/skill'
import { Attribute } from '../../../../models/attribute'
import { UpgradeCost } from '../../../../models/upgradeCost'
import { Resource } from '../../../../models/resource'
import { MAX_SKILL_LEVEL } from '../skill'

// each level range has a different damage increment, attribute chance and attribute modifier increment
// base attribute modifier for each level range is the base modifier at `fromLevel`
const SWORD_SLAM_LEVEL_RANGE = [
    { fromLevel: 1, toLevel: 4, damageIncrement: 65, attributeChance: 0.125, baseAttributeModifier: 3, attributeModifierIncrement: 0.3 },
    { fromLevel: 5, toLevel: 9, damageIncrement: 100, attributeChance: 0.175, baseAttributeModifier: 4.5, attributeModifierIncrement: 0.6 },
    { fromLevel: 10, toLevel: 10, damageIncrement: 175, attributeChance: 0.25, baseAttributeModifier: 8.5, attributeModifierIncrement: 1.6 }
]

/**
 * Sword Slam constants
 */
// the base damage of a sword slam at level 1
const SWORD_SLAM_BASE_DAMAGE = 150
// sword slam's target mechanics is constant
const SWORD_SLAM_TARGET_MECHANICS: TargetMechanics = {
    type: TargetType.Enemy,
    count: 1,
}
// sword slam's range type is constant
const SWORD_SLAM_RANGE_TYPE = RangeType.Melee
// sword slam's base attack range is constant
const SWORD_SLAM_SKILL_RANGE = 175
// sword slam's base cast time at level 1
const SWORD_SLAM_BASE_SKILL_CAST_TIME = 1.3
// sword slam's base cooldown at level 1
const SWORD_SLAM_BASE_COOLDOWN = 20
// cost to purchase sword slam
const SWORD_SLAM_PURCHASE_COST = {
    coins: 300,
    energyCores: 0,
    resources: null,
}
// cooldown reduction modifier every level
const SWORD_SLAM_COOLDOWN_REDUCTION_MODIFIER = 0.5
// sword slam's duration
const SWORD_SLAM_DURATION = 0

/**
 * Gets the final Stun (Sword Slam's attribute) modifier based on the skill's level
 */
const finalStunModifier = (level: number) => {
    if (level === 1) return SWORD_SLAM_LEVEL_RANGE[0].baseAttributeModifier

    const levelRange = SWORD_SLAM_LEVEL_RANGE.filter((levelRange) => level >= levelRange.fromLevel && level <= levelRange.toLevel).pop()

    if (!levelRange) return 0

    return levelRange.baseAttributeModifier + (levelRange.attributeModifierIncrement * (level - levelRange.fromLevel))
}

/**
 * Gets Sword Slam's attribute (Stun) and its stats for a specific level
 */
const getSwordSlamAttribute = (level: number): DamagingSkillAttribute => {
    // get the `attributes.json` file
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../../../mechanics/attributes.json')).toString('utf-8')
    const attributes = JSON.parse(inputPath) as Attribute[]

    // find `Stun` and return it as an Attribute instance
    const stun: Attribute = attributes.filter((attribute: Attribute) => attribute.name === 'Stun').pop()

    // find the attribute chance from the level range
    const attributeChance = SWORD_SLAM_LEVEL_RANGE.filter((levelRange) => level >= levelRange.fromLevel && level <= levelRange.toLevel).pop()?.attributeChance ?? 0

    return {
        attribute: stun,
        chance: attributeChance,
        modifier: {
            type: SkillModifierType.Number,
            value: finalStunModifier(level),
        },
        radius: 0,
    }
}

/**
 * Gets Sword Slam's upgrade cost for a specific level and return an UpgradeCost instance.
 */
const getSwordSlamUpgradeCost = (level: number): UpgradeCost => {
    // coins required
    const coins = Math.floor((8 * Math.pow(level, 3)) + (10 * level) + 25)

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
 * Creates the base stats for Sword Slam
 */
const swordSlamBaseStats: DamagingSkillLevelMechanics = {
    level: 1,
    baseDamage: SWORD_SLAM_BASE_DAMAGE,
    baseSkillCastTime: SWORD_SLAM_BASE_SKILL_CAST_TIME,
    duration: SWORD_SLAM_DURATION,
    cooldown: SWORD_SLAM_BASE_COOLDOWN,
    attributes: [getSwordSlamAttribute(1)],
    upgradeCost: getSwordSlamUpgradeCost(1),
}

/**
 * Gets Sword Slam's level mechanics for a specific level and returns a DamagingSkillLevelMechanics instance.
 */
const getSwordSlamLevelMechanics = (): DamagingSkillLevelMechanics[] => {
    const levelMechanics: DamagingSkillLevelMechanics[] = [swordSlamBaseStats]

    for (let i = 2; i <= MAX_SKILL_LEVEL; i++) {
        // increment the base damage based on the level range
        const baseDamage = levelMechanics[i-2].baseDamage + SWORD_SLAM_LEVEL_RANGE.find((levelRange) => i >= levelRange.fromLevel && i <= levelRange.toLevel).damageIncrement
        // reduce the cooldown based on the cooldown reduction modifier
        const cooldown = levelMechanics[i-2].cooldown - SWORD_SLAM_COOLDOWN_REDUCTION_MODIFIER
        // get the upgrade cost for this level
        const upgradeCost = getSwordSlamUpgradeCost(i)

        const currentLevelMechanics: DamagingSkillLevelMechanics = {
            level: i,
            baseDamage,
            baseSkillCastTime: SWORD_SLAM_BASE_SKILL_CAST_TIME,
            duration: SWORD_SLAM_DURATION,
            cooldown,
            attributes: [getSwordSlamAttribute(i)],
            upgradeCost,
        }

        levelMechanics.push(currentLevelMechanics)
    }

    return levelMechanics
}

/**
 * Creates Sword Slam's data for all levels and stores it as a JSON file.
 */
const createSwordSlamData = (): void => {
    const levelMechanics: DamagingSkillLevelMechanics[] = getSwordSlamLevelMechanics()

    const swordSlam: DamagingSkill = {
        name: 'Sword Slam',
        description: 'Channel your strength into a powerful, ground-shaking strike with your sword.',
        targetMechanics: SWORD_SLAM_TARGET_MECHANICS,
        rangeType: SWORD_SLAM_RANGE_TYPE,
        purchaseCost: SWORD_SLAM_PURCHASE_COST,
        levelMechanics,
    }

    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../../mechanics/skills/damaging/swordSlam.json')
    fs.writeFileSync(outputPath, JSON.stringify(swordSlam, null, 4))

    console.log('Sword Slam data created')
}

createSwordSlamData()
