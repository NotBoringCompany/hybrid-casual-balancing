import { Attribute } from './attribute'
import { PurchaseCost } from './purchase'
import { RangeType } from './range'
import { TargetMechanics, TargetType } from './target'
import { UpgradeCost } from './upgradeCost'

/**
 * Shows the minimum level required for the player to level up their skill to a certain level.
 */
export interface SkillLevelRequirement {
    // the skill level
    level: number,
    // the minimum player level required to level up the skill to this level
    minPlayerLevelRequired: number,
}

/**
 * Represents an enemy's skill.
 */
export interface EnemySkill {
    // the skill's attribute (i.e. characteristics)
    attributes: Attribute[],
    // the skill's additional description (on top of the attribute's description if needed)
    addDescription: string,
    // the skill's level mechanics for the attributes
    levelMechanics: EnemySkillLevelMechanics[],
}

/**
 * Represents a skill that deals damage (mainly)
 */
export interface DamagingSkill {
    // the skill's name
    name: string,
    // the skill's description
    description: string,
    // the skill's targetting mechanics
    targetMechanics: TargetMechanics,
    // the skill's range type
    rangeType: RangeType,
    // the skill's activation range
    range: number,
    // the cost to purchase this skill (if it is a purchasable skill)
    purchaseCost: PurchaseCost,
    // the skill's level mechanics
    levelMechanics: DamagingSkillLevelMechanics[],
}

/**
 * Represents a skill that does not deal damage (mainly)
 */
export interface NonDamagingSkill {
    // the skill's name
    name: string,
    // the skill's description
    description: string,
    // the skill's targetting mechanics
    targetMechanics: TargetMechanics,
    // the skill's range type
    rangeType: RangeType,
    // the skill's activation range
    range: number,
    // the cost to purchase this skill (if it is a purchasable skill)
    purchaseCost: PurchaseCost,
    // the skill's level mechanics
    levelMechanics: NonDamagingSkillLevelMechanics[],
}

/**
 * Represents a damaging skill's level mechanics (how it performs level by level)
 */
export interface DamagingSkillLevelMechanics {
    // the skill's level
    level: number,
    // the skill's base damage at this level
    baseDamage: number,
    // the skill's base cast time at this level
    baseSkillCastTime: number,
    // the skill's duration (0 if not status effect)
    duration: number,
    // the skill's base cooldown at this level
    cooldown: number,
    // the skill's attributes at this level
    attributes: DamagingSkillAttribute[],
    // the cost required to upgrade the skill to this level
    upgradeCost: UpgradeCost,
}

/**
 * Represents a non-damaging skill's level mechanics (how it performs level by level)
 */
export interface NonDamagingSkillLevelMechanics {
    // the skill's level
    level: number,
    // the skill's base cast time at this level
    baseSkillCastTime: number,
    // the skill's duration in seconds (only applies if there is a status effect with a duration), else 0
    duration: number,
    // the skill's base cooldown at this level
    cooldown: number,
    // the skill's attributes at this level
    attributes: NonDamagingSkillAttribute[],
    // the cost required to upgrade the skill to this level
    upgradeCost: UpgradeCost,
}

/**
 * Represents an attribute for a non-damaging skill.
 */
export interface NonDamagingSkillAttribute {
    // the skill's attribute
    attribute: Attribute,
    // the chance for the attribute to play out
    chance: number,
    // the skill's attribute modifier
    modifier: SkillModifier,
    // the radius of effect of the skill's attribute
    radius: number,
}

/**
 * Represents an attribute for a damaging skill.
 */
export interface DamagingSkillAttribute {
    // the skill's attribute
    attribute: Attribute,
    // the chance for the attribute to play out
    chance: number,
    // the skill's attribute modifier
    modifier: SkillModifier,
    // the radius of effect of the skill's attribute
    radius: number,
}

/**
 * Represents an enemy's skill data level by level.
 */
export interface EnemySkillLevelMechanics {
    // the skill level
    level: number,
    // the skill's duration in seconds (only applies if there is a status effect with a duration), else 0
    duration: number,
    // the skill's modifier
    modifier: SkillModifier,
    // the chance for the skill to play out
    chance: number,
    // the skill's radius of effect
    radius: number,
}

/**
 * Represents a skill's modifier.
 */
export interface SkillModifier {
    // the type of the modifier
    type: SkillModifierType,
    // the value of the modifier
    value: number,
}

/**
 * Lists all current skill modifier types.
 */
export enum SkillModifierType {
    Percentage = 'Percentage',
    Number = 'Number',
}