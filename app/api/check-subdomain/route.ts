import { NextRequest, NextResponse } from 'next/server'
import { platformAdmin } from '@/lib/supabase'
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

    if (isReservedSubdomain(subdomain)) {
      return NextResponse.json({
        available: false,
        message: 'This subdomain is reserved'
      })
    }

    // Check platform.tenants (subdomain registry lives here)
    const { data, error } = await platformAdmin
      .schema('platform')
      .from('tenants')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .single()

    if (error && error.code !== 'PGRST116') {
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
