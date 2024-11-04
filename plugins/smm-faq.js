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
Halo kak, selamat ${timeOfDay}

*FAQ Valerie Connect*

1. *Apa Itu Valerie Connect SMM?*
   Valerie Connect adalah SMM Reseller Panel, di mana orang dapat membeli kebutuhan Social Media Marketing seperti Facebook, Twitter, Instagram, YouTube, Website Traffic, dan masih banyak layanan lainnya.

2. *Mengapa Valerie Connect adalah yang Terbaik?*
   Valerie Connect adalah Panel Reseller SMM Terbaik di Dunia - dipercaya oleh lebih dari 20.000 user. Dukungan API untuk pemilik panel dan individu, estimasi waktu pesanan, deskripsi layanan, gateway pembayaran populer, dan kebijakan pengembalian dana singkat membuatnya pilihan terbaik.

3. *Bagaimana cara mendaftarnya? Apakah ada biaya pendaftaran?*
   Pendaftaran cukup klik Register dan isi data sesuai yang dibutuhkan. Pendaftaran GRATIS tanpa biaya.

4. *Bagaimana cara membuat pesanan?*
   Mudah! Login ke akun Anda dan buka halaman pemesanan. Anda juga bisa melakukan pemesanan melalui API request.

5. *Apa Itu Partial?*
   Status Partial berarti kami mengembalikan sebagian sisa pesanan. Misal, Anda pesan 1000 namun hanya 900 dikirim, sisa 100 dikembalikan ke saldo Anda.

6. *Bagaimana cara melakukan deposit/isi saldo?*
   Login ke akun Anda dan buka halaman deposit. Kami mendukung deposit via bank dan pulsa.

7. *Apa perbedaan semua server di setiap layanan?*
   Setiap server memiliki perbedaan harga, kualitas, dan kecepatan proses. Update informasi layanan selalu tersedia di info panel.

8. *Apa Itu Instagram Mention?*
   Instagram Mention adalah fitur untuk menyebut seseorang di Instagram agar mendapat notifikasi ke postingan Anda.

9. *Apa Itu Instagram impressions?*
   Impressions menunjukkan berapa banyak pengguna yang melihat postingan Anda, biasanya digunakan untuk merek dan promosi.

10. *Apa itu "Instagram Saves", dan apa fungsinya?*
   Instagram Saves adalah ketika pengguna menyimpan postingan Anda ke koleksi mereka, yang meningkatkan keterlibatan postingan.
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

handler.help = ['faq'];
handler.tags = ['info'];
handler.command = /^(info|faq)$/i;
handler.owner = false;

export default handler;