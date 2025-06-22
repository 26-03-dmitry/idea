const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const file404 = path.join(outDir, '404.html');

// This content for 404.html is a common pattern for SPAs on GitHub Pages.
// It captures the path from the URL and uses it to redirect.
const content404 = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Single Page Apps for GitHub Pages</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      // This script checks if a redirect is present in the query string,
      // converts it back into the correct url and adds it to the browser's history.
      var segmentCount = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>`;

const indexContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Single Page Apps for GitHub Pages</title>
    <script type="text/javascript">
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      // This script reads the query string and converts it back into the correct url.
      var l = window.location;
      var p = l.search.slice(1).split('&').filter(function(s) { return s.startsWith('p=') })[0];
      if (p) {
        var q = l.search.slice(1).split('&').filter(function(s) { return s.startsWith('q=') })[0];
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + (p.slice(2).replace(/~and~/g, '&')) +
          (q ? '?' + q.slice(2).replace(/~and~/g, '&') : '') +
          l.hash
        );
      }
    </script>
  </head>
  <body>
    <!-- This page is specifically designed to handle the SPA routing on GitHub Pages.
         The content of the page is rendered by Next.js. -->
  </body>
</html>`;

try {
    fs.writeFileSync(file404, content404);
    console.log(`✅ Created 404.html for SPA routing.`);
    
    // We also need to modify the main index.html to include the redirect logic.
    // However, since Next.js generates index.html for each language, we will let
    // the 404.html handle all routing logic. The main index.html will be the 
    // one generated for the default locale ('ru' in this case).
    // The old script was overwriting it, which was incorrect.
    
    // Deleting the old, incorrect script to avoid confusion.
    const oldScriptPath = path.join(__dirname, 'gh-pages-redirect.js');
    if (fs.existsSync(oldScriptPath)) {
        fs.unlinkSync(oldScriptPath);
        console.log(`✅ Deleted old script: ${oldScriptPath}`);
    }

} catch (error) {
    console.error('❌ Error during post-build script execution:', error);
    process.exit(1);
}
