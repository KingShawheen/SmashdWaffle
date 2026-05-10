const fs = require('fs');
const path = './src/app/menu/data.ts';
let content = fs.readFileSync(path, 'utf8');

// Update Types
content = content.replace(/description: string;\n\s*basePrice: number;/g, '');
content = content.replace(/description: string;\n\s*emoji: string;/g, 'emoji: string;');
content = content.replace(/prices: \{ size: string; price: number \}\[\];/g, '');

// Update Objects
content = content.replace(/description: '.*?',\n\s*/g, '');
content = content.replace(/description: ".*?",\n\s*/g, '');
content = content.replace(/description: `.*?`,\n\s*/g, '');
content = content.replace(/basePrice: \d+\.\d+,\n\s*/g, '');
content = content.replace(/prices: \[\s*\{.*?\}\s*\],\n\s*/g, '');
content = content.replace(/prices: \[\s*\{.*?\},\s*\{.*?\}\s*\],\n\s*/g, '');
content = content.replace(/prices: \[\s*\{.*?\},\s*\{.*?\},\s*\{.*?\}\s*\],\n\s*/g, '');
content = content.replace(/prices: \[\s*\{.*?\},\s*\{.*?\},\s*\{.*?\},\s*\{.*?\}\s*\],\n\s*/g, '');
content = content.replace(/prices: \[[\s\S]*?\],\n\s*/g, ''); // catch all multiline prices

fs.writeFileSync(path, content);
console.log('Cleaned data.ts');
