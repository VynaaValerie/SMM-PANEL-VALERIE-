import fs from 'fs';

let handler = async (m, { conn, usedPrefix }) => {
  // Menggunakan timezone Asia/Jakarta untuk mendapatkan jam yang akurat
  let today = new Date();
  let options = { timeZone: 'Asia/Jakarta', hour: '2-digit', hour12: false };
  let curHr = today.toLocaleTimeString('id-ID', options).split(':')[0]; // Mengambil jam dalam format 24 jam
  let timeOfDay;

  // Menentukan bagian hari berdasarkan jam
  if (curHr < 12) {
    timeOfDay = 'pagi🌄';
  } else if (curHr < 18) {
    timeOfDay = 'siang⛅';
  } else {
    timeOfDay = 'malam🌙';
  }

  // Membaca gambar lokal
  let imagePath = './media/vynaa.jpg'; // Path ke gambar lokal
  let imageBuffer = fs.readFileSync(imagePath); // Membaca file gambar

  // Teks yang akan dikirim
  let payText = `
Halo owner, selamat ${timeOfDay}
> ▧ .list_saldo_user
> ▧ .tariksaldo
> ▧ .addsaldo 
> ▧ .delsaldo 
> ▧ .ceksaldo
> ▧ .sf
> ▧ .df
> ▧ .gp
> ▧ $
`;

  // Mengirim reaksi ke pesan
  await conn.relayMessage(m.chat, {
    reactionMessage: { 
      key: m.key, 
      text: '✅' 
    }
  }, { messageId: m.key.id });

  // Mengirim gambar dan teks ke chat
  await conn.sendMessage(m.chat, {
    image: imageBuffer,
    caption: payText,
  });
};

handler.help = ['tqto'];
handler.tags = ['info'];
handler.command = /^(menuowner|ownmenu)$/i;
handler.owner = true;

export default handler;