import db from './client.js'

/**
 * 
 * @param {*} name 
 * @returns added file
 */
export async function addFile(name, size, folderId) {
    const sql = `
    INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3) RETURNING *
    `
    const { rows: [addedFile] } = await db.query(sql, [name, size, folderId])
    return addedFile
}

/**
 * 
 * @param {*} name 
 * @returns all files wih folder name
 */
export async function allFiles() {
    const sql = `
    SELECT files.*, folders.name as folder_name
    FROM files
    INNER JOIN folders ON folders.id = files.folder_id;
    `
    const { rows: allFilesWithFolderName } = await db.query(sql)
    return allFilesWithFolderName
}