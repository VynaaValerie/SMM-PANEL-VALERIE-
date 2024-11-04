import { createHash } from 'crypto';
import moment from 'moment-timezone';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
    function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    let d = new Date(Date.now() + 3600000); // Use Date.now() for current time
    let locale = 'id';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let wktuwib = moment.tz('Asia/Jakarta').format('HH [H] mm [M] ss [S]');
    let user = global.db.data.users[m.sender];

    // Check if the user is already registered
    if (user.registered) {
        throw `[💬] Kamu sudah terdaftar\nMau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`;
    }

    // Validate input
    if (!Reg.test(text)) {
        return m.reply(`Silahkan Ketik:\n${usedPrefix + command} nama.umur\n\nContoh:\n${usedPrefix + command} Vynaa.20`);
    }

    let [_, name, splitter, age] = text.match(Reg);
    if (!name) return m.reply('Nama tidak boleh kosong (Alphanumeric)');
    if (!age) return m.reply('Umur tidak boleh kosong (Angka)');

    age = parseInt(age);
    if (age > 70) return m.reply('HALAH" TUA (^_-)');
    if (age < 5) return m.reply('Halah" Bocil (^o^)');
    if (name.length > 100) return m.reply('Nama Maksimal 100 Karakter Ajg');

    // Save user information
    user.name = name.trim();
    user.age = age;
    user.regTime = +new Date();
    user.registered = true;

    let sn = createHash('md5').update(m.sender).digest('hex');

    // Prepare message content
    let cap = `
╭――╼ *USER INFORMATION* 
│ ❐ *sᴛᴀᴛᴜs:* ☑️ sᴜᴄᴄᴇssғᴜʟ
│ ❐ *ɴᴀᴍᴇ:* ${name}
│ ❐ *ᴀɢᴇ:* ${age} ʏᴇᴀʀs
╰――╼
❐ *sɴ:* ${sn}

╭――╼ *Details*
│ ● 𝗗𝗮𝘁𝗲: ${week} ${date}
│ ● 𝗧𝗶𝗺𝗲: ${wktuwib}
╰――╼
`;

    // Send the registration message
    await conn.reply(m.chat, cap, m);

    // Send reaction to the message
    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '✅' } }, { messageId: m.key.id });
};

handler.help = ['daftar'];
handler.tags = ['main'];
handler.command = /^(daftar|verify|reg(ister)?)$/i;

export default handler;