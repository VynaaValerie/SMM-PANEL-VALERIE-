import fs from 'fs';

let handler = async (m, { conn, usedPrefix }) => {
  let today = new Date();
  let curHr = today.getHours();
  let timeOfDay;

  if (curHr < 12) {
    timeOfDay = 'pagi🌄';
  } else if (curHr < 18) {
    timeOfDay = 'siang⛅';
  } else {
    timeOfDay = 'malam🌙';
  }

  // Membaca gambar lokal
  let imagePath = './media/denied.jpg'; // Path ke gambar lokal
  let imageBuffer = fs.readFileSync(imagePath); // Membaca file gambar

  let payText = `
Halo Kak, selamat ${timeOfDay}

╭─── *Instagram* ───╮
  ≡ ${link.ig}
╰─────────────────╯
╭─── *Github* ────╮
  ≡ ${link.gh}
╰─────────────────╯
╭─── *Facebook* ───╮
  ≡ ${link.fb}
╰─────────────────╯
╭─── *YouTube* ───╮
  ≡ ${link.yt}
╰─────────────────╯
╭─── *Linktree* ───╮
  ≡ ${link.tree}
╰─────────────────╯

Ini adalah akun media sosial pengembang bot WhatsApp ini. Silakan kunjungi dan ikuti untuk mendapatkan pembaruan terbaru tentang bot ini.
`;

  // Mengirim reaksi '✅' pada pesan yang diterima
  await conn.relayMessage(m.chat, {
    reactionMessage: { 
      key: m.key, 
      text: '✅' 
    }
  }, { messageId: m.key.id });

  // Mengirim gambar dengan teks sebagai caption
  await conn.sendMessage(m.chat, {
    image: imageBuffer, // Mengirim buffer gambar
    caption: payText,   // Menambahkan teks sebagai caption
  });
};

handler.command = /^(owner)$/i;
handler.tags = ['main'];
handler.help = ['sosmed'];

export default handler;