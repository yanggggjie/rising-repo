declare global {
  namespace NodeJS {
    interface ProcessEnv {
    readonly MY_GITHUB_TOKEN: string;
     // 其他环境变量...
    }
  }
}
export {}
