import { ISummaryRank } from '@/components/Summary'
import { fetchChatCompletion } from '@/lib/getSummary/fetchChatCompletion'

export async function getSummary(summaryRankList: ISummaryRank[]) {
  const prompt = `${JSON.stringify(summaryRankList)}

  以上是昨日的github仓库新增star数据，根据以上数据，输出200字的中文总结
  `
  const WITH_LOCAL_DATA = process.env.WITH_LOCAL_DATA
  if (WITH_LOCAL_DATA === 'true') {
    return `昨日的GitHub仓库新增star数据显示，Python和TypeScript是最受欢迎的编程语言，其中ChatTTS和yolov10是新增stars最多的仓库。除了编程语言之外，还有一些仓库的语言未知。值得注意的是，一些自动点击器和机器学习项目也受到了相当大的关注。此外，一些破解软件和自动化工具的仓库也受到了一定程度的关注。总体而言，昨日的GitHub活动涵盖了多个领域，展示了开发者们对技术和创新的持续热情。`
  }
  return fetchChatCompletion(prompt)
}
