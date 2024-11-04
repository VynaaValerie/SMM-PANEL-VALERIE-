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

*TUTORIAL PENGGUNAAN BOT DAN CARA ORDER*

Selamat datang di layanan bot kami! Kami senang Anda bergabung dengan kami. Untuk membantu Anda memanfaatkan sepenuhnya layanan kami, berikut adalah panduan lengkap tentang cara menggunakan bot ini dan melakukan pemesanan layanan sosial media. Silakan baca setiap langkah dengan cermat agar Anda tidak melewatkan informasi penting.

---

1. *Deposit Awal*
Sebelum melakukan pemesanan layanan, Anda *wajib melakukan deposit*. Deposit ini diperlukan agar Anda dapat menggunakan saldo untuk memesan layanan sosial media. Berikut langkah-langkah melakukan deposit:

- *Ketikan Perintah Deposit*: Untuk memulai proses deposit, cukup ketik *.DEPOSIT* di kolom chat. Bot akan memberikan Anda pilihan metode deposit yang tersedia.
  
- *Pilih Metode Deposit*: Misalnya, jika Anda ingin melakukan deposit menggunakan metode QRIS, Anda dapat mengetik *.QRIS 10000*. Ini berarti Anda ingin mendepositkan jumlah 10.000. Pastikan untuk mengikuti instruksi yang diberikan oleh bot untuk menyelesaikan proses deposit dengan sukses.

- *Konfirmasi Deposit*: Setelah Anda melakukan deposit, pastikan untuk memeriksa apakah transaksi berhasil. Bot biasanya akan mengirimkan konfirmasi mengenai saldo yang berhasil ditambahkan.

---

2. *Cek Saldo*
Setelah berhasil melakukan deposit, Anda dapat mengecek saldo akun Anda kapan saja. Untuk melakukan ini, ikuti langkah-langkah berikut:

- *Perintah Cek Saldo*: Ketik *.DOMPET* dan kirimkan pesan. Bot akan memberikan informasi mengenai saldo terkini di akun Anda, termasuk rincian deposit terakhir dan total saldo yang tersedia.

- *Manfaat Cek Saldo*: Memeriksa saldo secara berkala sangat penting agar Anda tahu berapa banyak dana yang tersedia untuk melakukan pemesanan. Jika saldo Anda rendah, Anda bisa melakukan deposit tambahan sesuai kebutuhan.

---

3. *Melihat Layanan yang Tersedia*
Setelah Anda memiliki saldo, langkah selanjutnya adalah melihat layanan yang kami tawarkan. Kami memiliki berbagai layanan sosial media yang dapat Anda pilih. Berikut cara untuk melihatnya:

- *Daftar Layanan*: Untuk melihat layanan yang tersedia, Anda dapat mengetik *.SERVICE* atau *.ALLPRODUK*. Bot akan menampilkan daftar lengkap semua layanan yang kami tawarkan, termasuk deskripsi singkat dan harga setiap layanan.

- *Informasi Layanan*: Pastikan untuk membaca deskripsi layanan dengan cermat agar Anda memahami apa yang ditawarkan. Beberapa layanan mungkin memiliki syarat atau ketentuan tertentu yang perlu diperhatikan.

---

4. *Pencarian Layanan*
Jika Anda sudah tahu layanan yang Anda cari, Anda bisa menggunakan fitur pencarian untuk menemukan layanan tersebut dengan lebih cepat. Berikut langkah-langkahnya:

- *Menggunakan Fitur Pencarian*: Ketik *CARIPRODUK TKTOK* (atau ganti dengan kata kunci layanan lain yang Anda inginkan) dan kirimkan pesan. Bot akan menampilkan semua layanan yang relevan dengan kata kunci tersebut.

- *Filter Pencarian*: Anda bisa menggunakan kata kunci spesifik untuk mempersempit hasil pencarian. Misalnya, jika Anda mencari layanan untuk Instagram, Anda bisa mengetik *CARIPRODUK INSTAGRAM*.

---

5. *Proses Pemesanan*
Setelah menemukan layanan yang diinginkan, Anda siap untuk melakukan pemesanan. Berikut adalah langkah-langkah untuk melakukan pemesanan:

- *Mengonfirmasi Layanan*: Ketika Anda memilih layanan, bot akan meminta Anda untuk mengonfirmasi semua detail pemesanan. Bacalah instruksi dengan seksama dan pastikan semuanya sudah benar.

- *Penyelesaian Pembayaran*: Setelah mengonfirmasi, ikuti instruksi pembayaran yang diberikan oleh bot. Jika Anda menggunakan saldo yang ada, bot akan memotong jumlah yang sesuai dari saldo Anda secara otomatis.

- *Notifikasi Pemesanan*: Setelah pemesanan berhasil, Anda akan menerima notifikasi dari bot yang mengkonfirmasi bahwa pemesanan Anda telah diterima dan sedang diproses.

---

6. *Melihat Status Pemesanan*
Anda dapat memeriksa status pemesanan Anda kapan saja. Ini membantu Anda mengetahui progres dari layanan yang Anda pesan.

- *Perintah Status Pemesanan*: Ketik *.STATUS* untuk melihat status terkini dari pemesanan Anda. Bot akan memberikan rincian mengenai tahapan pemesanan dan perkiraan waktu penyelesaian.

- *Update Pemesanan*: Jika ada perubahan atau update terkait pemesanan Anda, bot akan memberi tahu Anda secara otomatis melalui pesan.

---

7. *Dukungan Pelanggan*
Kami berkomitmen untuk memberikan pengalaman terbaik kepada pelanggan kami. Jika Anda mengalami kesulitan atau memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi tim dukungan kami.

- *Menghubungi Dukungan*: Untuk mendapatkan bantuan lebih lanjut, cukup ketik *.HELP*. Bot akan memberikan informasi tentang cara menghubungi tim dukungan kami atau memberikan jawaban untuk pertanyaan umum.

- *Saran dan Masukan*: Kami juga sangat menghargai saran dan masukan dari pengguna. Jika Anda memiliki ide atau feedback mengenai layanan kami, silakan sampaikan!

---

Dengan mengikuti langkah-langkah di atas, Anda akan dapat menggunakan bot kami dengan mudah dan melakukan pemesanan layanan sosial media tanpa hambatan. Kami berterima kasih telah menggunakan layanan kami dan berharap Anda mendapatkan pengalaman yang memuaskan.

Jika ada pertanyaan lebih lanjut, jangan ragu untuk bertanya kepada bot kami. Selamat berbelanja dan semoga sukses dengan layanan sosial media Anda!
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

handler.help = ['tutorial'];
handler.tags = ['info'];
handler.command = /^(tutor|tutorial)$/i;
handler.owner = true;

export default handler;