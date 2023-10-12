import { ResourceCost } from './resource'

/**
 * Represents the cost required to upgrade either a skill or a weapon.
 */
export interface UpgradeCost {
    // the amount of coins required
    coins: number,
    // the amount of energy cores required
    energyCores: number,
    // the amount of resources required
    resources: ResourceCost[],
}