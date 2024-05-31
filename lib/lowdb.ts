import { JSONFilePreset } from 'lowdb/node'
import { IRankItemWithRepoInfo } from '@/lib/getRank/getRank'
import fs from 'node:fs'

interface IDBData {
  repoInfoList: IRankItemWithRepoInfo[]
}

const DB_FILE_PATH = 'db.json'
export async function getDB() {
  const db = await JSONFilePreset<IDBData>(DB_FILE_PATH, { repoInfoList: [] })
  if (!fs.existsSync(DB_FILE_PATH)) {
    console.log('not exists')
    await db.write()
  }
  return db
}
