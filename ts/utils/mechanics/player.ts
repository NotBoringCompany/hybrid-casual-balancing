import path from 'path'
import fs from 'fs'
import { PlayerLevelMechanics } from '../../models/player'
import { getMaxSkillLevel } from './skills/skill'
import { getMaxWeaponLevel } from './weapons/levelMechanics'

// the maximum level a player can reach
const MAX_PLAYER_LEVEL = 150
// the increment for base HP per level is constant
const BASE_HP_INCREMENT_PER_LEVEL = 75
// base hp regen multiplier * base hp = base hp regen
const BASE_HP_REGEN_MULTIPLIER = 0.008
// base movement speed per level is constant
const BASE_MOVEMENT_SPEED = 175
// the formula for xp required to level up to the next level
const LEVEL_UP_XP_REQUIRED = (level: number) => (15 * Math.pow(level, 2)) + (20 * level) + 80

/**
 * A player's stats when they're Level 1.
 */
const basePlayerStats: PlayerLevelMechanics = {
    level: 1,
    baseHp: 350,
    baseHpRegen: 0.5,
    baseMovementSpeed: 175,
    levelUpXpRequired: 115,
    maxSkillLevel: 1,
    maxWeaponLevel: 1,
}

/**
 * Calculates the player's stats at every level and returns it as an array of PlayerLevelMechanics.
 */
const calculatePlayerLevelMechanics = (): PlayerLevelMechanics[] => {
    // the first level is always `basePlayerStats`
    const playerLevelMechanics: PlayerLevelMechanics[] = [basePlayerStats]

    for (let i = 2; i <= MAX_PLAYER_LEVEL; i++) {
        // take the previous level's base HP and add the increment
        const baseHp = playerLevelMechanics[i - 2].baseHp + BASE_HP_INCREMENT_PER_LEVEL
        // multiply the base HP by the multiplier to get the base HP regen
        const baseHpRegen = parseFloat((baseHp * BASE_HP_REGEN_MULTIPLIER).toFixed(2))

        const currentLevelMechanics: PlayerLevelMechanics = {
            level: i,
            baseHp,
            baseHpRegen,
            baseMovementSpeed: BASE_MOVEMENT_SPEED,
            levelUpXpRequired: LEVEL_UP_XP_REQUIRED(i),
            maxSkillLevel: getMaxSkillLevel(i) ?? 0,
            maxWeaponLevel: getMaxWeaponLevel(i) ?? 0,
        }

        playerLevelMechanics.push(currentLevelMechanics)
    }

    return playerLevelMechanics
}

/**
 * Creates a new player level mechanics JSON file with the intended mechanics from `calculatePlayerLevelMechanics`.
 */
const createPlayerLevelMechanics = (): void => {
    const playerMechanics = calculatePlayerLevelMechanics()

    const outputPath = path.join(__dirname, '../../../mechanics/player-mechanics/playerLevelMechanics.json')
    fs.writeFileSync(outputPath, JSON.stringify(playerMechanics, null, 4))

    console.log('Player level mechanics JSON file created!')
}