#!/usr/bin/env node

/**
 * Скрипт для проверки готовности проекта к деплою
 * Запуск: node check-deploy.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Проверка готовности проекта к деплою...\n');

// Список обязательных файлов
const requiredFiles = [
    'index.html',
    'styles.css',
    'script.js',
    'package.json',
    'README.md',
    'LICENSE',
    '.gitignore'
];

// Список папок с ресурсами
const resourceFolders = [
    'Gif',
    'Music'
];

// Список файлов в папках ресурсов
const resourceFiles = [
    'Gif/Nyan Cat Transparent.gif',
    'Gif/Sad Hamster Sticker.gif',
    'Music/Sad Hamster Violin Meme.mp3'
];

let errors = 0;
let warnings = 0;

// Проверка обязательных файлов
console.log('📄 Проверка обязательных файлов:');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ✅ ${file}`);
    } else {
        console.log(`  ❌ ${file} - ОТСУТСТВУЕТ`);
        errors++;
    }
});

console.log('\n📁 Проверка папок ресурсов:');
resourceFolders.forEach(folder => {
    if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
        console.log(`  ✅ ${folder}/`);
    } else {
        console.log(`  ❌ ${folder}/ - ОТСУТСТВУЕТ`);
        errors++;
    }
});

console.log('\n🎨 Проверка файлов ресурсов:');
resourceFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`  ✅ ${file} (${sizeKB} KB)`);
        
        // Предупреждение о больших файлах
        if (stats.size > 5 * 1024 * 1024) { // 5MB
            console.log(`    ⚠️  Файл слишком большой (${sizeKB} KB)`);
            warnings++;
        }
    } else {
        console.log(`  ❌ ${file} - ОТСУТСТВУЕТ`);
        errors++;
    }
});

// Проверка HTML на наличие всех ссылок
console.log('\n🔗 Проверка ссылок в HTML:');
try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Проверка CSS
    if (htmlContent.includes('styles.css')) {
        console.log('  ✅ CSS подключен');
    } else {
        console.log('  ❌ CSS не подключен');
        errors++;
    }
    
    // Проверка JS
    if (htmlContent.includes('script.js')) {
        console.log('  ✅ JavaScript подключен');
    } else {
        console.log('  ❌ JavaScript не подключен');
        errors++;
    }
    
    // Проверка Font Awesome
    if (htmlContent.includes('font-awesome')) {
        console.log('  ✅ Font Awesome подключен');
    } else {
        console.log('  ⚠️  Font Awesome не подключен');
        warnings++;
    }
    
} catch (err) {
    console.log('  ❌ Ошибка чтения HTML файла');
    errors++;
}

// Проверка package.json
console.log('\n📦 Проверка package.json:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (packageJson.name) {
        console.log(`  ✅ Название проекта: ${packageJson.name}`);
    } else {
        console.log('  ❌ Название проекта не указано');
        errors++;
    }
    
    if (packageJson.version) {
        console.log(`  ✅ Версия: ${packageJson.version}`);
    } else {
        console.log('  ❌ Версия не указана');
        errors++;
    }
    
    if (packageJson.description) {
        console.log(`  ✅ Описание: ${packageJson.description}`);
    } else {
        console.log('  ⚠️  Описание не указано');
        warnings++;
    }
    
} catch (err) {
    console.log('  ❌ Ошибка чтения package.json');
    errors++;
}

// Проверка конфигурационных файлов
console.log('\n⚙️  Проверка конфигурационных файлов:');
const configFiles = ['vercel.json', 'netlify.toml'];
configFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ✅ ${file}`);
    } else {
        console.log(`  ⚠️  ${file} - рекомендуется для деплоя`);
        warnings++;
    }
});

// Итоговый результат
console.log('\n' + '='.repeat(50));
if (errors === 0) {
    console.log('🎉 Проект готов к деплою!');
    if (warnings > 0) {
        console.log(`⚠️  Найдено ${warnings} предупреждений (не критично)`);
    }
} else {
    console.log(`❌ Найдено ${errors} ошибок. Исправьте их перед деплоем.`);
    if (warnings > 0) {
        console.log(`⚠️  Также ${warnings} предупреждений`);
    }
}

console.log('\n📋 Рекомендации:');
console.log('  1. Убедитесь, что все файлы загружены в репозиторий');
console.log('  2. Проверьте работоспособность локально');
console.log('  3. Выберите платформу для деплоя (Vercel/Netlify/GitHub Pages)');
console.log('  4. Следуйте инструкциям в DEPLOY.md');

process.exit(errors > 0 ? 1 : 0);
