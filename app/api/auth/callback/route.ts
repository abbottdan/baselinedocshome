import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { isReservedSubdomain } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=no_code`)
  }

  try {
    // Exchange code for session
    const { data: { session }, error: authError } = await supabaseAdmin.auth.exchangeCodeForSession(code)

    if (authError || !session) {
      console.error('OAuth exchange error:', authError)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=auth_failed`)
    }

    const { user } = session

    // Return HTML page that reads sessionStorage and completes signup
    // This is necessary because sessionStorage is only available in browser
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Completing signup...</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(to bottom, #eff6ff, #ffffff);
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    .spinner {
      border: 4px solid #e5e7eb;
      border-top: 4px solid #2563eb;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    h1 { color: #1f2937; margin-bottom: 0.5rem; }
    p { color: #6b7280; }
    .error {
      background: #fee2e2;
      border: 1px solid #ef4444;
      color: #991b1b;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="spinner"></div>
    <h1>Creating your account...</h1>
    <p>Please wait while we set up your workspace.</p>
    <div id="error" class="error" style="display: none;"></div>
  </div>
  
  <script>
    async function completeSignup() {
      try {
        // Get signup data from sessionStorage
        const signupDataStr = sessionStorage.getItem('signup_data');
        
        if (!signupDataStr) {
          throw new Error('Signup data not found. Please try again.');
        }
        
        const signupData = JSON.parse(signupDataStr);
        
        // Validate data age (should be recent)
        const age = Date.now() - signupData.timestamp;
        if (age > 10 * 60 * 1000) { // 10 minutes
          throw new Error('Signup session expired. Please try again.');
        }
        
        // Complete signup on server
        const response = await fetch('/api/complete-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: '${user.id}',
            email: '${user.email}',
            fullName: '${user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}',
            companyName: signupData.companyName,
            subdomain: signupData.subdomain,
          }),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Signup failed');
        }
        
        // Clear signup data
        sessionStorage.removeItem('signup_data');
        
        // Redirect to success page
        window.location.href = '${process.env.NEXT_PUBLIC_SITE_URL}/signup/success?subdomain=' + signupData.subdomain;
        
      } catch (error) {
        console.error('Signup completion error:', error);
        document.getElementById('error').textContent = error.message;
        document.getElementById('error').style.display = 'block';
        
        setTimeout(() => {
          window.location.href = '${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=' + encodeURIComponent(error.message);
        }, 3000);
      }
    }
    
    completeSignup();
  </script>
</body>
</html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })

  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=unexpected`)
  }
}
