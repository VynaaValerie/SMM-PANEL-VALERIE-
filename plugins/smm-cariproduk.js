import fs from 'fs';

// Load service data
const services = JSON.parse(fs.readFileSync('./lib/service.json'));

// Fuzzy search function
let searchService = (query) => {
    query = query.toLowerCase();
    return services.filter(service => {
        return (
            service.name.toLowerCase().includes(query) ||
            service.category.toLowerCase().includes(query)
        );
    });
};

let handler = async function (m, { text }) {
    // If no search text is provided, show available categories
    if (!text) {
        let categories = [...new Set(services.map(service => service.category))]; // Get unique categories
        let response = `*[❓]* Kamu mau lihat layanan apa yang tersedia? Berikut daftar kategori yang bisa dicari:*\n\n` +
            `• Instagram\n` +
            `• Facebook\n` +
            `• YouTube\n` +
            `• Threads\n` +
            `• Telegram\n` +
            `• Discord\n` +
            `• SoundCloud\n` +
            `• Twitter\n` +
            `• Spotify\n` +
            `• TikTok\n` +
            `• Google\n` +
            `• Shopee\n` +
            `• Web Traffic\n` +
            `• Promo\n\n`;
        
        // Indicate if there are more categories
        if (categories.length > 5) {
            response += `\nKetik nama kategori *.cariproduk tiktok* atau ketik *.allproduk* untuk melihat layanan lebih banyak.`;
        }

        return await m.reply(response);
    }

    // Perform search if there is text input
    let results = searchService(text);
    
    if (results.length === 0) {
        throw `[❗] Tidak ditemukan layanan atau produk dengan nama atau kategori yang sesuai "${text}" coba ketik *.allservice* dulu lalu coba cari lagi`;
    }

    // Format the search results to display all results
    let response = `*Hasil Pencarian untuk:* "${text}"\n\n`;
    results.forEach(service => {
        response += `• *ID:* ${service.id}\n`;
        response += `• *Kategori:* ${service.category}\n`;
        response += `• *Nama:* ${service.name}\n`;
        response += `• *Harga:* ${service.price}\n`;
        response += `• *Min:* ${service.min}\n`;
        response += `• *Max:* ${service.max}\n`;
        response += `• *Deskripsi:* ${service.description}\n`;
        response += `• *Status:* ${service.status === "1" ? "Tersedia" : "Tidak Tersedia"}\n`;
        response += `• *Refill:* ${service.refill === "1" ? "Ya" : "Tidak"}\n\n`;
    });

    // Send response with results
    await m.reply(response);
};

handler.help = ['cariservice', 'cariproduk'];
handler.tags = ['search'];
handler.command = /^(cariservice|cariproduk)$/i;

export default handler;
