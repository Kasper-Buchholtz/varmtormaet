import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  ;(await draftMode()).enable() // Don't use await here
  return NextResponse.redirect(new URL('/', request.url))
}
