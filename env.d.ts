declare global {
  namespace NodeJS {
    interface ProcessEnv {
    readonly CLIENT_SECRET: string;
readonly NEXT_PUBLIC_CLIENT_ID: string;
     // 其他环境变量...
    }
  }
}
export {}
