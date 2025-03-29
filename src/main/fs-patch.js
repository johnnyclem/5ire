// This file must be JavaScript, not TypeScript
// It must be required as the very first thing in the application
// before any other modules are loaded

// Patch the fs module before anything else loads
const fs = require('fs');
const originalReadFileSync = fs.readFileSync;

// Override the readFileSync method to handle our problematic test file
fs.readFileSync = function(filePath, options) {
  try {
    // Handle the specific problematic test file
    if (String(filePath).includes('05-versions-space.pdf')) {
      console.log('[FS-PATCH] Intercepted test file:', String(filePath));
      return Buffer.from('MOCK PDF CONTENT');
    }
    // For all other files, use the original method
    return originalReadFileSync(filePath, options);
  } catch (error) {
    // If the file is not found and it's in the test directory, return a mock buffer
    if (error.code === 'ENOENT' && String(filePath).includes('test/data')) {
      console.log('[FS-PATCH] Missing test file intercepted:', String(filePath));
      return Buffer.from('MOCK PDF CONTENT');
    }
    // For all other errors, re-throw
    throw error;
  }
};

// Log that the patch has been applied
console.log('[FS-PATCH] fs.readFileSync successfully patched'); 