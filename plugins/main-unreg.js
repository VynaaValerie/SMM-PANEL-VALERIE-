import { createHash } from 'crypto';
import fs from 'fs';

let handler = async function (m, { args, usedPrefix, command, conn }) {
    let wm = 'Vynaa AI 10.19 ';
    let link = { web: 'https://www.vynaachan-api.shop' };

    // Array of farewell messages
    let farewellMessages = [
        'Yah sayang banget kamu keluar dari database Vynaa 🥹\nAku akan selalu merindukanmu.',
        'Sedih banget kamu pergi dari database Vynaa 😢\nSemoga kita bisa bertemu lagi!',
        'Wah, kamu pergi ya? 😔\nKami akan merindukan kehadiranmu di database Vynaa!',
        'Keputusan yang sulit, tapi kami menghormati pilihanmu 😥\nIngat, Vynaa selalu ada untukmu!',
        'Kami merasa kehilangan tanpa kamu di database Vynaa 😭\nSemoga sukses selalu!',
        'Yah, sepertinya kamu sudah tidak mau lagi di database Vynaa 😢\nSelamat tinggal, sahabat!'
    ];

    if (!args[0]) throw `📮 Serial Number kosong, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`;

    let user = global.db.data.users[m.sender];
    let sn = createHash('md5').update(m.sender).digest('hex');

    if (args[0] !== sn) throw `🚫 Serial Number salah!, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`;

    user.registered = false;
    user.unreg = true;

    // Pick a random farewell message
    let farewellMessage = farewellMessages[Math.floor(Math.random() * farewellMessages.length)];

    // Reply message with farewell
    conn.reply(m.chat, `${farewellMessage}`, m, {
        contextInfo: {
            externalAdReply: {
                title: 'S U K S E S',
                body: wm,
                sourceUrl: link.web,
                thumbnail: fs.readFileSync('./media/denied.jpg')
            }
        }
    });
}

handler.help = ['unreg'];
handler.tags = ['main'];
handler.command = /^unreg(ister)?$/i;
handler.register = true;

export default handler;

/* JANGAN HAPUS INI 
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/