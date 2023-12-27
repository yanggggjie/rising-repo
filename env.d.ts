// environment.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_CLIENT_ID: string;
    readonly NEXT_PUBLIC_CLIENT_SECRET: string;
    // 其他环境变量...
  }
}
