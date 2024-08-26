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

//
const __summaryRankListExample = [
  {
    repoName: '2noise/ChatTTS',
    addedStars: 3600,
    language: 'Jupyter',
  },
  {
    repoName: 'THU-MIG/yolov10',
    addedStars: 681,
    language: 'Python',
  },
  {
    repoName: 'iyaja/llama-fs',
    addedStars: 654,
    language: 'Jupyter',
  },
  {
    repoName: 'danielmiessler/fabric',
    addedStars: 647,
    language: 'Python',
  },
  {
    repoName: 'codecrafters-io/build-your-own-x',
    addedStars: 492,
    language: null,
  },
  {
    repoName: 'TMElyralab/MusePose',
    addedStars: 307,
    language: 'Python',
  },
  {
    repoName: 'firmai/financial-machine-learning',
    addedStars: 307,
    language: 'Python',
  },
  {
    repoName: 'GaiaNet-AI/gaianet-node',
    addedStars: 251,
    language: 'Shell',
  },
  {
    repoName: 'ollama/ollama',
    addedStars: 250,
    language: 'Go',
  },
  {
    repoName: 'binhnguyennus/awesome-scalability',
    addedStars: 241,
    language: null,
  },
  {
    repoName: 'dlvhdr/gh-dash',
    addedStars: 239,
    language: 'Go',
  },
  {
    repoName: 'rossmoody/svg-gobbler',
    addedStars: 235,
    language: 'TypeScript',
  },
  {
    repoName: 'khoj-ai/khoj',
    addedStars: 221,
    language: 'Python',
  },
  {
    repoName: 'langgenius/dify',
    addedStars: 221,
    language: 'Python',
  },
  {
    repoName: 'jianchang512/ChatTTS-ui',
    addedStars: 221,
    language: 'Python',
  },
  {
    repoName: 'ToonCrafter/ToonCrafter',
    addedStars: 216,
    language: 'Python',
  },
  {
    repoName: 'goravel/goravel',
    addedStars: 209,
    language: 'Go',
  },
  {
    repoName: 'ChrisBuilds/terminaltexteffects',
    addedStars: 204,
    language: 'Python',
  },
  {
    repoName: 'VikParuchuri/surya',
    addedStars: 179,
    language: 'Python',
  },
  {
    repoName: 'es3n1n/no-defender',
    addedStars: 177,
    language: 'C++',
  },
  {
    repoName: 'auchenberg/volkswagen',
    addedStars: 177,
    language: 'JavaScript',
  },
  {
    repoName: 'magicuidesign/magicui',
    addedStars: 176,
    language: 'TypeScript',
  },
  {
    repoName: 'neondatabase/neon',
    addedStars: 173,
    language: 'Rust',
  },
  {
    repoName: 'Diatessaron/finder',
    addedStars: 171,
    language: 'Go',
  },
  {
    repoName: 'pengHTYX/Era3D',
    addedStars: 167,
    language: 'Python',
  },
  {
    repoName: 'sindresorhus/awesome',
    addedStars: 166,
    language: null,
  },
  {
    repoName: 'digital-go-jp/design-system-example-components',
    addedStars: 163,
    language: 'TypeScript',
  },
  {
    repoName: 'karpathy/llm.c',
    addedStars: 163,
    language: 'Cuda',
  },
  {
    repoName: 'it-ebooks-0/geektime-books',
    addedStars: 161,
    language: null,
  },
  {
    repoName: 'tencent-ailab/V-Express',
    addedStars: 161,
    language: 'Python',
  },
  {
    repoName: 'open-webui/open-webui',
    addedStars: 158,
    language: 'Svelte',
  },
  {
    repoName: '0x2E/fusion',
    addedStars: 154,
    language: 'Svelte',
  },
  {
    repoName: 'didi/xiaoju-survey',
    addedStars: 151,
    language: 'TypeScript',
  },
  {
    repoName: 'ToolJet/ToolJet',
    addedStars: 146,
    language: 'JavaScript',
  },
  {
    repoName: 'massgravel/Microsoft-Activation-Scripts',
    addedStars: 145,
    language: 'Batchfile',
  },
  {
    repoName: 'practical-tutorials/project-based-learning',
    addedStars: 143,
    language: null,
  },
  {
    repoName: 'ragapp/ragapp',
    addedStars: 141,
    language: 'TypeScript',
  },
  {
    repoName: 'awesome-selfhosted/awesome-selfhosted',
    addedStars: 139,
    language: null,
  },
  {
    repoName: 'i838847058/Crypto-Wallet-Cracker',
    addedStars: 137,
    language: 'JavaScript',
  },
  {
    repoName: 'naklecha/llama3-from-scratch',
    addedStars: 134,
    language: 'Jupyter',
  },
  {
    repoName: 'SR-09/Hamster-Kombat-AutoClicker',
    addedStars: 134,
    language: 'JavaScript',
  },
  {
    repoName: 'notactuallyavia/FL-Studio-activation',
    addedStars: 134,
    language: 'JavaScript',
  },
  {
    repoName: 'MystoganSync/AutoFarmCatizen',
    addedStars: 134,
    language: 'Assembly',
  },
  {
    repoName: 'alber-khan/PET-SIMULATOR-99-dupe',
    addedStars: 134,
    language: 'Dockerfile',
  },
  {
    repoName: 'Gaplaster3600/Nezur-v3.5',
    addedStars: 133,
    language: 'Python',
  },
  {
    repoName: 'Arbihfx/axie-infinity-bot',
    addedStars: 133,
    language: 'JavaScript',
  },
  {
    repoName: 'karitboon01/ESET-NOD32-Antivirus-Crack',
    addedStars: 133,
    language: null,
  },
  {
    repoName: 'caddyserver/caddy',
    addedStars: 133,
    language: 'Go',
  },
  {
    repoName: 'karitboon01/bestFORTNITEhk',
    addedStars: 133,
    language: null,
  },
  {
    repoName: 'zuhdi-in/Adobe-Illustrator-activation',
    addedStars: 132,
    language: null,
  },
  {
    repoName: 'webdev-narayan/axie-infinity-bot',
    addedStars: 132,
    language: 'JavaScript',
  },
  {
    repoName: 'MeawOS/gta5-cheat',
    addedStars: 132,
    language: 'Shell',
  },
  {
    repoName: 'donnemartin/system-design-primer',
    addedStars: 129,
    language: 'Python',
  },
  {
    repoName: 'wandb/openui',
    addedStars: 129,
    language: 'HTML',
  },
  {
    repoName: 'tonycarranza/Chain-Game-auto-bot',
    addedStars: 129,
    language: 'HTML',
  },
  {
    repoName: 'lovenashte/Yescoin-auto-bot',
    addedStars: 128,
    language: 'C++',
  },
  {
    repoName: 'Victor-Wallace/Blum-auto-bot',
    addedStars: 126,
    language: 'JavaScript',
  },
  {
    repoName: 'kenjiCrypto/Catizen-Auto-bot',
    addedStars: 126,
    language: 'HTML',
  },
  {
    repoName: 'kamranahmedse/developer-roadmap',
    addedStars: 126,
    language: 'TypeScript',
  },
  {
    repoName: 'vinujahansindu/Hamster-kombat-auto-bot',
    addedStars: 125,
    language: 'Kotlin',
  },
  {
    repoName: 'PostHog/posthog',
    addedStars: 125,
    language: 'Python',
  },
  {
    repoName: 'Catizenn/Catizen-Auto-bot',
    addedStars: 125,
    language: null,
  },
  {
    repoName: 'Aymanesj/MemeFi-AutoClicker',
    addedStars: 124,
    language: null,
  },
  {
    repoName: 'RobloxAvatar/Catizen-Auto-bot',
    addedStars: 123,
    language: 'Lua',
  },
  {
    repoName: 'MEHDIHRAIRI/Blum-auto-bot',
    addedStars: 123,
    language: 'JavaScript',
  },
  {
    repoName: 'lepelegrini/Hamster-kombat-auto-bot',
    addedStars: 122,
    language: 'C#',
  },
  {
    repoName: 'novitalabs/AnimateAnyone',
    addedStars: 121,
    language: 'Python',
  },
  {
    repoName: 'bpc-clone/bypass-paywalls-chrome-clean',
    addedStars: 121,
    language: null,
  },
  {
    repoName: 'vinta/awesome-python',
    addedStars: 121,
    language: 'Python',
  },
  {
    repoName: 'selterr/Catizen-AutoClicker',
    addedStars: 119,
    language: null,
  },
  {
    repoName: 'jwasham/coding-interview-university',
    addedStars: 119,
    language: null,
  },
  {
    repoName: 'dunglas/frankenphp',
    addedStars: 117,
    language: 'Go',
  },
  {
    repoName: 'EbookFoundation/free-programming-books',
    addedStars: 116,
    language: null,
  },
  {
    repoName: 'tteck/Proxmox',
    addedStars: 116,
    language: 'Shell',
  },
  {
    repoName: 'AI4Finance-Foundation/FinRobot',
    addedStars: 115,
    language: 'Jupyter',
  },
  {
    repoName: 'malvuln/RansomLord',
    addedStars: 114,
    language: null,
  },
  {
    repoName: 'truefoundry/cognita',
    addedStars: 113,
    language: 'Python',
  },
  {
    repoName: 'janhq/jan',
    addedStars: 112,
    language: 'TypeScript',
  },
  {
    repoName: 'abi/screenshot-to-code',
    addedStars: 112,
    language: 'TypeScript',
  },
  {
    repoName: 'CopilotKit/CopilotKit',
    addedStars: 112,
    language: 'TypeScript',
  },
  {
    repoName: 'Karimdz58/WORMFARE-AUTO-BOT',
    addedStars: 111,
    language: null,
  },
  {
    repoName: 'goauthentik/authentik',
    addedStars: 111,
    language: 'Python',
  },
  {
    repoName: 'OpenBMB/MiniCPM-V',
    addedStars: 110,
    language: 'Python',
  },
  {
    repoName: 'moroaa11/Dotcoin-auto-bot',
    addedStars: 108,
    language: null,
  },
  {
    repoName: 'viktormyy/Apollo-Mining',
    addedStars: 108,
    language: null,
  },
  {
    repoName: 'yoavbls/pretty-ts-errors',
    addedStars: 108,
    language: 'TypeScript',
  },
  {
    repoName: 'quickwit-oss/tantivy',
    addedStars: 108,
    language: 'Rust',
  },
  {
    repoName: 'LzhDreamcc/Blum-AutoClicker',
    addedStars: 108,
    language: null,
  },
  {
    repoName: 'hiyouga/LLaMA-Factory',
    addedStars: 108,
    language: 'Python',
  },
  {
    repoName: 'qq981527683/Hamster-Kombat-AutoClicker',
    addedStars: 107,
    language: 'C++',
  },
  {
    repoName: 'HigherOrderCO/Bend',
    addedStars: 106,
    language: 'Rust',
  },
  {
    repoName: 'clash-verge-rev/clash-verge-rev',
    addedStars: 106,
    language: 'TypeScript',
  },
  {
    repoName: 'NationalSecurityAgency/ghidra',
    addedStars: 105,
    language: 'Java',
  },
  {
    repoName: 'vladmandic/automatic',
    addedStars: 104,
    language: 'Python',
  },
  {
    repoName: 'trimstray/the-book-of-secret-knowledge',
    addedStars: 104,
    language: null,
  },
  {
    repoName: 'RUC-NLPIR/FlashRAG',
    addedStars: 104,
    language: 'Python',
  },
  {
    repoName: 'KauaFreitas01/DiscordAquatic',
    addedStars: 101,
    language: 'Vue',
  },
  {
    repoName: 'langchain-ai/langchain',
    addedStars: 101,
    language: 'Python',
  },
  {
    repoName: 'AIsouler/GKD_subscription',
    addedStars: 98,
    language: 'TypeScript',
  },
  {
    repoName: 'rustdesk/rustdesk',
    addedStars: 98,
    language: 'Rust',
  },
]
