/**
 * Lists all currently available resources.
 */
export enum Resource {
    Wood = 'Wood',
    Stone = 'Stone',
    Coal = 'Coal',
}

/**
 * Represents the resources required to upgrade a skill or weapon.
 */
export interface ResourceCost {
    // the resource type
    type: Resource,
    // the amount of resources required
    amount: number,
}

/**
 * Represents a quest's resources required.
 */
export interface ResourcesRequired {
    // the resource type
    type: Resource,
    // the amount of resources required
    amount: number,
}