#!/bin/bash

echo "🔍 ClinRoute Login Diagnostics"
echo "================================"
echo ""

echo "1. Checking if client is running..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Client is running on http://localhost:3000"
else
    echo "❌ Client is NOT running"
fi
echo ""

echo "2. Checking if server is running..."
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ Server is running on http://localhost:5000"
else
    echo "❌ Server is NOT running"
fi
echo ""

echo "3. Checking Supabase configuration..."
cd /home/yashraj/Documents/Project/ClinRoute/client
if grep -q "REACT_APP_SUPABASE_URL" .env; then
    echo "✅ Supabase URL configured"
else
    echo "❌ Supabase URL missing"
fi

if grep -q "REACT_APP_SUPABASE_ANON_KEY" .env; then
    echo "✅ Supabase Anon Key configured"
else
    echo "❌ Supabase Anon Key missing"
fi
echo ""

echo "4. Test Supabase Connection..."
SUPABASE_URL=$(grep REACT_APP_SUPABASE_URL .env | cut -d '=' -f 2)
if [ ! -z "$SUPABASE_URL" ]; then
    if curl -s -I "$SUPABASE_URL" | grep -q "200\|301\|302"; then
        echo "✅ Supabase URL is accessible"
    else
        echo "⚠️  Cannot reach Supabase URL (check your internet or firewall)"
    fi
fi
echo ""

echo "================================"
echo "Next Steps:"
echo "1. Open your browser to: http://localhost:3000/login"
echo "2. Open browser DevTools (F12) and go to Console tab"
echo "3. Try to log in and watch for console messages"
echo "4. Look for messages starting with 'AuthContext login called:' and 'Login successful:'"
echo ""
echo "Common issues:"
echo "- If you see 'Invalid login credentials' - user doesn't exist in Supabase"
echo "- If page just refreshes - check browser console for JavaScript errors"
echo "- If navigation fails - there may be a React Router issue"
