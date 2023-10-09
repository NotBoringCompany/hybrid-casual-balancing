import path from 'path'
import fs from 'fs'
import { Attribute, AttributeType } from '../../models/attribute'
import { RangeType } from '../../models/range'
import { StatusEffect } from '../../models/statusEffect'
import { TargetMechanics, TargetType } from '../../models/target'

/**
 * Creates an attribute and stores it as a JSON file.
 */
const createAttributes = (attributes: Attribute[]): void => {
    // create the JSON file
    const outputPath = path.join(__dirname, '../../../mechanics/attributes.json')
    fs.writeFileSync(outputPath, JSON.stringify(attributes, null, 4))

    console.log('Attributes JSON file created!')
}