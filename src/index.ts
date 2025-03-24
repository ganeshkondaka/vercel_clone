import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./random_func";
import path from "path";
import { getAllFiles } from "./file";
import { Uploadfile } from "./aws";
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

// Uploadfile('ganesh/testing/package.json','D:/mine_/code_files_@@/cohort_codes/myproject_incohort/vercel/dist/src/output/ketay/frontend/package.json')

app.get('/', (req, res) => {
    res.json({
        msg: "get req"
    })
})

app.post('/deploy', async (req, res) => {
    const repoUrl = req.body.repoUrl;
    // console.log('repoUrl is :', repoUrl)
    const id = generate()
    
    const normalizedDirname = __dirname.replace(/\\/g, '/');// replace all \ with /

    await simpleGit().clone(repoUrl, path.join(normalizedDirname, `output/${id}/`)) // so the running code is actually the code in dis folder so this path is referred to dist folder only , so from now the repos are stored in dist/output/id

    const files = getAllFiles(path.join(normalizedDirname, `output/${id}/frontend`)) // still the path are in backward slash . 
    
    files.map((item)=>{
        item.replace(/\\/g, '/')
    })
    // console.log("__dirname :", __dirname)
    // console.log("__dirname replaced :", normalizedDirname)
    // console.log('files are :', files)

    files.forEach(async file => {
        Uploadfile(file.slice(normalizedDirname.length + 1), file)
    })

    res.json({
        id: id
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})