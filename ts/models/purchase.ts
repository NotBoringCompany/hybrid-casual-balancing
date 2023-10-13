import { ResourceCost } from "./resource";

/**
 * Represents the cost required to purchase either a skill or a weapon.
 */
export interface PurchaseCost {
    // the amount of coins required
    coins: number;
    // the amount of energy cores required
    energyCores: number;
    // the amount of resources required
    resources: ResourceCost[];
}
