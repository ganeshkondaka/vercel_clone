import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./random_func";
import path from "path";
import { getAllFiles } from "./file";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: "get req"
    })
})

app.post('/deploy', async (req, res) => {
    const repoUrl = req.body.repoUrl;
    console.log('repoUrl is :', repoUrl)
    const id = generate()
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`)) // so the running code is actually the code in dis folder so this path is referred to dist folder only , so from now the repos are stored in dist/output/id

    const files = getAllFiles(path.join(__dirname, `output/${id}`))
    // console.log('files are :', files)

    res.json({
        id: id
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})