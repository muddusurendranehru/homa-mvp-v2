import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const COINS: Record<string, number> = {
  meal: 10,
  walk: 15,
  sleep: 10,
  lab: 50,
  tip: 20,
}

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const { patient_name, phone, tribe, activity_type, description } = await req.json()

    const coins_earned = COINS[activity_type] || 10

    // Save activity
    await sql`
      INSERT INTO patient_activities (patient_name, phone, tribe, activity_type, description, coins_earned)
      VALUES (${patient_name}, ${phone}, ${tribe}, ${activity_type}, ${description}, ${coins_earned})
    `

    // Upsert coins balance
    await sql`
      INSERT INTO patient_coins (phone, patient_name, tribe, total_coins)
      VALUES (${phone}, ${patient_name}, ${tribe}, ${coins_earned})
      ON CONFLICT (phone) DO UPDATE
      SET total_coins = patient_coins.total_coins + ${coins_earned},
          updated_at = NOW()
    `

    // Get updated total
    const result = await sql`
      SELECT total_coins FROM patient_coins WHERE phone = ${phone}
    `
    const total_coins = result[0]?.total_coins || coins_earned

    return NextResponse.json({ success: true, coins_earned, total_coins })
  } catch (error) {
    console.error('Track API error:', error)
    return NextResponse.json({ error: 'Failed to log activity' }, { status: 500 })
  }
}
