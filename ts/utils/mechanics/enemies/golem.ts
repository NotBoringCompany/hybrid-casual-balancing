import path from 'path'
import fs from 'fs'

import { Attribute } from '../../../models/attribute'
import { EnemySkill, SkillModifierType } from '../../../models/skill'
import { Enemy, EnemyLevelMechanics, KillRewards } from '../../../models/enemy'
import { MAX_ENEMY_LEVEL } from './enemy'
import { RangeType } from '../../../models/range'

// golem's base HP at level 1
const GOLEM_BASE_HP = 350
// golem's base HP regen at level 1
const GOLEM_BASE_HP_REGEN = 1.75
// golem's base movement speed per level is constant
const GOLEM_BASE_MOVEMENT_SPEED = 90
// golem's base damage at level 1
const GOLEM_BASE_DAMAGE = 30
// golem's base projectile velocity is 0 (because golem is a melee enemy)
const GOLEM_BASE_PROJECTILE_VELOCITY = 0
// golem's base attack range is constant
const GOLEM_BASE_ATTACK_RANGE = 200
// golem's base attack time is constant
const GOLEM_BASE_ATTACK_TIME = 2.5
// golem's base crit chance is constant
const GOLEM_BASE_CRIT_CHANCE = 0.075

// golem's increase in base HP per level
const GOLEM_BASE_HP_INCREMENT_PER_LEVEL = 75
// golem's base hp regen multiplier * base hp = base hp regen
const GOLEM_BASE_HP_REGEN_MULTIPLIER = 0.005
// golem's increase in base damage per level
const GOLEM_BASE_DAMAGE_INCREMENT_PER_LEVEL = 8

/**
 * Gets Golem's base skill and return an EnemySkill instance.
 * 
 * Because all enemies currently have the same skill data for any level, no other fields apart from `level` changes.
 */
const getGolemBaseSkill = (level: number): EnemySkill => {
    // get the `attributes.json` file
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../../mechanics/attributes.json')).toString('utf-8')
    const attributes = JSON.parse(inputPath) as Attribute[]

    // find `Ground Smash` and return it as an Attribute instance
    const groundSmash: Attribute = attributes.filter((attribute: Attribute) => attribute.name === 'Ground Smash').pop()

    // return the base skill
    return {
        attributes: [groundSmash],
        addDescription: 'Slams the ground, dealing HP-based damage to enemies around a radius and stuns them temporarily.',
        levelMechanics: [
            {
                level: level,
                // the stun duration
                duration: 2,
                modifier: {
                    type: SkillModifierType.Percentage,
                    // the HP-based damage percentage
                    value: 7.5,
                },
                chance: 0.125,
                radius: 500,
            }
        ]
    }
}

/**
 * Gets Golem's kill rewards for this level and return a DefeatRewards instance.
 */
const getGolemKillRewards = (level: number): KillRewards => {
    const coins = Math.floor((level / 1.5) + 5)
    const xp = Math.floor((level * 4) + 25)

    return {
        coins,
        xp
    }
}

/**
 * Creates the base stats for Golem.
 */
const golemBaseStats: EnemyLevelMechanics = {
    level: 1,
    baseHp: GOLEM_BASE_HP,
    baseHpRegen: GOLEM_BASE_HP_REGEN,
    baseMovementSpeed: GOLEM_BASE_MOVEMENT_SPEED,
    baseDamage: GOLEM_BASE_DAMAGE,
    baseProjectileVelocity: GOLEM_BASE_PROJECTILE_VELOCITY,
    baseAttackRange: GOLEM_BASE_ATTACK_RANGE,
    baseAttackTime: GOLEM_BASE_ATTACK_TIME,
    critChance: GOLEM_BASE_CRIT_CHANCE,
    skill: getGolemBaseSkill(1),
    killRewards: getGolemKillRewards(1),
}

/**
 * Creates Golem's data for all levels and stores it as a JSON file.
 */
const createGolemData = (): void => {
    const golemLevelMechanics: EnemyLevelMechanics[] = [golemBaseStats]

    for (let i = 2; i <= MAX_ENEMY_LEVEL; i++) {
        // take the previous level's base HP and add the increment
        const baseHp = golemLevelMechanics[i - 2].baseHp + GOLEM_BASE_HP_INCREMENT_PER_LEVEL
        // multiply the base HP by the multiplier to get the base HP regen
        const baseHpRegen = parseFloat((baseHp * GOLEM_BASE_HP_REGEN_MULTIPLIER).toFixed(2))
        // take the previous level's base damage and add the increment
        const baseDamage = golemLevelMechanics[i - 2].baseDamage + GOLEM_BASE_DAMAGE_INCREMENT_PER_LEVEL

        const currentLevelMechanics: EnemyLevelMechanics = {
            level: i,
            baseHp,
            baseHpRegen,
            baseMovementSpeed: GOLEM_BASE_MOVEMENT_SPEED,
            baseDamage,
            baseProjectileVelocity: GOLEM_BASE_PROJECTILE_VELOCITY,
            baseAttackRange: GOLEM_BASE_ATTACK_RANGE,
            baseAttackTime: GOLEM_BASE_ATTACK_TIME,
            critChance: GOLEM_BASE_CRIT_CHANCE,
            skill: getGolemBaseSkill(i),
            killRewards: getGolemKillRewards(i),
        }

        golemLevelMechanics.push(currentLevelMechanics)
    }

    // create an instance of Golem
    const golem: Enemy = {
        name: 'Golem',
        description: 'A large, slow-moving behemoth that deals high damage in one hit.',
        rangeType: RangeType.Melee,
        levelMechanics: golemLevelMechanics,
    }

    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../mechanics/enemies/golem.json')
    fs.writeFileSync(outputPath, JSON.stringify(golem, null, 4))

    console.log('Successfully created Golem data!')
}

createGolemData()
