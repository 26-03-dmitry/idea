const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const indexPath = path.join(outDir, 'index.html');
const defaultLocale = 'ru'; // Or 'en', 'ka'

const redirectContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-g">
  <meta http-equiv="refresh" content="0; url=./${defaultLocale}/index.html">
  <title>Redirecting...</title>
</head>
<body>
  <p>If you are not redirected automatically, follow this <a href="./${defaultLocale}/index.html">link</a>.</p>
</body>
</html>
`;

fs.writeFileSync(indexPath, redirectContent);

console.log(`✅ Created redirect file for GitHub Pages in ${indexPath}`); 