import { loadSheet } from '../../../configs/sheets'
import fs from 'fs'
import path from 'path'
import { WeaponLevelRequirement } from '../../../models/weapon'

/**
 * Creates a new weapon level requirement JSON file with the intended mechanics (gathered from Google Sheets).
 */
export const createWeaponLevelRequirement = async (): Promise<void> => {
    const weaponLevelRequirements: WeaponLevelRequirement[] = []

    try {
        const playerMechanicsSheet = await loadSheet('Account XP and Progression', 'J2:K52')

        for (let i = 2; i < 52; i++) {
            const level = playerMechanicsSheet.getCell(i, 9).value as number ?? 0
            const minPlayerLevelRequired = playerMechanicsSheet.getCell(i, 10).value as number ?? 0

            weaponLevelRequirements.push({ level, minPlayerLevelRequired });
        }

        // create the JSON file
        const outputPath = path.join(__dirname, '../../../mechanics/level-requirements/weaponLevelRequirement.json')
        fs.writeFileSync(outputPath, JSON.stringify(weaponLevelRequirements, null, 4))

        console.log('Weapon level requirement JSON file created!')
    } catch (err) {
        console.error('Error creating weapon level requirement JSON file:', err)
    }
}

/**
 * Gets the maximum weapon level allowed for the player at a certain level.
 * @param level the player's level
 * @returns the maximum weapon level allowed for the player at a certain level
 */
export const getMaxWeaponLevel = (level: number): number => {
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../mechanics/level-requirements/weaponLevelRequirement.json')).toString('utf-8')
    const weaponLevelRequirement = JSON.parse(inputPath) as WeaponLevelRequirement[]

    return weaponLevelRequirement.filter((requirement: WeaponLevelRequirement) => requirement.minPlayerLevelRequired <= level).pop()?.level
}