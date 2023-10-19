import path from 'path'
import fs from 'fs'
import { MiscReward, Quest } from '../../models/quest'
import { ItemVariants } from '../../models/item'
import { AvailableEnemies } from '../../models/enemy'
import { Resource } from '../../models/resource'

/**
 * Creates a bunch of quests and stores it as a JSON file.
 */
const createQuests = (quests: Quest[]): void => {
    // create the JSON file
    const outputPath = path.join(__dirname, '../../../mechanics/quests.json')
    fs.writeFileSync(outputPath, JSON.stringify(quests, null, 4))

    console.log('Quests JSON file created!')
}

createQuests(
    [
        {
            chapter: 1,
            id: 1,
            name: 'The Beginning',
            description: 'Talk to Pfufu',
            type: null,
            completionRewards: {
                coins: 0,
                xp: 10,
                misc: null,
            }
        },
        {
            chapter: 1,
            id: 2,
            name: 'The Beginning',
            description: 'Feed Pfufu 6 Berries',
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.Blueberry,
                        amount: 6,
                    }
                ],
                resourcesRequired: null,
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 0,
                xp: 35,
                misc: null,
            }
        },
        {
            chapter: 1,
            id: 3,
            name: 'The Beginning',
            description: 'Defeat the enemies (2 Trufos, 1 Firefly)',
            type: {
                itemsRequired: null,
                resourcesRequired: null,
                enemiesRequired: [
                    {
                        type: AvailableEnemies.Trufo,
                        amount: 2,
                    },
                    {
                        type: AvailableEnemies.Firefly,
                        amount: 1,
                    }
                ],
            },
            completionRewards: {
                coins: 5,
                xp: 55,
                misc: null,
            }
        },
        {
            chapter: 1,
            id: 4,
            name: 'The Beginning',
            description: 'Feed Pfufu 10 Berries',
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.Blueberry,
                        amount: 10,
                    }
                ],
                resourcesRequired: null,
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 5,
                xp: 45,
                misc: null,
            }
        },
        {
            chapter: 2,
            id: 1,
            name: 'The First Beacon',
            description: 'Reach Beacon 1',
            type: null,
            completionRewards: {
                coins: 0,
                xp: 0,
                misc: null,
            }
        },
        {
            chapter: 2,
            id: 2,
            name: 'The First Beacon',
            description: 'Defeat both Golems and obtain an energy core.',
            type: {
                itemsRequired: null,
                resourcesRequired: null,
                enemiesRequired: [
                    {
                        type: AvailableEnemies.Golem,
                        amount: 2,
                    }
                ],
            },
            completionRewards: {
                coins: 10,
                xp: 100,
                misc: [
                    {
                        type: MiscReward.Skill,
                        name: 'Restorative Touch',
                        level: 1,
                        amount: 0,
                    }
                ],
            }
        },
        {
            chapter: 2,
            id: 3,
            name: 'The First Beacon',
            description: 'Expand Beacon 1 (1/3)',
            // requires 30 wood, 15 stone and 1 energy core
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 1,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 30,
                    },
                    {
                        type: Resource.Stone,
                        amount: 15,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 5,
                xp: 30,
                misc: null,
            }
        },
        {
            chapter: 2,
            id: 4,
            name: 'The First Beacon',
            description: 'Expand Beacon 1 (2/3)',
            // requires 40 wood, 20 stone and 1 energy core
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 1,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 40,
                    },
                    {
                        type: Resource.Stone,
                        amount: 20,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 5,
                xp: 40,
                misc: null,
            }
        },
        {
            chapter: 2,
            id: 5,
            name: 'The First Beacon',
            description: 'Expand Beacon 1 (3/3)',
            // requires 55 wood, 35 stone and 2 energy cores
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 2,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 55,
                    },
                    {
                        type: Resource.Stone,
                        amount: 35,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 10,
                xp: 60,
                misc: null,
            }
        },
        {
            chapter: 3,
            id: 1,
            name: 'Razer: The Storage Collector',
            description: 'Find Razer',
            type: null,
            completionRewards: {
                coins: 0,
                xp: 0,
                misc: null,
            }
        },
        {
            chapter: 3,
            id: 2,
            name: 'Razer: The Storage Collector',
            description: 'Help Razer defeat the enemies around the storage (2 Golems)',
            type: {
                itemsRequired: null,
                resourcesRequired: null,
                enemiesRequired: [
                    {
                        type: AvailableEnemies.Golem,
                        amount: 2,
                    }
                ],
            },
            completionRewards: {
                coins: 5,
                xp: 100,
                misc: null,
            }
        },
        {
            chapter: 3,
            id: 2,
            name: 'Razer: The Storage Collector',
            description: 'Help Razer defeat the enemies around the storage (2 Golems)',
            type: {
                itemsRequired: null,
                resourcesRequired: null,
                enemiesRequired: [
                    {
                        type: AvailableEnemies.Golem,
                        amount: 2,
                    }
                ],
            },
            completionRewards: {
                coins: 5,
                xp: 100,
                misc: null,
            }
        },
        {
            chapter: 3,
            id: 3,
            name: 'Razer: The Storage Collector',
            description: 'Gather resources to rebuild the storage',
            // requires 55 wood and 25 stone
            type: {
                itemsRequired: null,
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 55,
                    },
                    {
                        type: Resource.Stone,
                        amount: 25,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 5,
                xp: 65,
                misc: null,
            }
        },
        {
            chapter: 4,
            id: 1,
            name: 'Beacon 2',
            description: 'Reach Beacon 2',
            // requires 55 wood and 25 stone
            type: null,
            completionRewards: {
                coins: 0,
                xp: 0,
                misc: null,
            }
        },
        {
            chapter: 4,
            id: 1,
            name: 'Beacon 2',
            description: 'Reach Beacon 2',
            // requires 55 wood and 25 stone
            type: null,
            completionRewards: {
                coins: 0,
                xp: 0,
                misc: null,
            }
        },
        {
            chapter: 4,
            id: 2,
            name: 'Beacon 2',
            description: 'Defeat both Golems guarding Beacon 2',
            // 2 golem kills
            type: {
                itemsRequired: null,
                resourcesRequired: null,
                enemiesRequired: [
                    {
                        type: AvailableEnemies.Golem,
                        amount: 2,
                    }
                ],
            },
            completionRewards: {
                coins: 5,
                xp: 90,
                misc: null,
            }
        },
        {
            chapter: 4,
            id: 3,
            name: 'Beacon 2',
            description: 'Gather resources to repair Beacon 2',
            // 45 wood, 25 stone and 2 energy cores
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 2,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 45,
                    },
                    {
                        type: Resource.Stone,
                        amount: 25,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 10,
                xp: 125,
                misc: null,
            }
        },
        {
            chapter: 4,
            id: 4,
            name: 'Beacon 2',
            description: 'Expand Beacon 2 (1/3)',
            // 55 wood, 25 stone, 1 energy core
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 1,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 55,
                    },
                    {
                        type: Resource.Stone,
                        amount: 25,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 5,
                xp: 75,
                misc: null,
            }
        },
        {
            chapter: 4,
            id: 5,
            name: 'Beacon 2',
            description: 'Expand Beacon 2 (2/3)',
            // 65 wood, 35 stone, 1 energy core
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 1,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 65,
                    },
                    {
                        type: Resource.Stone,
                        amount: 35,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 5,
                xp: 75,
                misc: null,
            }
        },
        {
            chapter: 4,
            id: 5,
            name: 'Beacon 2',
            description: 'Expand Beacon 2 (3/3)',
            // 80 wood, 55 stone, 2 energy cores
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 2,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 80,
                    },
                    {
                        type: Resource.Stone,
                        amount: 55,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 10,
                xp: 100,
                misc: null,
            }
        },
        {
            chapter: 5,
            id: 1,
            name: 'The Witch\'s Hut',
            description: 'Reach The Witch\'s Hut',
            type: null,
            completionRewards: {
                coins: 0,
                xp: 0,
                misc: null,
            }
        },
        {
            chapter: 5,
            id: 2,
            name: 'The Witch\'s Hut',
            description: 'Defeat the enemies guarding The Witch\'s Hut (2 Trufos, 3 Fireflies and 2 Golems)',
            type: {
                itemsRequired: null,
                resourcesRequired: null,
                enemiesRequired: [
                    {
                        type: AvailableEnemies.Trufo,
                        amount: 2,
                    },
                    {
                        type: AvailableEnemies.Firefly,
                        amount: 3,
                    },
                    {
                        type: AvailableEnemies.Golem,
                        amount: 2,
                    }
                ],
            },
            completionRewards: {
                coins: 20,
                xp: 225,
                misc: null,
            }
        },
        {
            chapter: 5,
            id: 3,
            name: 'The Witch\'s Hut',
            description: 'Gather resources and repair The Witch\'s Hut',
            // requires 35 wood, 40 stone, 20 coal, 1 energy core and 175 kills
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 1,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 35,
                    },
                    {
                        type: Resource.Stone,
                        amount: 40,
                    },
                    {
                        type: Resource.Coal,
                        amount: 20,
                    },
                ],
                enemiesRequired: null,
                killsRequired: 175,
            },
            completionRewards: {
                coins: 20,
                xp: 225,
                misc: null,
            }
        },
        {
            chapter: 6,
            id: 1,
            name: 'Beacon 3',
            description: 'Reach Beacon 3',
            type: null,
            completionRewards: {
                coins: 0,
                xp: 0,
                misc: null,
            }
        },
        {
            chapter: 6,
            id: 1,
            name: 'Beacon 3',
            description: 'Defeat the enemies guarding Beacon 3 (2 Trufos, 2 Fireflies, 3 Golems)',
            type: {
                itemsRequired: null,
                resourcesRequired: null,
                enemiesRequired: [
                    {
                        type: AvailableEnemies.Trufo,
                        amount: 2,
                    },
                    {
                        type: AvailableEnemies.Firefly,
                        amount: 2,
                    },
                    {
                        type: AvailableEnemies.Golem,
                        amount: 3,
                    }
                ],
            },
            completionRewards: {
                coins: 10,
                xp: 150,
                misc: null,
            }
        },
        {
            chapter: 6,
            id: 2,
            name: 'Beacon 3',
            description: 'Gather resources to repair Beacon 3',
            // requires 55 wood, 45 stone, 25 coal and 2 energy cores
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 2,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 55,
                    },
                    {
                        type: Resource.Stone,
                        amount: 45,
                    },
                    {
                        type: Resource.Coal,
                        amount: 25,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 10,
                xp: 150,
                misc: null,
            }
        },
        {
            chapter: 6,
            id: 2,
            name: 'Beacon 3',
            description: 'Expand Beacon 3 (1/3)',
            // requires 60 wood, 35 stone, 15 coal and 1 energy core
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 1,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 60,
                    },
                    {
                        type: Resource.Stone,
                        amount: 35,
                    },
                    {
                        type: Resource.Coal,
                        amount: 15,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 5,
                xp: 85,
                misc: null,
            }
        },
        {
            chapter: 6,
            id: 3,
            name: 'Beacon 3',
            description: 'Expand Beacon 3 (2/3)',
            // requires 65 wood, 40 stone, 25 coal and 2 energy cores
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 2,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 65,
                    },
                    {
                        type: Resource.Stone,
                        amount: 40,
                    },
                    {
                        type: Resource.Coal,
                        amount: 25,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 5,
                xp: 100,
                misc: null,
            }
        },
        {
            chapter: 6,
            id: 4,
            name: 'Beacon 3',
            description: 'Expand Beacon 3 (3/3)',
            // requires 75 wood, 45 stone, 35 coal and 2 energy cores
            type: {
                itemsRequired: [
                    {
                        type: ItemVariants.EnergyCore,
                        amount: 2,
                    },
                ],
                resourcesRequired: [
                    {
                        type: Resource.Wood,
                        amount: 75,
                    },
                    {
                        type: Resource.Stone,
                        amount: 45,
                    },
                    {
                        type: Resource.Coal,
                        amount: 35,
                    },
                ],
                enemiesRequired: null,
            },
            completionRewards: {
                coins: 10,
                xp: 175,
                misc: null,
            }
        },
    ]
)
