'use server'

import getARepo from '@/server-actions/getARepo'

export async function testAction() {
  console.log('test action start')
  console.log('env', process.env.MY_GITHUB_TOKEN)

  const res = await getARepo({
    repoName: 'yanggggjie/rising-repo',
  })
  console.log('test action end')
  console.log('res', res)
}
