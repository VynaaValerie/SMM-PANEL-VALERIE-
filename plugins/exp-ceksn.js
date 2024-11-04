import { createHash } from 'crypto';

let handler = async function (m, { conn }) {
    let user = global.db.data.users[m.sender];

    // Pastikan user sudah terdaftar
    if (!user.registered) {
        throw `[❗] Kamu belum terdaftar.\nSilahkan daftar dulu dengan mengetik *!daftar* nama.umur`;
    }

    // Membuat Serial Number (SN)
    let sn = createHash('md5').update(m.sender).digest('hex');

    // Menyiapkan pesan yang hanya menampilkan SN
    let cap = `*Serial Number (SN):* ${sn}`;

    // Kirim pesan dengan SN
    await conn.reply(m.chat, cap, m);

    // Kirim reaksi pada pesan
    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '✅' } }, { messageId: m.key.id });
};

handler.help = ['ceksn'];
handler.tags = ['main'];
handler.command = /^(ceksn)$/i;
handler.register = true;

export default handler;