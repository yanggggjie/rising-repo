declare global {
  namespace NodeJS {
    interface ProcessEnv {
    readonly MY_GITHUB_TOKEN: string;
readonly READ_WRITE_RISING_REPO: string;
     // 其他环境变量...
    }
  }
}
export {}
