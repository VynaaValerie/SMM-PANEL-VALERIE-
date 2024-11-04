import axios from 'axios';

let handler = async (m, { conn }) => {
  let today = new Date();

  // Set timezone to Asia/Jakarta (WIB)
  let options = { timeZone: 'Asia/Jakarta', hour: '2-digit', hour12: false };
  let curHr = today.toLocaleTimeString('id-ID', options).split(':')[0];
  let timeOfDay;

  // Determine the greeting based on WIB time
  if (curHr < 12) {
    timeOfDay = 'pagi🌄';
  } else if (curHr < 18) {
    timeOfDay = 'siang⛅';
  } else {
    timeOfDay = 'malam🌙';
  }

  // URL of the video/image
  let imageUrl = 'https://itzpire.com/file/3d59dd064ab8.mp4';

  try {
    // Fetch the media as a buffer
    let response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    let mediaBuffer = Buffer.from(response.data, 'binary');

    let payText = `
Halo kak, selamat ${timeOfDay}
> ▧ .deposit
> ▧ .dompet
> ▧ .order
> ▧ .tutor
> ▧ .ping
> ▧ .info

> ▧ .cekorder 
> ▧ .createrefil
> ▧ .cekrefil
> ▧ .service 
> ▧ .cariservice

> ▧ .daftar 
> ▧ .ceksn
> ▧ .unreg

> ▧ .owner
> ▧ .ownmenu
`;

    // Send a reaction to the message
    await conn.relayMessage(m.chat, {
      reactionMessage: { 
        key: m.key, 
        text: '✅' 
      }
    }, { messageId: m.key.id });

    // Send the media with the text
    await conn.sendMessage(m.chat, {
      video: mediaBuffer, // or use `image: mediaBuffer` if it's an image
      caption: payText,
    });
  } catch (error) {
    console.error('Failed to fetch media:', error);
    await m.reply('Gagal mengirim media. Silakan coba lagi.');
  }
};

handler.help = ['tqto'];
handler.tags = ['info'];
handler.command = /^(menu)$/i;

export default handler;