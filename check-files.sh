#!/bin/sh
echo "=== EASYPANEL FILE CHECK ==="
echo "Working directory: $(pwd)"
echo "Files in current directory:"
ls -la

echo ""
echo "=== DOCKERFILE CHECK ==="
if [ -f "Dockerfile" ]; then
    echo "✅ Dockerfile found"
    echo "First line: $(head -n1 Dockerfile)"
    echo "Size: $(wc -c < Dockerfile) bytes"
else
    echo "❌ Dockerfile NOT found"
fi

echo ""
echo "=== DOCKER COMPOSE FILES ==="
for file in docker-compose*.yml; do
    if [ -f "$file" ]; then
        echo "✅ $file found"
    fi
done

echo ""
echo "=== PACKAGE.JSON CHECK ==="
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json NOT found"
fi

echo ""
echo "=== END CHECK ==="