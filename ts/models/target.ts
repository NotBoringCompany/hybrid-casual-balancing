/**
 * Represents the target mechanics of an attribute.
 */
export interface TargetMechanics {
    // the target type of the attribute
    type: TargetType,
    // the number of targets that can be affected by this attribute
    count: number,
}

/**
 * Lists all current target types.
 */
export enum TargetType {
    // the attribute will target the user and their own team
    Self,
    // the attribute can only target enemies
    Enemy,
    // the attribute targets an area of choice
    Radius,
    // the attribute can target both enemies and allies
    Both,
    // the attribute can target both enemies and allies and targets an area of choice (usually done with AOE skills/weapons)
    BothAndRadius,
}