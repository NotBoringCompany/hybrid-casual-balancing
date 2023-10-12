import path from 'path'
import fs from 'fs'
import { EnemySkill, SkillModifierType } from '../../../models/skill'
import { Attribute } from '../../../models/attribute'
import { Enemy, EnemyLevelMechanics, KillRewards } from '../../../models/enemy'
import { RangeType } from '../../../models/range'
import { MAX_ENEMY_LEVEL } from './enemy'

// firefly's base HP at level 1
const FIREFLY_BASE_HP = 70
// firefly's base HP regen at level 1
const FIREFLY_BASE_HP_REGEN = 0.21
// firefly's base movement speed per level is constant
const FIREFLY_BASE_MOVEMENT_SPEED = 145
// firefly's base damage at level 1
const FIREFLY_BASE_DAMAGE = 12
// firefly's base projectile velocity is constant
const FIREFLY_BASE_PROJECTILE_VELOCITY = 600
// firefly's base attack range is constant
const FIREFLY_BASE_ATTACK_RANGE = 575
// firefly's base attack time is constant
const FIREFLY_BASE_ATTACK_TIME = 1.4
// firefly's base crit chance is constant
const FIREFLY_BASE_CRIT_CHANCE = 0.075

// firefly's increase in base HP per level
const FIREFLY_BASE_HP_INCREMENT_PER_LEVEL = 12
// firefly's base hp regen multiplier * base hp = base hp regen
const FIREFLY_BASE_HP_REGEN_MULTIPLIER = 0.003
// firefly's increase in base damage per level
const FIREFLY_BASE_DAMAGE_INCREMENT_PER_LEVEL = 4.5

/**
 * Gets Firefly's base skill and return an EnemySkill instance.
 * 
 * Because all enemies currently have the same skill data for any level, no other fields apart from `level` changes.
 */
const getFireflyBaseSkill = (level: number): EnemySkill => {
    // get the `attributes.json` file
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../../mechanics/attributes.json')).toString('utf-8')
    const attributes = JSON.parse(inputPath) as Attribute[]

    // find `Blinding Light` and return it as an Attribute instance
    const blindingLight: Attribute = attributes.filter((attribute: Attribute) => attribute.name === 'Blinding Light').pop()

    // return the base skill
    return {
        attributes: [blindingLight],
        addDescription: 'Emits a blinding light from Firefly\'s body that deals HP-based damage to enemies around a radius',
        levelMechanics: [
            {
                level: level,
                duration: 5,
                modifier: {
                    type: SkillModifierType.Percentage,
                    value: 50,
                },
                chance: 0.1,
                radius: 0,
            }
        ]
    }
}

/**
 * Gets Firefly's kill rewards for this level and return a DefeatRewards instance.
 */
const getFireflyKillRewards = (level: number): KillRewards => {
    const coins = Math.floor((level / 1.75) + 3)
    const xp = Math.floor((level * 2.2) + 5)

    return {
        coins,
        xp
    }
}

/**
 * Creates the base stats for Firefly.
 */
const fireflyBaseStats: EnemyLevelMechanics = {
    level: 1,
    baseHp: FIREFLY_BASE_HP,
    baseHpRegen: FIREFLY_BASE_HP_REGEN,
    baseMovementSpeed: FIREFLY_BASE_MOVEMENT_SPEED,
    baseDamage: FIREFLY_BASE_DAMAGE,
    baseProjectileVelocity: FIREFLY_BASE_PROJECTILE_VELOCITY,
    baseAttackRange: FIREFLY_BASE_ATTACK_RANGE,
    baseAttackTime: FIREFLY_BASE_ATTACK_TIME,
    critChance: FIREFLY_BASE_CRIT_CHANCE,
    skill: getFireflyBaseSkill(1),
    killRewards: getFireflyKillRewards(1),
}

/**
 * Creates Firefly's data for all levels and stores it as a JSON file.
 */
const createFireflyData = (): void => {
    const fireflyLevelMechanics: EnemyLevelMechanics[] = [fireflyBaseStats]

    for (let i = 2; i <= MAX_ENEMY_LEVEL; i++) {
        // take the previous level's base HP and add the increment
        const baseHp = fireflyLevelMechanics[i - 2].baseHp + FIREFLY_BASE_HP_INCREMENT_PER_LEVEL
        // multiply the base HP by the multiplier to get the base HP regen
        const baseHpRegen = parseFloat((baseHp * FIREFLY_BASE_HP_REGEN_MULTIPLIER).toFixed(2))
        // take the previous level's base damage and add the increment
        const baseDamage = fireflyLevelMechanics[i - 2].baseDamage + FIREFLY_BASE_DAMAGE_INCREMENT_PER_LEVEL

        const currentLevelMechanics: EnemyLevelMechanics = {
            level: i,
            baseHp,
            baseHpRegen,
            baseMovementSpeed: FIREFLY_BASE_MOVEMENT_SPEED,
            baseDamage,
            baseProjectileVelocity: FIREFLY_BASE_PROJECTILE_VELOCITY,
            baseAttackRange: FIREFLY_BASE_ATTACK_RANGE,
            baseAttackTime: FIREFLY_BASE_ATTACK_TIME,
            critChance: FIREFLY_BASE_CRIT_CHANCE,
            skill: getFireflyBaseSkill(i),
            killRewards: getFireflyKillRewards(i),
        }

        fireflyLevelMechanics.push(currentLevelMechanics)
    }

    // create an instance of Firefly
    const firefly: Enemy = {
        name: 'Firefly',
        description: 'A cute beetle-like insect whose body emits a blinding light when threatened.',
        rangeType: RangeType.Ranged,
        levelMechanics: fireflyLevelMechanics,
    }

    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../mechanics/enemies/firefly.json')
    fs.writeFileSync(outputPath, JSON.stringify(firefly, null, 4))

    console.log('Firefly JSON file created!')
}

createFireflyData()