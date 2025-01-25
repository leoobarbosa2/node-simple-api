import fsPromisses from 'node:fs/promises'
import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./data.csv', import.meta.url)
const jsonPath = new URL('./csv-db.json', import.meta.url)

const csvReadStream = fs.createReadStream(csvPath)

const csvParser = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2
})

async function importer() {
    const contentList = []
    const linesParse = csvReadStream.pipe(csvParser)

    for await (const line of linesParse) {
        const [key, value] = line
        const object = { [key]: value}
        contentList.push(object)

        fsPromisses.writeFile(jsonPath, JSON.stringify(contentList))
    }
    
}


importer()