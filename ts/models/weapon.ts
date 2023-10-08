/**
 * Shows the minimum level required for the player to level up their weapon to a certain level.
 */
export interface WeaponLevelRequirement {
    // the weapon level
    level: number,
    // the minimum player level required to level up the weapon to this level
    minPlayerLevel: number,
}