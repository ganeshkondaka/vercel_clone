import { S3 } from "aws-sdk"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

const s3 = new S3({
    accessKeyId: process.env.r2_id,
    secretAccessKey: process.env.r2_key,
    endpoint: process.env.endpoint
})
// console.log("r2_id",process.env.r2_id)
// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const Uploadfile = async (filename: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: filename,
    }).promise();
    // console.log(response)
}