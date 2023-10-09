import { RangeType } from './range';
import { StatusEffect } from './statusEffect';
import { TargetMechanics } from './target';

/**
 * Represents an attribute's details.
 * 
 * Attributes represent the characteristics of a skill or weapon.
 */
export interface Attribute {
    // the name of the attribute
    name: string,
    // the description of the attribute
    description: string,
    // the type of the attribute
    type: AttributeType,
    // the range type of the attribute
    rangeType: RangeType,
    // the target mechanics of the attribute
    targetMechanics: TargetMechanics,
    // only if status effect is present in `type`
    statusEffect?: StatusEffect,
    // the modifier of the attribute. this is usually the damage/healing amount
    modifier: number,
    // the duration of the attribute in seconds
    duration: number,
    // the chance that this attribute plays out/gets invoked
    chance: number,
    // the radius of the attribute (usually an AOE if radius > 0)
    radius: number,
}

/**
 * Lists all current attribute types.
 */
export enum AttributeType {
    // has a fixed amount of damage
    SetDamage,
    // deals damage based on own HP
    OwnHPDamage,
    // deals damage based on enemy's HP
    EnemyHPDamage,
    // deals damage based on own HP
    SetHealing,
    // heals based on own HP
    HPHealing,
    // deals a status effect
    StatusEffect,
}