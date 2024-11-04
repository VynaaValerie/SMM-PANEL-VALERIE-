import moment from 'moment-timezone';

let handler = async (m, { conn, command, args }) => {
  // Memisahkan argumen menggunakan simbol '|'
  let [amountArg, targetNumber] = args.join(' ').split('|');
  
  // Mengecek apakah jumlah saldo valid
  let amount = parseInt(amountArg);
  if (isNaN(amount) || amount <= 0) {
    return conn.reply(m.chat, '⚠️ Silakan masukkan jumlah yang valid untuk menambahkan saldo.', m);
  }

  // Mengecek apakah nomor pengguna disediakan
  if (!targetNumber) {
    return conn.reply(m.chat, '⚠️ Silakan masukkan nomor yang valid untuk menambahkan saldo.', m);
  }

  // Membersihkan nomor pengguna
  targetNumber = targetNumber.trim() + '@s.whatsapp.net';

  // Mencari pengguna berdasarkan nomor target
  let targetUser = global.db.data.users[targetNumber];
  if (!targetUser) {
    return conn.reply(m.chat, '❌ Pengguna dengan nomor tersebut tidak ditemukan.', m);
  }

  // Menambahkan saldo ke pengguna target
  targetUser.saldo += amount;

  // Mendapatkan waktu real-time di zona waktu Asia/Jakarta
  const currentDate = moment().tz('Asia/Jakarta').format('DD-MM-YYYY');
  const currentTime = moment().tz('Asia/Jakarta').format('HH:mm:ss');

  // Membuat pesan balasan dengan emoji
  const caption = `🎉 *Saldo Berhasil Ditambahkan!*
  
📌 *▸ Nama:* ${targetUser.registered ? targetUser.name : targetNumber}
📊 *▸ Limit:* ${targetUser.premiumTime >= 1 ? '♾️ Unlimited' : targetUser.limit}
💰 *▸ Saldo Baru:* ${targetUser.saldo}
📅 *▸ Tanggal:* ${currentDate}
⏰ *▸ Jam:* ${currentTime}
`.trim();

  // Mengirimkan balasan
  await conn.reply(m.chat, caption, m);
};

handler.help = ['addsaldo <jumlah|nomor>'];
handler.tags = ['owner'];
handler.command = /^(addsaldo)$/i;
handler.owner = true;
handler.register = false;

export default handler;