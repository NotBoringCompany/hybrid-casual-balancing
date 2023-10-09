import { Attribute } from './attribute'

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