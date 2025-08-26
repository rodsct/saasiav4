#!/bin/bash
# Deployment Verification Script

echo "🔍 Verifying deployment files..."

# Check if Dockerfile exists
if [ -f "Dockerfile" ]; then
    echo "✅ Dockerfile exists"
    echo "📄 First 3 lines of Dockerfile:"
    head -3 Dockerfile
else
    echo "❌ Dockerfile NOT found"
    exit 1
fi

# Check docker-compose files
if [ -f "docker-compose.yml" ]; then
    echo "✅ docker-compose.yml exists"
else
    echo "❌ docker-compose.yml NOT found"
fi

# Check if override file exists (should NOT)
if [ -f "docker-compose.override.yml" ]; then
    echo "⚠️  docker-compose.override.yml exists (this might cause issues)"
else
    echo "✅ docker-compose.override.yml does not exist (good)"
fi

# Check package.json
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json NOT found"
fi

echo ""
echo "📂 Current directory files:"
ls -la | grep -E "(Dockerfile|docker-compose|package\.json)"

echo ""
echo "🏷️  Latest commit:"
git log --oneline -1

echo ""
echo "🔧 Docker build test (syntax only):"
docker build --dry-run . 2>/dev/null && echo "✅ Dockerfile syntax OK" || echo "❌ Dockerfile has issues"

echo ""
echo "✨ Verification complete!"