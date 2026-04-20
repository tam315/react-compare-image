#!/usr/bin/env node
import { readFileSync } from 'node:fs'

// This test ensures no unnecessary dependencies are bundled into the built output
// like `react/jsx-runtime` or `react/jsx-dev-runtime`.
// https://github.com/tam315/react-compare-image/issues/153

const DIST_FILE = 'dist/ReactCompareImage.mjs'

let content
try {
  content = readFileSync(DIST_FILE, 'utf-8')
} catch {
  console.error(`ERROR: ${DIST_FILE} not found. Run "npm run build" first.`)
  process.exit(1)
}

const FORBIDDEN = ['react.transitional.element', 'react.element']

for (const symbol of FORBIDDEN) {
  if (content.includes(symbol)) {
    console.error(`FAIL: "${symbol}" found in ${DIST_FILE}`)
    process.exit(1)
  }
}

console.log(`PASS: No forbidden React symbol strings found in ${DIST_FILE}`)
