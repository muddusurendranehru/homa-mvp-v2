import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Last 24 hours of activity
    const activities = await sql`
      SELECT
        patient_name,
        phone,
        tribe,
        activity_type,
        description,
        coins_earned,
        created_at
      FROM patient_activities
      WHERE created_at > NOW() - INTERVAL '24 hours'
      ORDER BY created_at DESC
    `

    // All patients with total coins
    const patients = await sql`
      SELECT
        pc.patient_name,
        pc.phone,
        pc.tribe,
        pc.total_coins,
        pc.updated_at,
        MAX(pa.created_at) as last_activity
      FROM patient_coins pc
      LEFT JOIN patient_activities pa ON pa.phone = pc.phone
      GROUP BY pc.patient_name, pc.phone, pc.tribe, pc.total_coins, pc.updated_at
      ORDER BY pc.total_coins DESC
    `

    return NextResponse.json({
      activities,
      patients,
      generated_at: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('Staff API error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
