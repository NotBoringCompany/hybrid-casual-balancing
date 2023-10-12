import { RangeType } from './range'
import { EnemySkill } from './skill'

/**
 * Represents an instance of an enemy.
 */
export interface Enemy {
    // the name of the enemy
    name: string,
    // the description of the enemy
    description: string,
    // the enemy's range type
    rangeType: RangeType,
    // the enemy's level mechanics
    levelMechanics: EnemyLevelMechanics[],
}

/**
 * Represents the mechanics of an enemy level by level.
 * 
 * This is NOT the same as `Enemy`. Enemy is intended to provide an actual instance of an enemy, while this is intended to provide the mechanics of an enemy.
 */
export interface EnemyLevelMechanics {
    // the enemy's level
    level: number,
    // the enemy's base HP at this level
    baseHp: number,
    // the enemy's base HP regen at this level
    baseHpRegen: number,
    // the enemy's base movement speed at this level (calculated in unity units/second * 100)
    baseMovementSpeed: number,
    // the enemy's base damage at this level
    baseDamage: number,
    // how fast the enemy shoots its projectile (only if range type is ranged)
    baseProjectileVelocity: number,
    // the enemy's base attack range at this level
    baseAttackRange: number,
    // the enemy's base attack time at this level in seconds. note that the first attack is always half of this value.
    baseAttackTime: number,
    // the enemy's crit chance for its attacks at this level
    critChance: number,
    // the enemy's skill data at this level
    skill: EnemySkill,
    // the enemy's kill rewards at this level
    killRewards: KillRewards,
}

/**
 * Represents the rewards for defeating an enemy.
 */
export interface KillRewards {
    // the amount of coins the player gets for defeating this enemy
    coins: number,
    // the amount of experience the player gets for defeating this enemy
    xp: number
}