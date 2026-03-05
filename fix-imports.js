import { glob } from 'glob';
import fs from 'fs-extra';

async function main() {
    const files = await glob('src/**/*.{js,jsx}');
    console.log(`Checking ${files.length} files for import extensions...`);

    for (const file of files) {
        let content = await fs.readFile(file, 'utf-8');
        let hasChanges = false;

        // Replace .tsx and .ts in import/export statements
        // Simplistic regex but works for most ES imports:
        // import App from "./App.tsx" -> import App from "./App.jsx"
        // import { something } from "./utils.ts" -> import { something } from "./utils.js"
        const newContent = content.replace(/(from\s+['"])(.*?)\.(tsx|ts)(['"])/g, (match, p1, p2, p3, p4) => {
            hasChanges = true;
            const newExt = p3 === 'tsx' ? 'jsx' : 'js';
            return `${p1}${p2}.${newExt}${p4}`;
        });

        const newContent2 = newContent.replace(/(import\s+['"])(.*?)\.(tsx|ts)(['"])/g, (match, p1, p2, p3, p4) => {
            hasChanges = true;
            const newExt = p3 === 'tsx' ? 'jsx' : 'js';
            return `${p1}${p2}.${newExt}${p4}`;
        });

        if (hasChanges) {
            await fs.writeFile(file, newContent2);
            console.log(`Updated imports in: ${file}`);
        }
    }
}

main().catch(console.error);
