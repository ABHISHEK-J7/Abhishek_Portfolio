#!/bin/bash

echo "🚀 Preparing for Netlify deployment..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf build

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output directory: build/"
    echo ""
    echo "🌐 To deploy to Netlify:"
    echo "   1. Go to netlify.com and sign in"
    echo "   2. Drag and drop the 'build' folder to deploy"
    echo "   3. Or connect your Git repository for automatic deployments"
    echo ""
    echo "📋 Build contents:"
    ls -la build/
else
    echo "❌ Build failed!"
    exit 1
fi
