/* JANGAN HAPUS INI 
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/
import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

/*=========== LINK ============*/
global.tokopay = {
    merchantID: 'M240701FIBRZ175',
    secretKey: '79f11be7847b1f018336776cef9c78d988530d5758527a032acd1f08ea429f28',
    link: 'https://api.tokopay.id'
};

global.smm = {
    apiKey: 'fbb2d8-41bf6e-dfd481-d4c487-8942fa',
    apiId: 'RnRXS2NNaUJyYkhGeDU2L1hWV2ZSZz09',
    link: 'https://valerieconnect.shop'
};

global.link = {
    ig: 'https://instagram.com/vynaa_valerie',
    gh: 'https://github.com/VynaaValerie',
    gc: 'https://whatsapp.com/channel/0029VaHPYh6LNSa81M9Xcq1K',
    web: 'https://whatsapp.com/channel/0029VaHPYh6LNSa81M9Xcq1K',
    yt: 'https://youtube.com/@VynaaChan',
    fb: 'https://m.facebook.com',
    tree: 'https://www.vynaachan-api.shop',
    nh: 'https://nhentai.net/g/365296/'
};

/*=========== PAYMENT ============*/
global.pay = {
    dana: '082389924037',
    ovo: '082389924037',
    gopay: '082389924037',
    pulsa: '082389924037',
    qris: 'https://telegra.ph/file/a3653879d96186bdd0467.jpg'
};

/*=========== INFO ============*/
global.info = {
    nomorbot: '6283896757956',
    nomorown: '6282389924037',
    namebot: '© 2024 VLSHOP PEDIA',
    nameown: 'Vynaa Valerie'
};

global.owner = [
    ['6282389924037', 'VynaaValerie', true],
    ['6283896757956', 'VynaaValerie', true]
];

global.mods = [];
global.prems = [];

/*=========== WATERMARK ============*/
global.versibot = '10.18';
global.wm = '© 2024 VLSHOP PEDIA';
global.author = 'VynaValerie';
global.wait = '_「P R O C E S S 」_';
global.stickpack = 'YT VynaaValerie';
global.stickauth = '© VLSHOP';

/*=========== ASSETS ============*/
global.elainajpg = ['https://widipe.com/file/i0Fy9jrRh1zz.png'];
global.vynaajpg = 'https://widipe.com/file/i0Fy9jrRh1zz.png';
global.thumbnail = 'https://widipe.com/file/i0Fy9jrRh1zz.png';
global.fsizedoc = '99999999999999';
global.fpagedoc = '999';

/*=========== DOCUMENT TYPES ============*/
global.doc = {
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pdf: 'application/pdf',
    rtf: 'text/rtf'
};

/*=========== RPG ============*/
global.multiplier = 38;
global.rpg = {
    emoticon(string) {
        const emot = {
            level: '📊',
            limit: '🎫',
            health: '❤️',
            exp: '✨',
            atm: '💳',
            money: '💰',
            bank: '🏦',
            potion: '🥤',
            diamond: '💎',
            common: '📦',
            uncommon: '🛍️',
            mythic: '🎁',
            legendary: '🗃️',
            superior: '💼',
            pet: '🔖',
            trash: '🗑',
            armor: '🥼',
            sword: '⚔️',
            pickaxe: '⛏️',
            fishingrod: '🎣',
            wood: '🪵',
            rock: '🪨',
            string: '🕸️',
            horse: '🐴',
            cat: '🐱',
            dog: '🐶',
            fox: '🦊',
            robo: '🤖',
            petfood: '🍖',
            iron: '⛓️',
            gold: '🪙',
            emerald: '❇️',
            upgrader: '🧰',
            bibitanggur: '🌱',
            bibitjeruk: '🌿',
            bibitapel: '☘️',
            bibitmangga: '🍀',
            bibitpisang: '🌴',
            anggur: '🍇',
            jeruk: '🍊',
            apel: '🍎',
            mangga: '🥭',
            pisang: '🍌',
            botol: '🍾',
            kardus: '📦',
            kaleng: '🏮',
            plastik: '📜',
            gelas: '🧋',
            chip: '♋',
            umpan: '🪱',
            skata: '🧩'
        };
        const result = Object.keys(emot).find(v => new RegExp(v, 'gi').test(string.toLowerCase()));
        return result ? emot[result] : '';
    }
};

/*=========== FILE WATCHER ============*/
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
    unwatchFile(file);
    console.log(chalk.redBright("Update 'config.js'"));
    import(`${file}?update=${Date.now()}`);
});