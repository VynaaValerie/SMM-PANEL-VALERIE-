let handler = async (m, { conn, command }) => {
  let users = global.db.data.users
  let saldoList = []

  // Looping untuk cek semua user yang punya saldo lebih dari 0
  Object.keys(users).forEach(user => {
    let userSaldo = users[user].saldo || 0 
    if (userSaldo > 0) {
      saldoList.push({
        nomor: user, 
        nama: users[user].registered ? users[user].name : conn.getName(user),
        saldo: `Rp ${userSaldo.toLocaleString('id-ID')}`
      })
    }
  })

  // Jika tidak ada user yang punya saldo
  if (saldoList.length === 0) {
    await conn.reply(m.chat, 'Tidak ada user dengan saldo.', m)
    return
  }

  // Format output list saldo user
  let caption = `
💳 *Daftar User dengan Saldo* 💳
━━━━━━━━━━━━━━━━━━━
${saldoList.map((u, i) => `${i + 1}. ${u.nama} (${u.nomor}) - ${u.saldo}`).join('\n')}
━━━━━━━━━━━━━━━━━━━
`.trim()

  await conn.reply(m.chat, caption, m)
}

handler.help = ['list_saldo_user']
handler.tags = ['judi']
handler.command = /^(list_saldo_user)$/i
handler.owner = true
handler.register = false 

export default handler