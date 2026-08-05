const { execSync } = require('child_process');
const fs = require('fs');

try {
  // Get the first commit hash
  const initialCommit = execSync('git rev-list --max-parents=0 HEAD').toString().trim();
  console.log('Initial commit:', initialCommit);

  // Extract the file content
  const content = execSync(`git show ${initialCommit}:www.holy.gg/index.htm`).toString();
  
  // Write it to a temporary file
  fs.writeFileSync('original_holy.htm', content, 'utf8');
  console.log('Successfully recovered original_holy.htm');
} catch (error) {
  console.error('Error:', error.message);
}
