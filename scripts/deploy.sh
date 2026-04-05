#!/bin/bash
set -e
if [ -f .env.local ]; then export $(grep -v '^#' .env.local | grep -v '^\s*$' | xargs); fi
BUCKET="${DEPLOY_BUCKET:-dopamine-studio-events}"
SLUG="${EVENT_SLUG:-my-event}"
if [ ! -d "out" ]; then echo "Fehler: 'out' Ordner nicht gefunden. Zuerst 'npm run build' ausfuehren."; exit 1; fi
echo "Uploading to gs://$BUCKET/$SLUG/ ..."
gsutil -m rsync -r -d out/ "gs://$BUCKET/$SLUG/"
gsutil -m setmeta -h "Cache-Control:public, max-age=300" "gs://$BUCKET/$SLUG/**.html" 2>/dev/null || true
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, immutable" "gs://$BUCKET/$SLUG/_next/**" 2>/dev/null || true
echo ""
echo "========================================="
echo "  Deine Seite ist live!"
echo "  URL: https://storage.googleapis.com/$BUCKET/$SLUG/index.html"
echo "========================================="
