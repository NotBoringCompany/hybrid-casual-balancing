import { AvailableEnemies, EnemiesRequired, Enemy } from './enemy'
import { ItemsRequired } from './item'
import { ResourcesRequired } from './resource'

export interface Quest {
    // the quest's chapter
    chapter: number,
    // the quest ID
    id: number,
    // the quest name
    name: string
    // the quest description
    description: string
    // the type of quest
    type: QuestType
    // completion rewards
    completionRewards: QuestCompletionRewards
}

/**
 * Represents a quest's type.
 * 
 * If at any time QuestType is called but is null, it usually means the quest is just to reach an area.
 */
export interface QuestType {
    // the resources required to be obtained
    resourcesRequired: ResourcesRequired[],
    // the items required to be obtained
    itemsRequired: ItemsRequired[],
    // enemies required to be defeated
    enemiesRequired: EnemiesRequired[],
    // the amount of kills the player needs to have
    killsRequired?: number,
}


/**
 * Represents a quest's completion rewards.
 */
export interface QuestCompletionRewards {
    coins: number
    xp: number
    misc: QuestCompletionRewardMisc[]
}

/**
 * Represents a quest's miscellaneous completion rewards.
 */
export interface QuestCompletionRewardMisc {
    // the reward type
    type: MiscReward
    // the reward name (if reward isn't quantitative)
    name: string
    // the reward's level (if skill or weapon)
    level: number
    // the reward amount
    amount: number
}

/**
 * Lists all miscellaneous quest rewards.
 */
export enum MiscReward {
    Skill = 'Skill',
    Wood = 'Wood',
    Stone = 'Stone',
    Coal = 'Coal',
    EnergyCores = 'Energy Cores',
    Weapon = 'Weapon'
}