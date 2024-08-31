import { ISummaryRank } from '@/components/Summary'
import { fetchChatCompletion } from '@/lib/getSummary/fetchChatCompletion'
import { isWithLocalData } from '@/lib/util'

export async function getSummary(summaryRankList: ISummaryRank[]) {
  const prompt = `${JSON.stringify(summaryRankList)}

  以上是昨日的github仓库新增star数据，根据以上数据，输出200字的中文总结
  `
  if (isWithLocalData()) {
    return `昨日 GitHub 上新增 star 数量较多的仓库主要集中在人工智能和机器学习领域。例如，ChatTTS 是一个用于日常对话的生成语音模型，获得了 3600 个新增 star，遥遥领先于其他项目。YOLOv10 是一个实时端到端目标检测系统，新增 star 数量为 681。llama-fs 是一个自组织文件系统，新增 star 为 654。其他受欢迎的项目还包括 fabric，一个用于增强人类能力的开源框架，新增 star 为 647。总的来看，AI 相关的项目依然是 GitHub 上的热点，其他如金融机器学习、图像处理和文件系统等领域的项目也受到了关注。此外，一些工具类和框架类的项目，如提供 GitHub 仪表盘的 gh-dash 和 Go 语言框架 goravel 也获得了不少的 star。`
  }
  return fetchChatCompletion(prompt)
}
