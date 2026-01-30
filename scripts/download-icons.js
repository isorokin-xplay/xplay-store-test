import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const icons = {
    'logo.svg': 'http://localhost:3845/assets/955075f0d75de46ed85cfc681c9a0e978fd007da.svg',
    'wallet.svg': 'http://localhost:3845/assets/e5de6fd6b2ccb449852b66c4ab40ce102ff9048b.svg',
    'coin.svg': 'http://localhost:3845/assets/9ae9beeb05803afab4073eea9fb980c047235e5e.svg',
    'mail.svg': 'http://localhost:3845/assets/edb6f18ad27dad3af9265bc823a00d26c03794c9.svg',
    'crown.svg': 'http://localhost:3845/assets/b595726e520af529acb2b1cc78ff8742b419c5f6.svg',
    'avatar.png': 'http://localhost:3845/assets/75f14889b7448eb97e2c70173bd8409b65556385.png',
    'arrow.svg': 'http://localhost:3845/assets/0c9b58d2d76feec8496ceb840911b4dd144dc4f7.svg',
    'servers.svg': 'http://localhost:3845/assets/fd0c1cad38344a5cdacd0a81fbcf68197dd64a13.svg',
    'pickems.svg': 'http://localhost:3845/assets/4213149708edefec846344a7e9a6205bc04f49b2.svg',
    'personal.svg': 'http://localhost:3845/assets/6e9db7e90e6d37ce388697c6822d74f368a125f8.svg',
    'challenges.svg': 'http://localhost:3845/assets/5431f9f2b55798d13d5ed0706ad74ab5e6565767.svg',
    'skinchanger.svg': 'http://localhost:3845/assets/84da1eca018d6441e0365d8ca52cb2874f2547e3.svg',
    'buy.svg': 'http://localhost:3845/assets/66693cac006a950db12ac3b95607319b2ff268c8.svg',
    'sell.svg': 'http://localhost:3845/assets/002a43aea14a51217f207c7d7ed15de04568c40f.svg',
    'market.svg': 'http://localhost:3845/assets/f5ff61bd1ced3d9f6bda76592714059b4a4847b1.svg',
    'pro.svg': 'http://localhost:3845/assets/359f1b87f631b56df85a46f1e1cf2083f65d52dd.svg',
    'faq.svg': 'http://localhost:3845/assets/59303ad55823e6f9ee1354bb38db02b1e30f34a5.svg',
    'blog.svg': 'http://localhost:3845/assets/b6ceccc18ccbe98c8c2e163ac751bce17a2955c6.svg',
    'discord.svg': 'http://localhost:3845/assets/1b3b5f2ec2a14f3d8e8d04bf4c1c8d36f4d57336.svg',
    'instagram.svg': 'http://localhost:3845/assets/a5ba2bf84b167ec435e37d495e2ddb73ec850131.svg',
    'x.svg': 'http://localhost:3845/assets/1566e3fb257237718ada2ef32cd2f4056e869652.svg',
    'steam.svg': 'http://localhost:3845/assets/ebe2f018f12175c16262eaf6f7a64433e86cee52.svg',
    'vk.svg': 'http://localhost:3845/assets/7c4ad0d4d6d917d0983eece9de0f5d4e96e83878.svg',
    'telegram.svg': 'http://localhost:3845/assets/aab389a5107909e5d37d38ea0653e76a1eba1351.svg',
    'arrowDown.svg': 'http://localhost:3845/assets/0578ba2788e703ce94e812dbc85c74acb1b1ecaf.svg',
    'sort.svg': 'http://localhost:3845/assets/b59b139c390f16f9b222dbb24bbfd442283c9f5e.svg',
    'check.svg': 'http://localhost:3845/assets/e081f68c5adfe14767756c8607413b92bac34004.svg',
    'cart.svg': 'http://localhost:3845/assets/09946237fb0e0629fe66e945cf2bf04bd622ad5b.svg'
};

const outputDir = path.join(__dirname, '../src/assets/icons');

async function downloadIcon(name, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to download ${name}: ${response.status} ${response.statusText}`);
            return false;
        }

        const buffer = await response.arrayBuffer();
        const outputPath = path.join(outputDir, name);
        fs.writeFileSync(outputPath, Buffer.from(buffer));
        console.log(`✓ Downloaded: ${name}`);
        return true;
    } catch (error) {
        console.error(`✗ Failed: ${name} - ${error.message}`);
        return false;
    }
}

async function downloadAll() {
    console.log('Starting icon download...\n');

    let success = 0;
    let failed = 0;

    for (const [name, url] of Object.entries(icons)) {
        const result = await downloadIcon(name, url);
        if (result) success++;
        else failed++;
    }

    console.log(`\nDownload complete: ${success} succeeded, ${failed} failed`);
}

downloadAll();
