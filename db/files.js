import db from './client.js'

/**
 * 
 * @param {*} name 
 * @returns added file
 */
export default async function addFile(name, size, folderId) {
    const sql = `
    INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3) RETURNING *
    `
    const { rows: addedFile } = await db.query(sql, [name, size, folderId])
    return addedFile
}