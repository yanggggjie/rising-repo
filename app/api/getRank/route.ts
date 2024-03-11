import getRankList from '@/app/api/getRank/getRankList'
import getRank from '@/app/api/getRank/getRank'

export async function GET() {
  const res = await getRank()
  return Response.json(res)
}
