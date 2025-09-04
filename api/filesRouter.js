import { allFiles } from '#db/files'
import express from 'express'
const filesRouter = express.Router()
export default filesRouter


filesRouter.route('/')
    .get(async (req, res) => {
        const allFilesWithFolderName = await allFiles()
        res.send(allFilesWithFolderName)
    })