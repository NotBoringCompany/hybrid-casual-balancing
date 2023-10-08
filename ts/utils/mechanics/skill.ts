import { loadSheet } from '../../configs/sheets'
import fs from 'fs'
import path from 'path'
import { SkillLevelRequirement } from '../../models/skill'

/**
 * Creates a new skill level requirement JSON file with the intended mechanics (gathered from Google Sheets).
 */
export const createSkillLevelRequirement = async (): Promise<void> => {
    const skillLevelRequirements = []
    const playerMechanicsSheet = await loadSheet('Account XP and Progression', 'G2:H12')

    for (let i = 2; i < 12; i++) {
        // get the skill level
        const level = playerMechanicsSheet.getCell(i, 6).value as number ?? 0
        // get the minimum player level required
        const minPlayerLevel = playerMechanicsSheet.getCell(i, 7).value as number ?? 0

        const skillLevelRequirement: SkillLevelRequirement = {
            level,
            minPlayerLevel,
        }

        skillLevelRequirements.push(skillLevelRequirement)
    }

    // create the JSON file
    fs.writeFileSync(path.join(__dirname, '../../../mechanics/level-requirements/skillLevelRequirement.json'), JSON.stringify(skillLevelRequirements, null, 4))

    console.log('Skill level requirement JSON file created!')
}


