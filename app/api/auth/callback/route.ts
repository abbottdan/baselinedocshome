import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { isReservedSubdomain } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.baselinedocs.com'

  if (!code) {
    console.error('[Callback] No code provided')
    return NextResponse.redirect(`${baseUrl}/signup?error=no_code`)
  }

  try {
    console.log('[Callback] Exchanging code for session')
    
    // Exchange code for session
    const { data: { session }, error: authError } = await supabaseAdmin.auth.exchangeCodeForSession(code)

    if (authError || !session) {
      console.error('[Callback] OAuth exchange error:', authError)
      return NextResponse.redirect(`${baseUrl}/signup?error=auth_failed`)
    }

    const { user } = session
    console.log('[Callback] User authenticated:', user.email)

    // Return HTML page that reads sessionStorage and completes signup
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Completing signup...</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
      max-width: 500px;
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
    h1 { 
      color: #1f2937; 
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
    p { 
      color: #6b7280; 
      line-height: 1.5;
    }
    .error {
      background: #fee2e2;
      border: 1px solid #ef4444;
      color: #991b1b;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      display: none;
    }
    .debug {
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      text-align: left;
      font-size: 0.75rem;
      font-family: monospace;
      max-height: 200px;
      overflow-y: auto;
      display: none;
    }
    .debug-line {
      margin-bottom: 0.25rem;
      color: #374151;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="spinner"></div>
    <h1>Creating your account...</h1>
    <p>Please wait while we set up your workspace.</p>
    <div id="error" class="error"></div>
    <div id="debug" class="debug"></div>
  </div>
  
  <script>
    const debug = [];
    const debugEl = document.getElementById('debug');
    
    function log(message) {
      console.log('[Callback]', message);
      debug.push(new Date().toISOString() + ': ' + message);
      debugEl.innerHTML = debug.map(d => '<div class="debug-line">' + d + '</div>').join('');
      debugEl.style.display = 'block';
    }
    
    async function completeSignup() {
      try {
        log('Starting signup completion');
        
        // Get signup data from sessionStorage
        const signupDataStr = sessionStorage.getItem('signup_data');
        log('Signup data from storage: ' + (signupDataStr ? 'FOUND' : 'NOT FOUND'));
        
        if (!signupDataStr) {
          throw new Error('Signup data not found. Please try signing up again.');
        }
        
        const signupData = JSON.parse(signupDataStr);
        log('Parsed signup data: company=' + signupData.companyName + ', subdomain=' + signupData.subdomain);
        
        // Validate data age (should be recent)
        const age = Date.now() - signupData.timestamp;
        log('Data age: ' + Math.floor(age / 1000) + ' seconds');
        
        if (age > 10 * 60 * 1000) { // 10 minutes
          throw new Error('Signup session expired. Please try again.');
        }
        
        log('Calling complete-signup API');
        
        // Complete signup on server
        const response = await fetch('${baseUrl}/api/complete-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: '${user.id}',
            email: '${user.email}',
            fullName: '${user.user_metadata?.full_name?.replace(/'/g, "\\'") || user.email?.split('@')[0] || 'User'}',
            companyName: signupData.companyName,
            subdomain: signupData.subdomain,
          }),
        });
        
        log('API response status: ' + response.status);
        
        const result = await response.json();
        log('API response: ' + JSON.stringify(result));
        
        if (!response.ok) {
          throw new Error(result.error || 'Signup failed');
        }
        
        // Clear signup data
        log('Clearing signup data');
        sessionStorage.removeItem('signup_data');
        
        // Redirect to success page
        log('Redirecting to success page');
        window.location.href = '${baseUrl}/signup/success?subdomain=' + signupData.subdomain;
        
      } catch (error) {
        log('ERROR: ' + error.message);
        console.error('Signup completion error:', error);
        document.getElementById('error').textContent = error.message;
        document.getElementById('error').style.display = 'block';
        
        setTimeout(() => {
          log('Redirecting to signup page');
          window.location.href = '${baseUrl}/signup?error=' + encodeURIComponent(error.message);
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

  } catch (error: any) {
    console.error('[Callback] Unexpected error:', error)
    return NextResponse.redirect(`${baseUrl}/signup?error=unexpected`)
  }
}
