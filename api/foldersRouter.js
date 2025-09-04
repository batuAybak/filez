import { addFile } from '#db/files'
import { allFolders, getFolderById } from '#db/folders'
import express from 'express'
const foldersRouter = express.Router()
export default foldersRouter

foldersRouter.route('/').get(async (req, res) => {
    const allTheFolders = await allFolders()
    res.send(allTheFolders)
})

// Reusable id validation method
foldersRouter.param('id', async (req, res, next, id) => {
    const folderById = await getFolderById(id)
    if (!folderById) return res.status(404).send('Folder not exists')
    req.folderById = folderById
    next()
})

foldersRouter.route('/:id').get(async (req, res) => {
    res.send(req.folderById)
})

foldersRouter.route('/:id/files').post(async (req, res) => {
    try {
        const { name, size } = req.body //name and size from the body
        const id = req.folderById.id //this came from foldersRouter.param
        if (!req.body || !name || !size) return res.status(400).send('Missing body or fields')
        const addedFile = await addFile(name, size, id)
        res.status(201).send(addedFile)
    } catch (error) {
        return res.status(400).send(`${error}`);

    }
})