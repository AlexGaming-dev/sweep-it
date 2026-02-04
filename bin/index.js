#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

const targetDir = process.cwd();
const folders = {
    'Images': ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
    'Documents': ['.pdf', '.docx', '.txt', '.xlsx'],
    'Code': ['.js', '.html', '.css', '.json', '.py'],
    'Videos': ['.mp4', '.mov', '.avi']
};

async function sweep() {
    console.log('🧹 Sweep-It is cleaning up...');
    const files = await fs.readdir(targetDir);

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        for (const [folder, extensions] of Object.entries(folders)) {
            if (extensions.includes(ext)) {
                await fs.ensureDir(path.join(targetDir, folder));
                await fs.move(path.join(targetDir, file), path.join(targetDir, folder, file));
                console.log(`📦 Moved ${file} to ${folder}`);
            }
        }
    }
    console.log('✨ Your workspace is now clean!');
}

sweep().catch(err => console.error(err));