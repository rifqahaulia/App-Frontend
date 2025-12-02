#!/bin/bash

echo "🚀 Setting up project..."

# Install dependencies
pnpm install

# Generate Nuxt types
pnpm nuxt prepare

echo "✅ Setup complete!"
echo "Run 'pnpm dev' to start development server"
