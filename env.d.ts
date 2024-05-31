declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly GOOGLE_SERVICE_KEY: string
      readonly MY_GITHUB_TOKEN: string
      readonly WITH_LOCAL_DATA: string
    }
  }
}
export {}
