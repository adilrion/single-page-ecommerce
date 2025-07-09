@echo off
REM E-Commerce Backend API Test Script for Windows
REM This script demonstrates the main API endpoints using PowerShell

set BASE_URL=http://localhost:5000/api
set SESSION_ID=test-session-123

echo 🚀 E-Commerce Backend API Test
echo ==============================
echo.

echo 1. Health Check:
powershell -Command "Invoke-RestMethod -Uri '%BASE_URL%/../health' | ConvertTo-Json"
echo.

echo 2. Get All Products (first 3):
powershell -Command "Invoke-RestMethod -Uri '%BASE_URL%/products?limit=3' | ConvertTo-Json -Depth 10"
echo.

echo 3. Get Featured Products:
powershell -Command "(Invoke-RestMethod -Uri '%BASE_URL%/products/featured').data.Count; ' featured products found'"
echo.

echo 4. Get Electronics Products:
powershell -Command "(Invoke-RestMethod -Uri '%BASE_URL%/products/category/electronics').data.Count; ' electronics products found'"
echo.

echo 5. Get Cart:
powershell -Command "$headers = @{'x-session-id'='%SESSION_ID%'}; Invoke-RestMethod -Uri '%BASE_URL%/cart' -Headers $headers | ConvertTo-Json -Depth 10"
echo.

echo ✅ Basic API Test Complete!
echo.
echo 📚 For complete testing, use:
echo - Postman collection: postman_collection.json
echo - API Documentation: API_DOCUMENTATION.md
echo - README.md for setup instructions
