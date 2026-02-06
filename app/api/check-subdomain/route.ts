import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { isReservedSubdomain } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { subdomain } = await request.json()

    if (!subdomain || typeof subdomain !== 'string') {
      return NextResponse.json(
        { available: false, message: 'Subdomain is required' },
        { status: 400 }
      )
    }

    // Check if reserved
    if (isReservedSubdomain(subdomain)) {
      return NextResponse.json({
        available: false,
        message: 'This subdomain is reserved'
      })
    }

    // Check if taken
    const { data, error } = await supabaseAdmin
      .from('tenants')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = not found, which is good
      console.error('Subdomain check error:', error)
      return NextResponse.json(
        { available: false, message: 'Error checking subdomain' },
        { status: 500 }
      )
    }

    const available = !data

    return NextResponse.json({
      available,
      message: available ? 'Subdomain is available' : 'Subdomain is already taken'
    })
  } catch (error) {
    console.error('Subdomain check error:', error)
    return NextResponse.json(
      { available: false, message: 'Error checking subdomain' },
      { status: 500 }
    )
  }
}
