import { transformFileAsync } from '@babel/core';
import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';

async function main() {
  const files = await glob('src/**/*.{ts,tsx}');
  console.log(`Found ${files.length} files to convert.`);

  for (const file of files) {
    const isTsx = file.endsWith('.tsx');
    const outExt = isTsx ? '.jsx' : '.js';
    const outPath = file.replace(/\.tsx?$/, outExt);

    try {
      const result = await transformFileAsync(file, {
        presets: [
          ['@babel/preset-typescript', { isTSX: isTsx, allExtensions: true }]
        ],
        retainLines: true,
      });

      if (result && result.code) {
        await fs.writeFile(outPath, result.code);
        await fs.remove(file);
        console.log(`Converted: ${file} -> ${outPath}`);
      }
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }

  // Also rename config files
  if (await fs.pathExists('vite.config.ts')) {
    const result = await transformFileAsync('vite.config.ts', {
        presets: [
          ['@babel/preset-typescript', { isTSX: false, allExtensions: true }]
        ],
        retainLines: true,
      });
      if (result && result.code) {
          await fs.writeFile('vite.config.js', result.code);
          await fs.remove('vite.config.ts');
          console.log(`Converted vite.config.ts -> vite.config.js`);
      }
  }
}

main().catch(console.error);
