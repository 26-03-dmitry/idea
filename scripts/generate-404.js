const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const file404 = path.join(outDir, '404.html');

// A simpler 404.html for SPA routing on GitHub Pages.
// It saves the target URL to sessionStorage and redirects to the app's base path.
const content404 = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // Save the complete URL the user tried to access.
      sessionStorage.redirect = location.href;
    </script>
    <!-- Redirect to the base of the app. -->
    <meta http-equiv="refresh" content="0;URL='/idea/'"></meta>
  </head>
  <body>
    <p>If you are not redirected, <a href="/idea/">click here</a>.</p>
  </body>
</html>`;

try {
    fs.writeFileSync(file404, content404);
    console.log(`✅ Created SPA redirect-aware 404.html.`);

    // The old script is no longer needed.
    const oldScriptPath = path.join(__dirname, 'gh-pages-redirect.js');
    if (fs.existsSync(oldScriptPath)) {
        fs.unlinkSync(oldScriptPath);
        console.log(`✅ Deleted old script: ${oldScriptPath}`);
    }

} catch (error) {
    console.error('❌ Error during post-build script execution:', error);
    process.exit(1);
}
