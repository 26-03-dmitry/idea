const fs = require('fs');
const path = require('path');

// Путь к папке 'out'
const outDir = path.join(__dirname, '..', 'out');
// Путь к файлу index.html
const redirectFile = path.join(outDir, 'index.html');

// HTML-содержимое для редиректа
const redirectContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <link rel="canonical" href="/idea/ka"/>
    <meta http-equiv="refresh" content="0;url=/idea/ka">
  </head>
  <body>
    <h1>Redirecting...</h1>
    <a href="/idea/ka">Click here if you are not redirected.</a>
    <script>
      // Если есть параметры в URL, сохраняем их при редиректе
      const url = '/idea/ka' + window.location.search;
      window.location.replace(url);
    </script>
  </body>
</html>
`;

// Убедимся, что папка 'out' существует
if (fs.existsSync(outDir)) {
  // Записываем файл
  fs.writeFileSync(redirectFile, redirectContent);
  console.log('✅ Created redirect file for GitHub Pages in out/index.html');
} else {
  console.error('❌ Error: `out` directory does not exist. Run `next build` first.');
  process.exit(1);
} 