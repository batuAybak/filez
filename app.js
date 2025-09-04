import express from "express";
const app = express();
export default app;


app.use(express.json()) //body-parsing middleware

app.get('/', (req, res) => {
    res.send('Thiz iz the Filez')
})

import filesRouter from "#api/filesRouter";
app.use('/files', filesRouter)

import foldersRouter from "#api/foldersRouter";
app.use('/folders', foldersRouter)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('SomeZing Went Wrong')
})