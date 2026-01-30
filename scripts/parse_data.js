import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, '../newData.html');
const dbPath = path.join(__dirname, '../db.json');

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const items = [];
const itemRegex = /<div class="sc-fa5b6d7b-1 eEuLZR">\s*<div>(.*?)<\/div>\s*<div[^>]*>(\d+)<\/div>\s*<\/div>\s*<div[^>]*>(.*?)<\/div>[\s\S]*?url="(.*?)"/g;

let match;
let idCounter = 1;

const getCategory = (weapon) => {
    const w = weapon.toLowerCase();
    if (['glock-18', 'usp-s', 'p2000', 'p250', 'desert eagle', 'five-seven', 'tec-9', 'dual berettas', 'cz75-auto', 'r8 revolver'].some(k => w.includes(k))) return 'Pistol';
    if (['ak-47', 'm4a4', 'm4a1-s', 'galil ar', 'famas', 'aug', 'sg 553'].some(k => w.includes(k))) return 'Rifle';
    if (['awp', 'ssg 08', 'g3sg1', 'scar-20'].some(k => w.includes(k))) return 'Sniper';
    if (['mac-10', 'mp9', 'mp7', 'mp5-sd', 'ump-45', 'p90', 'pp-bizon'].some(k => w.includes(k))) return 'SMG';
    if (['nova', 'xm1014', 'mag-7', 'sawed-off', 'm249', 'negev'].some(k => w.includes(k))) return 'Heavy';
    if (w.includes('knife') || w.includes('dagger') || w.includes('karambit') || w.includes('bayonet')) return 'Knife';
    if (w.includes('gloves') || w.includes('wraps')) return 'Gloves';
    return 'Rifle';
};

while ((match = itemRegex.exec(htmlContent)) !== null) {
    const weapon = match[1];
    const price = parseInt(match[2], 10);
    const skinName = match[3];
    const imageUrl = match[4];

    // Simple random state assignment for variety
    const state = Math.random() > 0.3 ? 'ready' : 'tradeban';

    items.push({
        id: idCounter++,
        weapon: weapon,
        name: skinName,
        price: price,
        quality: "Minimal Wear",
        image: imageUrl,
        category: getCategory(weapon),
        state: state
    });
}

console.log(`Found ${items.length} items.`);

let db = {};
if (fs.existsSync(dbPath)) {
    try {
        db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    } catch (e) {
        console.error("Error reading db.json, creating new object");
    }
}

db.items = items;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));
console.log('Updated db.json');
