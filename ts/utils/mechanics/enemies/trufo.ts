import path from 'path'
import fs from 'fs'

import { Attribute } from '../../../models/attribute'
import { Enemy, EnemyLevelMechanics } from '../../../models/enemy'
import { RangeType } from '../../../models/range'
import { EnemySkill, SkillModifierType } from '../../../models/skill'

// trufo's max player reachable
const MAX_TRUFO_LEVEL = 150
// trufo's base hp increment per level is constant
const TRUFO_BASE_HP_INCREMENT_PER_LEVEL = 20
// trufo's base hp regen multiplier * base hp = base hp regen
const TRUFO_BASE_HP_REGEN_MULTIPLIER = 0.005
// trufo's base movement speed per level is constant
const TRUFO_BASE_MOVEMENT_SPEED = 125
// trufo's base damage increment per level is constant
const TRUFO_BASE_DAMAGE_INCREMENT_PER_LEVEL = 3
// because trufo is melee, its base projectile velocity is 0
const TRUFO_BASE_PROJECTILE_VELOCITY = 0
// trufo's base attack range is constant
const TRUFO_BASE_ATTACK_RANGE = 100
// trufo's base attack time is constant
const TRUFO_BASE_ATTACK_TIME = 1.5
// trufo's base crit chance is constant
const TRUFO_BASE_CRIT_CHANCE = 0.05

/**
 * Gets Trufo's base skill and return an EnemySkill instance.
 * 
 * Because all enemies currently have the same skill data for any level, no other fields apart from `level` changes.
 */
const getTrufoBaseSkill = (level: number): EnemySkill => {
    // get the `attributes.json` file
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../../mechanics/attributes.json')).toString('utf-8')
    const attributes = JSON.parse(inputPath) as Attribute[]

    // find `Toxic Cloud` and return it as an Attribute instance
    const toxicCloud: Attribute = attributes.filter((attribute: Attribute) => attribute.name === 'Toxic Cloud').pop()

    // return the base skill
    return {
        attributes: [toxicCloud],
        addDescription: 'Emits a pungent, toxic cloud from Trufo\'s body that deals HP-based damage to enemies around a radius',
        levelMechanics: [
            {
                level: level,
                duration: 3,
                modifier: {
                    type: SkillModifierType.Percentage,
                    value: 1,
                },
                chance: 0.1,
                radius: 250,
            }
        ]
    }
}

/**
 * Creates the base stats for Trufo.
 */
const trufoBaseStats: EnemyLevelMechanics = {
    level: 1,
    baseHp: 100,
    baseHpRegen: 0.5,
    baseMovementSpeed: 125,
    baseDamage: 8,
    baseProjectileVelocity: 0,
    baseAttackRange: 100,
    baseAttackTime: 1.5,
    critChance: 0.05,
    skill: getTrufoBaseSkill(1),
}

/**
 * Creates Trufo's data for all levels and stores it as a JSON file.
 */
const createTrufoData = (): void => {
    const trufoLevelMechanics: EnemyLevelMechanics[] = [trufoBaseStats]

    for (let i = 2; i <= MAX_TRUFO_LEVEL; i++) {
        // the current level
        const level = i
        // take the previous level's base HP and add the increment
        const baseHp = trufoLevelMechanics[i - 2].baseHp + TRUFO_BASE_HP_INCREMENT_PER_LEVEL
        // multiply the base HP by the multiplier to get the base HP regen
        const baseHpRegen = parseFloat((baseHp * TRUFO_BASE_HP_REGEN_MULTIPLIER).toFixed(2))

        const currentLevelMechanics: EnemyLevelMechanics = {
            level,
            baseHp,
            baseHpRegen,
            baseMovementSpeed: TRUFO_BASE_MOVEMENT_SPEED,
            baseDamage: trufoLevelMechanics[i - 2].baseDamage + TRUFO_BASE_DAMAGE_INCREMENT_PER_LEVEL,
            baseProjectileVelocity: TRUFO_BASE_PROJECTILE_VELOCITY,
            baseAttackRange: TRUFO_BASE_ATTACK_RANGE,
            baseAttackTime: TRUFO_BASE_ATTACK_TIME,
            critChance: TRUFO_BASE_CRIT_CHANCE,
            skill: getTrufoBaseSkill(level),
        }

        trufoLevelMechanics.push(currentLevelMechanics)
    }

    // create an instance of Trufo
    const trufoData: Enemy = {
        name: 'Trufo',
        description: 'A small, toxic mushroom that is capable of emitting a toxic cloud from its body.',
        rangeType: RangeType.Melee,
        levelMechanics: trufoLevelMechanics,
    }

    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../mechanics/enemies/trufo.json')
    fs.writeFileSync(outputPath, JSON.stringify(trufoData, null, 4))

    console.log('Trufo JSON file created!')
}

createTrufoData()