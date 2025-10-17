import { create } from '@storacha/client'

export async function uploadFile(file) {
  const client = await create()
  await client.login('your@email.com')
  const cid = await client.uploadFile(file)
  console.log('✅ Stored at:', cid.toString())
  return cid
}
