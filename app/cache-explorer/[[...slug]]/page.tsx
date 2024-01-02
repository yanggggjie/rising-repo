// src/app/cache-explorer/[[...slug]]/page.tsx

import { mountCacheExplorer } from 'next-cache-explorer'

export const dynamic = 'force-dynamic'

export default mountCacheExplorer()
