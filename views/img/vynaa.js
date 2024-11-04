import os from 'os';
import chalk from 'chalk';

export async function handleConnectionOpen(sock) {
    console.log(chalk.green('Tersambung'));

    const deviceName = os.hostname();
    const message = `*Bot aktif*\n◦ *Os*: ${os.platform()} ${os.release()}\n◦ *Device*: ${deviceName}\n◦ *NameBot*: ${global.wm}\n◦ *Connected time*: ${new Date().toLocaleString()}\n\n*Aturan:*\n1. Dilarang memperjualbelikan script ini.\n2. Hak cipta milik Vynaa Valerie.\n\n*“Dan janganlah kamu makan harta di antara kamu dengan jalan yang batil, dan janganlah kamu membunuh dirimu sendiri. Sesungguhnya Allah adalah Maha Penyayang kepadamu.”* (QS. Al-Baqarah: 188)`;

    try {
        await sock.sendMessage('6282389924037@s.whatsapp.net', { text: message });
        console.log(chalk.green('Pesan berhasil dikirim ke admin!'));
    } catch (error) {
        console.error(chalk.red('Gagal mengirim pesan: '), error);
    }
}
