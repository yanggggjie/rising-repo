import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.nextUrl.searchParams.get('ADMIN_TOKEN')
    if (process.env.ADMIN_TOKEN === token) {
      return NextResponse.next()
    }
    return NextResponse.rewrite(new URL('/', request.url))
  }
}
