/**
 * Shows the minimum level required for the player to level up their skill to a certain level.
 */
export interface SkillLevelRequirement {
    // the skill level
    level: number,
    // the minimum player level required to level up the skill to this level
    minPlayerLevelRequired: number,
}