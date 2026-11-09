const fs = require('fs');
const path = require('path');

const root = __dirname;
const out = path.join(root, 'chrome');
const skipAtRoot = new Set(['chrome', 'index.zip', 'build-chrome.js', '.git']);

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function copyDirectory(source, destination, isRoot = false) {
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (isRoot && (skipAtRoot.has(entry.name) || entry.name.endsWith('.zip'))) continue;

    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destinationPath, { recursive: true });
      copyDirectory(sourcePath, destinationPath, false);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

copyDirectory(root, out, true);

const manifestPath = path.join(root, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

delete manifest.chrome_settings_overrides;
delete manifest.browser_specific_settings;

if (manifest.background && Array.isArray(manifest.background.scripts)) {
  manifest.background = {
    service_worker: manifest.background.scripts[0]
  };
}

fs.writeFileSync(
  path.join(out, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8'
);

console.log('Chrome build created:', out);
