let handler = async (m, { conn, command }) => {
  let user = global.db.data.users[m.sender] || {}

  // Pastikan nilai default untuk saldo, limit, dan premiumTime
  const saldo = user.saldo || 0
  const limit = user.limit || 0
  const premiumTime = user.premiumTime || 0

  // Dapatkan informasi nama pengguna
  const name = user.registered ? user.name : await conn.getName(m.sender)

  // Dapatkan tanggal dan waktu terbaru dalam zona waktu Asia/Jakarta
  const currentDate = new Date()
  const options = { timeZone: 'Asia/Jakarta', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }

  // Format tanggal dan waktu secara real-time
  const formattedDate = currentDate.toLocaleDateString('id-ID', options)
  const formattedTime = currentDate.toLocaleTimeString('id-ID', options)

  const caption = `
💳 *Informasi Akun* 💳
━━━━━━━━━━━━━━━━━━━
👤 *Nama:* ${name}
💎 *Limit:* ${premiumTime > 0 ? '∞ Unlimited' : limit}
💰 *Saldo:* Rp ${saldo.toLocaleString('id-ID')}

*DATE*
${formattedTime}
━━━━━━━━━━━━━━━━━━━
`.trim()

  await conn.reply(m.chat, caption, m)
}

handler.help = ['dompet']
handler.tags = ['main']
handler.command = /^(mysaldo|dompet)$/i
handler.owner = false 
handler.register = true 

export default handler