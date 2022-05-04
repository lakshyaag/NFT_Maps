import { NFTStorage, File } from "nft.storage";
import fs from 'fs'
import path from 'path'
import mime from 'mime'

const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYyZmM5YzY3NmVCRGI2NUE2ZDRjMjc0M0VkMzJDMkFGNjAyOUZmQjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MTY1ODgxNjk5NywibmFtZSI6Im1hcE5GVCJ9.ts2AITK2bHsEmisaImBIdHM_hU99isVgocbngBokx0s"


async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

async function main() {

    const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    const files = []
    for (var i = 1; i <= 52; i++) {
        const file_path = `utils/data/${i}.json`
        files.push(await fileFromPath(file_path))
    }
    const cid = await nftStorage.storeDirectory(files)

    console.log(files)
}

main()