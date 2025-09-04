import db from './client.js'

/**
 * 
 * @param {*} name 
 * @returns added folder id
 */
export async function addFolder(name) {
    const sql = `
    INSERT INTO folders (name) VALUES($1) RETURNING id
    `
    const { rows: [addedFolderId] } = await db.query(sql, [name])
    return addedFolderId.id
}

export async function allFolders() {
    const sql = `SELECT * FROM folders`
    const { rows: allFolders } = await db.query(sql)
    return allFolders
}

export async function getFolderById(id) {
    const sql = `
    SELECT 
        *,
        (
            SELECT json_agg(files)
            FROM files
            WHERE files.folder_id = folders.id
        ) as files
    FROM folders 
    WHERE id = $1
    `
    const { rows: [folderById] } = await db.query(sql, [id])
    return folderById
}
