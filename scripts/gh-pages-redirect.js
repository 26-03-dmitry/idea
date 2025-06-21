const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const indexPath = path.join(outDir, 'index.html');

// A simple HTML file with a script to redirect.
// This is often more reliable than a meta refresh tag.
const redirectContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <script>
        // Redirect to the default locale, preserving any hash.
        window.location.replace('./ru' + window.location.hash);
    </script>
</head>
<body>
    <p>If you are not redirected, <a href="./ru">click here</a>.</p>
</body>
</html>
`;

try {
    fs.writeFileSync(indexPath, redirectContent);
    console.log(`✅ Created JS redirect file for GitHub Pages in ${indexPath}`);
} catch (error) {
    console.error('❌ Error creating redirect file:', error);
    process.exit(1);
} 