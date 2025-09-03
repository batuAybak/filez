import db from './client.js'

/**
 * 
 * @param {*} name 
 * @returns added folder id
 */
export default async function addFolder(name) {
    const sql = `
    INSERT INTO folders (name) VALUES($1) RETURNING id
    `
    const { rows: [addedFolderId] } = await db.query(sql, [name])
    return addedFolderId.id
}
