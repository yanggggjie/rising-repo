'use server'
export default async function verifyAdmin({
  adminToken,
}: {
  adminToken: string
}) {
  return adminToken === process.env.ADMIN_TOKEN
}
