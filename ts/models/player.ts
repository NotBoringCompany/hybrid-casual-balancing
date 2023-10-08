/**
 * Represents the mechanics of a player level by level (such as requirements to level up, maximum skill level allowed and so on).
 * 
 * This is NOT the same as `Player`. Player is intended to provide an actual instance of a player, while this is intended to provide the mechanics of a player.
 */
export interface PlayerLevelMechanics {
    // the player's level
    level: number,
    // the base HP of the player at this level
    baseHp: number,
    // the base HP regen of the player at this level
    baseHpRegen: number,
    // the base movement speed of the player at this level
    baseMovementSpeed: number,
    // the xp required to level up from this level to the next level
    // note that this is cumulative, meaning that it will always be higher than the previous level's xp requirement
    levelUpXpRequired: number,
    // the maximum skill level allowed (for any skill) for the player at this level
    maxSkillLevel: number,
    // the maximum weapon level allowed (for any weapon) for the player at this level
    maxWeaponLevel: number,
}