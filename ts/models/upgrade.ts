/**
 * Represents the cost of upgrading a weapon/skill.
 */
export interface UpgradeCost {
    // the currency type of the upgrade cost.
    // can be multiple
    type: UpgradeCostType[],
    // the value of the upgrade cost
    // note: if type is multiple, this value will be an array of the same length as type and each number corresponds to the value of the type at the same index
    value: number[],
}

/**
 * Lists all possible currencies to spend for upgrading.
 */
export enum UpgradeCostType {
    Coins,
    EnergyCores,
    Wood,
    Stone,
    Coal
}