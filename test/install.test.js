const { execSync } = require('child_process');

test('npm install succeeds', () => {
  expect(() => execSync('npm install', { stdio: 'ignore' })).not.toThrow();
});
