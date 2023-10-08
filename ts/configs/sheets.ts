import * as dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

dotenv.config({ path: path.join(__dirname, '../../.env') })

/** the requested scopes for JWT auth  */
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
]

/** create a JWT instance to authenticate into google sheets */
const jwt = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL ?? '',
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
    scopes: SCOPES,
})

/** the sheet ID used to calculate all gameplay mechanics */
const balancingSheet = process.env.GAME_BALANCING_SHEET ?? ''
/** create a document instance of `balancingSheet` */
const balancingDoc: GoogleSpreadsheet = new GoogleSpreadsheet(balancingSheet, jwt)

/**
 * Loads a sheet from the document with a specific cell range.
 * 
 * If a cell range is not specified, the entire sheet will be loaded.
 * 
 * NOTE: title MUST be exactly the same (case sensitive) as the sheet title in the document.
 * @param title the title of the sheet to load
 * @returns a GoogleSpreadsheetWorksheet instance
 */
export const loadSheet = async (title: string, cellRange: string): Promise<GoogleSpreadsheetWorksheet> => {
    await balancingDoc.loadInfo()

    const sheet = balancingDoc.sheetsByTitle[title]
    await sheet.loadCells(cellRange ?? {})

    return sheet
}