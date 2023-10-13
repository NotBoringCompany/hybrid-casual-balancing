import { loadSheet } from '../../../configs/sheets'
import fs from 'fs'
import path from 'path'
import { SkillLevelRequirement } from '../../../models/skill'

// max upgradable level for any skill
export const MAX_SKILL_LEVEL = 10

/**
 * Creates a new skill level requirement JSON file with the intended mechanics (gathered from Google Sheets).
 */
export const createSkillLevelRequirement = async (): Promise<void> => {
    const skillLevelRequirements: SkillLevelRequirement[] = []

    try {
        const playerMechanicsSheet = await loadSheet('Account XP and Progression', 'G2:H12')

        for (let i = 2; i < 12; i++) {
            // get the skill level
            const level = playerMechanicsSheet.getCell(i, 6).value as number ?? 0
            // get the minimum player level required
            const minPlayerLevelRequired = playerMechanicsSheet.getCell(i, 7).value as number ?? 0
    
            skillLevelRequirements.push({ level, minPlayerLevelRequired });
        }
    
        // create the JSON file
        const outputPath = path.join(__dirname, '../../../mechanics/level-requirements/skillLevelRequirement.json')
        fs.writeFileSync(outputPath, JSON.stringify(skillLevelRequirements, null, 4))
    
        console.log('Skill level requirement JSON file created!')
    } catch (err) {
        console.error('Error creating skill level requirement JSON file:', err)
    }
}

/**
 * Gets the maximum skill level allowed for the player at a certain level.
 * @param level the player's level
 * @returns the maximum skill level allowed for the player at a certain level
 */
export const getMaxSkillLevel = (level: number): number => {
    const inputPath = fs.readFileSync(path.join(__dirname, '../../../mechanics/level-requirements/skillLevelRequirement.json')).toString('utf-8')
    const skillLevelRequirement = JSON.parse(inputPath) as SkillLevelRequirement[]

    return skillLevelRequirement.filter((requirement: SkillLevelRequirement) => requirement.minPlayerLevelRequired <= level).pop()?.level
}


