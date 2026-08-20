import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    const res = await axios.post(
      `${BACKEND_URL}/submit-lead`,
      formData,
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}

// GET endpoint - forward to backend
export async function GET() {
  try {
    const res = await axios.get(`${BACKEND_URL}/submit-lead`, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}
