#!/bin/bash

# E-Commerce Backend API Test Script
# This script demonstrates the main API endpoints

BASE_URL="http://localhost:5000/api"
SESSION_ID="test-session-123"

echo "🚀 E-Commerce Backend API Test"
echo "=============================="
echo ""

# Health Check
echo "1. Health Check:"
curl -s $BASE_URL/../health | jq .
echo ""

# Get All Products
echo "2. Get All Products:"
curl -s "$BASE_URL/products?limit=3" | jq .
echo ""

# Get Featured Products
echo "3. Get Featured Products:"
curl -s "$BASE_URL/products/featured" | jq '.data | length'
echo " featured products found"
echo ""

# Get Products by Category
echo "4. Get Electronics Products:"
curl -s "$BASE_URL/products/category/electronics" | jq '.data | length'
echo " electronics products found"
echo ""

# Search Products
echo "5. Search Products (phone):"
curl -s "$BASE_URL/products/search?q=phone" | jq '.data | length'
echo " products found matching 'phone'"
echo ""

# Get Cart (will create a new cart)
echo "6. Get/Create Cart:"
CART_RESPONSE=$(curl -s -H "x-session-id: $SESSION_ID" "$BASE_URL/cart")
echo $CART_RESPONSE | jq .
CART_ID=$(echo $CART_RESPONSE | jq -r '.data.id')
echo ""

# Get a product ID for cart operations
PRODUCT_ID=$(curl -s "$BASE_URL/products/featured" | jq -r '.data[0]._id')
echo "Using Product ID: $PRODUCT_ID"
echo ""

# Add to Cart
echo "7. Add Product to Cart:"
curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "x-session-id: $SESSION_ID" \
  -d "{\"productId\":\"$PRODUCT_ID\",\"quantity\":2}" \
  "$BASE_URL/cart/add" | jq .
echo ""

# Get Updated Cart
echo "8. Get Updated Cart:"
curl -s -H "x-session-id: $SESSION_ID" "$BASE_URL/cart" | jq .
echo ""

# Create Order
echo "9. Create Order:"
ORDER_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "{
    \"customerInfo\": {
      \"name\": \"John Doe\",
      \"email\": \"john@example.com\",
      \"address\": \"123 Main St, City, Country\"
    },
    \"cartId\": \"$CART_ID\"
  }" \
  "$BASE_URL/orders")
echo $ORDER_RESPONSE | jq .
ORDER_ID=$(echo $ORDER_RESPONSE | jq -r '.data.id')
echo ""

# Get Order
echo "10. Get Created Order:"
curl -s "$BASE_URL/orders/$ORDER_ID" | jq .
echo ""

echo "✅ API Test Complete!"
echo ""
echo "📚 For more details, check:"
echo "- README.md"
echo "- API_DOCUMENTATION.md"
echo "- postman_collection.json"
