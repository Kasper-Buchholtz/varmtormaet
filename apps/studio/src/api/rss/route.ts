import { NextResponse } from 'next/server'
import fetch from 'node-fetch'
import { parseStringPromise } from 'xml2js'

// Helper function to extract image URL from description
function extractImageUrl(description) {
  const regex = /<img[^>]+src="([^">]+)"/
  const match = regex.exec(description)
  return match ? match[1] : null
}

export async function GET(req) {
  try {
    const response = await fetch('https://superego.nu/feed')
    const text = await response.text()

    if (text.startsWith('<!DOCTYPE html>')) {
      return NextResponse.json({ message: 'The response is HTML, not XML.' }, { status: 500 })
    }

    const result = await parseStringPromise(text)

    // Extract the last three posts
    const items = result.rss.channel[0].item.slice(0, 3)

    // Map the relevant data (title, category, and image) from the last three posts
    const posts = items.map((item) => ({
      title: item.title[0],
      category: item.category ? item.category[0] : 'No category',
      image: extractImageUrl(item.description[0]),
      link: item.link[0],
    }))

    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.error('Error fetching or parsing:', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
