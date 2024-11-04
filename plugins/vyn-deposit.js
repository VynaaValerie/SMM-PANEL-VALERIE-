import fs from 'fs';

let handler = async (m, { conn, usedPrefix }) => {
  // Mendapatkan data user dari database
  let user = global.db.data.users[m.sender] || {}; // Pastikan data user tidak null

  // Mendapatkan tanggal saat ini
  let today = new Date();
 
  // Tentukan zona waktu Asia/Jakarta (WIB)
  let options = { timeZone: 'Asia/Jakarta', hour: '2-digit', hour12: false };
  let curHr = today.toLocaleTimeString('id-ID', options).split(':')[0]; // Mengambil jam dalam format 24-jam
  let timeOfDay;

  // Tentukan salam berdasarkan jam WIB
  if (curHr < 12) {
    timeOfDay = 'pagi🌄';
  } else if (curHr < 18) {
    timeOfDay = 'siang⛅';
  } else {
    timeOfDay = 'malam🌙';
  }

  // Mendapatkan waktu, hari, dan tanggal sesuai WIB
  let wibTime = today.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' });
  let day = new Intl.DateTimeFormat('id-ID', { weekday: 'long', timeZone: 'Asia/Jakarta' }).format(today);
  let date = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' });

  // Menghitung countdown ke Ramadan dan Idul Adha
  let ramadanDate = new Date('2025-02-28T00:00:00+07:00'); // Tanggal awal Ramadan 2025
  let idulAdhaDate = new Date('2025-06-06T00:00:00+07:00'); // Tanggal awal Idul Adha 2025

  let ramadanCountdown = Math.ceil((ramadanDate - today) / (1000 * 60 * 60 * 24)); // Selisih dalam hari
  let idulAdhaCountdown = Math.ceil((idulAdhaDate - today) / (1000 * 60 * 60 * 24));

  // Membaca gambar lokal
  let imagePath = './media/thumbnail.jpg'; // Path ke gambar lokal
  let imageBuffer = fs.readFileSync(imagePath); // Membaca file gambar

  // Teks yang akan dikirim, menyertakan data pengguna
  let payText = `
Halo ${user.name || 'Tidak diketahui'}, selamat ${timeOfDay}

Silahkan pilih salah satu metode pembayaran, untuk melakukan pengisian saldo

> ▧ *.qris* >jumlah<
> ▧ *.dana* >jumlah<
> ▧ *.shopee* >jumlah<
> ▧ *.gopay* >jumlah<
> ▧ *.link* >jumlah<

*INFO*
Gunakan format contoh .qris 5000 atau dana 5000, semua transaksi pembayaran 100% aman
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

handler.help = ['deposit'];
handler.tags = ['info'];
handler.command = /^(deposit)$/i;
handler.register = true;

export default handler;

/* JANGAN HAPUS INI 
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/