import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const projectUrl = searchParams.get('url')

  try {
    const response = await fetch(
      `https://dashbord-admin-tool.vercel.app/api/getContacts?url=${projectUrl}`,
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from external API' },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
