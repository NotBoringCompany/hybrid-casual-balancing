/**
 * Represents the target mechanics of an attribute.
 */
export interface TargetMechanics {
    // the target type of the attribute
    type: TargetType,
    // the number of targets that can be affected by this attribute
    // note: for radius target types, this will normally be 0, unless there can only be a specific amount of targets
    count: number,
}

/**
 * Lists all current target types.
 */
export enum TargetType {
    // the attribute will target the user and/or their own team
    Self = 'Self',
    // the attribute can only target enemies
    Enemy = 'Enemy',
    // the attribute targets an area of choice
    Radius = 'Radius',
    // the attribute can target both enemies and allies
    Both = 'Both',
    // the attribute can target both enemies and allies and targets an area of choice (usually done with AOE skills/weapons)
    All = 'All',
}