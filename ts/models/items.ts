
/**
 * Lists all available items.
 */
export enum ItemVariants {
    Blueberry = 'Blueberry',
    EnergyCore = 'Energy Core',
}

/**
 * Represents a quest's items required.
 */
export interface ItemsRequired {
    // the item type
    type: ItemVariants,
    // the amount of items required
    amount: number,
}