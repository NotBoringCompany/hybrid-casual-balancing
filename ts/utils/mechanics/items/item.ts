import path from 'path'
import fs from 'fs' 
import { Item, ItemType } from '../../../models/item'

/**
 * Creates an item and stores it as a JSON file.
 */
const createItems = (items: Item[]): void => {
    // create the JSON file
    const outputPath = path.join(__dirname, '../../../../mechanics/items.json')
    fs.writeFileSync(outputPath, JSON.stringify(items, null, 4))

    console.log('Items JSON file created!')
}