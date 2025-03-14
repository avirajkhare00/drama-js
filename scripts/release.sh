#!/bin/bash

# Script to help with releasing new versions of drama-js
# Usage: ./scripts/release.sh <version>
# Example: ./scripts/release.sh 1.0.1

set -e

if [ $# -ne 1 ]; then
  echo "Usage: $0 <version>"
  echo "Example: $0 1.0.1"
  exit 1
fi

VERSION=$1

# Validate version format (should be semver)
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z-]+)?(\+[0-9A-Za-z-]+)?$ ]]; then
  echo "Error: Version should follow semver format (e.g., 1.0.0, 1.0.1-beta)"
  exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
  echo "Error: Working directory is not clean. Please commit or stash your changes."
  exit 1
fi

# Check if version is already set in package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

if [ "$CURRENT_VERSION" = "$VERSION" ]; then
  echo "Version $VERSION is already set in package.json"
  echo "Continuing with release process..."
else
  # Update version in package.json
  npm version $VERSION --no-git-tag-version
fi

# Update changelog if it exists
if [ -f CHANGELOG.md ]; then
  DATE=$(date +%Y-%m-%d)
  sed -i.bak "s/## \[Unreleased\]/## [Unreleased]\n\n## [$VERSION] - $DATE/" CHANGELOG.md
  rm CHANGELOG.md.bak
fi

# Commit the version change
git add package.json package-lock.json
if [ -f CHANGELOG.md ]; then
  git add CHANGELOG.md
fi

git commit -m "chore: release v$VERSION"

# Create tag
git tag -a "v$VERSION" -m "Release v$VERSION"

echo "Version v$VERSION prepared."
echo ""
echo "Next steps:"
echo "1. Review the changes: git show"
echo "2. Push the commit: git push origin main"
echo "3. Push the tag to trigger release: git push origin v$VERSION"
