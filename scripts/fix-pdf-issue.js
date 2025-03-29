#!/usr/bin/env node

/**
 * This script fixes the issue with the missing test PDF file
 * by creating the test directory and an empty PDF file.
 */

const fs = require('fs');
const path = require('path');

// Get the project root directory
const projectRoot = process.cwd();
const testDir = path.join(projectRoot, 'test', 'data');
const testFile = path.join(testDir, '05-versions-space.pdf');

console.log('Fixing PDF file issue...');
console.log(`Project root: ${projectRoot}`);
console.log(`Test directory: ${testDir}`);
console.log(`Test file: ${testFile}`);

// Create the test directory if it doesn't exist
if (!fs.existsSync(testDir)) {
  console.log(`Creating directory: ${testDir}`);
  fs.mkdirSync(testDir, { recursive: true });
}

// Create the test file if it doesn't exist
if (!fs.existsSync(testFile)) {
  console.log(`Creating file: ${testFile}`);
  fs.writeFileSync(testFile, 'MOCK PDF CONTENT');
}

console.log('Fix complete! The test file now exists.'); 