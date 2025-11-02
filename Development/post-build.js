import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all .html files
function findHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to rename JavaScript file and update HTML references
function fixJavaScriptFile() {
  const assetsDir = path.join(__dirname, 'dist', 'assets');

  // Find the JavaScript file with hash
  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find((file) => file.startsWith('main') && file.endsWith('.js'));

  if (jsFile && jsFile !== 'main.js') {
    const oldPath = path.join(assetsDir, jsFile);
    const newPath = path.join(assetsDir, 'main.js');

    // Rename the file
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${jsFile} to main.js`);

    // Update all HTML files to reference main.js and inject script tag
    const htmlFiles = findHtmlFiles(path.join(__dirname, 'dist'));

    htmlFiles.forEach((filePath) => {
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace the old filename with main.js
      content = content.replace(new RegExp(jsFile, 'g'), 'main.js');

      // Inject the main.js script tag if it's missing
      if (content.includes('<!-- SCRIPT -->') && !content.includes('src="./assets/main.js"')) {
        content = content.replace('<!-- SCRIPT -->', '<script src="./assets/main.js"></script>');
      }

      // Add CSS link if it's missing
      if (!content.includes('href="./assets/main.css"')) {
        content = content.replace(
          /(<link\s+href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>\s*)/,
          '$1<link rel="stylesheet" href="./assets/main.css" />\n'
        );
      }

      fs.writeFileSync(filePath, content, 'utf8');
    });
  } else {
    console.log('No JavaScript file found to rename or already named main.js');
  }
}

// Run the script
fixJavaScriptFile();
