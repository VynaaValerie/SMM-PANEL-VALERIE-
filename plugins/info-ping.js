import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let handler = async (m, { conn, args, usedPrefix, command }) => {

let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
         let timestamp = speed();
         let latensi = speed() - timestamp;
         exec(`neofetch --stdout`, (error, stdout, stderr) => {
          let child = stdout.toString("utf-8");
          let ssd = child.replace(/Memory:/, "Ram:");
          m.reply(`${ssd}*Kecepatan* : ${latensi.toFixed(4)} _ms_\n*Bot aktif selama* : ${muptime}`);
            });
}
handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping','speed']

export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' Hari ', h, ' Jam ', m, ' Menit ', s, ' Detik '].map(v => v.toString().padStart(2, 0)).join('')
}