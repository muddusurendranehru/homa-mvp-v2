import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const phone = req.nextUrl.searchParams.get('phone')

    if (!phone) return NextResponse.json({ error: 'Phone required' }, { status: 400 })

    // Only non-sensitive columns: no phone, no free-text descriptions.
    const coins = await sql`
      SELECT patient_name, tribe, total_coins FROM patient_coins WHERE phone = ${phone}
    `
    const activities = await sql`
      SELECT id, activity_type, coins_earned, created_at FROM patient_activities WHERE phone = ${phone}
      ORDER BY created_at DESC LIMIT 20
    `

    if (coins.length === 0) {
      return NextResponse.json({ error: 'No record found for this number' }, { status: 404 })
    }

    return NextResponse.json({
      // First name only, so typing someone else's number doesn't reveal their full name.
      patient_name: String(coins[0].patient_name || '').trim().split(/\s+/)[0],
      tribe: coins[0].tribe,
      total_coins: coins[0].total_coins,
      activities,
    })
  } catch (error) {
    console.error('MyCoins API error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
