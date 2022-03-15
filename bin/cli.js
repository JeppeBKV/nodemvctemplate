#!/usr/bin/env node

const { execSync, spawn, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('Remember to give project name.');
    console.log('For example :');
    console.log('    npx mvc-temp appName');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName).replace(/ /g, "\\\ ");
const git_repo = 'https://github.com/JeppeBKV/nodemvctemplate/';

try {
    fs.mkdirSync(projectPath);
} catch (err) {
    if(err.code === 'EEXIST') {
        console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
        console.log(error);
    }
    process.exit(1);
}

async function main () {
    try {
        console.log('Downloading files...');
        execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);
  
        process.chdir(projectPath);
  
        fs.readFile('./package.json', 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            let firstChange = data.replace(/"name": "nodemvctemplate"/g, `"name": "${projectName}"`);
            let result = firstChange.replace(/"version": "0.0.4"/g, `"version": "0.0.1"`);
  
            fs.writeFile('./package.json', result, 'utf8', (err) => {
                if (err) return console.log(err);
            })
        })
  
        console.log('Installing dependencies...');
        execSync('npm install');
        execSync('npm install --save-dev');
  
        console.log('Removing useless files');
        fs.rmSync(path.join(projectPath, './.git'), { recursive: true });

        fs.rmSync(path.join(projectPath, 'bin'), { recursive: true });
  
        console.log('The installation is done, this is ready to use !');
  
      } catch (error) {
        console.log(error);
    }
}
main();