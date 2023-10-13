/**
 * Lists all possible status effects.
 */
export enum StatusEffect {
    // poisons the enemy and deals damage over time
    Toxic = 'Toxic',
    // burns the enemy and deals damage over time
    Burn = 'Burn',
    // bleeds the enemy and deals damage over time
    Bleed = 'Bleed',
    // stuns the enemy, preventing them from moving
    Stun = 'Stun',
    // blinds the enemy, reducing their accuracy
    Blind = 'Blind',
    // gives resistance to any kind of attack (weapon or skill)
    Resilience = 'Resilience',
    // none
    None = 'None',
}