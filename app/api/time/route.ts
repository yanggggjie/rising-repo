import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const time = await fetch('https://quan.suning.com/getSysTime.do', {
    next: {
      revalidate: 1000,
    },
  })
  const json = await time.json()

  console.log('time', json)

  return NextResponse.json({
    time: json,
  })
}
