let handler = async (m, { conn, command, args }) => {
  let user = global.db.data.users[m.sender];
  let amount = parseInt(args[0]);

  // Mengecek apakah jumlah yang dimasukkan valid
  if (isNaN(amount) || amount <= 0) {
    return conn.reply(m.chat, '⚠️ Jumlah tidak valid. Masukkan jumlah yang benar.', m);
  }

  // Mengecek apakah saldo pengguna mencukupi
  if (user.saldo < amount) {
    return conn.reply(m.chat, '❌ Saldo tidak cukup.', m);
  }

  // Mengurangi saldo pengguna
  user.saldo -= amount;

  // Membuat pesan balasan dengan emoji
  const caption = `🧾 *Saldo Berhasil Dikurangi!*

📌 *▸ Nama:* ${user.registered ? user.name : conn.getName(m.sender)}
💳 *▸ Saldo Baru:* ${user.saldo}
`.trim();

  // Mengirimkan balasan
  await conn.reply(m.chat, caption, m);
};

handler.help = ['delsaldo <nomor>'];
handler.tags = ['judi'];
handler.command = /^(delsaldo)$/i;
handler.owner = true;
handler.register = false;

export default handler;