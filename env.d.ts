declare global {
  namespace NodeJS {
    interface ProcessEnv {
    readonly ADMIN_TOKEN: string;
readonly GOOGLE_SERVICE_KEY: string;
readonly KV_REST_API_READ_ONLY_TOKEN: string;
readonly KV_REST_API_TOKEN: string;
readonly KV_REST_API_URL: string;
readonly KV_URL: string;
readonly MY_GITHUB_TOKEN: string;
readonly NX_DAEMON: string;
readonly TURBO_REMOTE_ONLY: string;
readonly TURBO_RUN_SUMMARY: string;
readonly VERCEL: string;
readonly VERCEL_ENV: string;
readonly VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string;
readonly VERCEL_GIT_COMMIT_AUTHOR_NAME: string;
readonly VERCEL_GIT_COMMIT_MESSAGE: string;
readonly VERCEL_GIT_COMMIT_REF: string;
readonly VERCEL_GIT_COMMIT_SHA: string;
readonly VERCEL_GIT_PREVIOUS_SHA: string;
readonly VERCEL_GIT_PROVIDER: string;
readonly VERCEL_GIT_PULL_REQUEST_ID: string;
readonly VERCEL_GIT_REPO_ID: string;
readonly VERCEL_GIT_REPO_OWNER: string;
readonly VERCEL_GIT_REPO_SLUG: string;
readonly VERCEL_URL: string;
     // 其他环境变量...
    }
  }
}
export {}
