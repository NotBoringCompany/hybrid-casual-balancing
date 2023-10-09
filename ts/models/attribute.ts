
import { StatusEffect } from './statusEffect'
import { TargetMechanics } from './target'

/**
 * Represents an attribute's details.
 * 
 * Attributes represent the characteristics of a skill or weapon.
 * 
 * Note that `Attribute` itself doesn't contain the skill or weapon's level mechanics. This is done separately.
 */
export interface Attribute {
    // the name of the attribute
    name: string,
    // the description of the attribute
    description: string,
    // the types of the attribute (can be multiple)
    types: AttributeType[],
    // the target mechanics of the attribute
    targetMechanics: TargetMechanics,
    // the status effects inflicted by the attribute (if any; can be multiple)
    statusEffects: StatusEffect[],
}

// /**
//  * Represents the fields of an attribute that may change in every level. 
//  * 
//  * Regardless if they change or not, they will be under this interface.
//  */
// export interface AttributeLevelMechanics {
//     // the attribute's level (often in conjunction with the skill or weapon's level)
//     level: number,
//     modifier: number,
//     duration: number,
//     chance: number,
//     radius: number,
// }

/**
 * Lists all current attribute types.
 */
export enum AttributeType {
    // has a fixed amount of damage
    SetDamage = 'Set Damage',
    // deals damage based on own HP
    OwnHPDamage = 'Own HP Damage',
    // deals damage based on enemy's HP
    EnemyHPDamage = 'Enemy HP Damage',
    // deals damage based on own HP
    SetHealing = 'Set Healing',
    // heals based on own HP
    HPHealing = 'HP Healing',
    // deals a status effect
    // the difference between `StatusEffect` and other types is that any attribute that has a duration more than 0 will be considered a status effect
    StatusEffect = 'Status Effect',
}