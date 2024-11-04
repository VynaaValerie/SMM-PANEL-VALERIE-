import fs from 'fs';

// Load service data with error handling
let services;
try {
    services = JSON.parse(fs.readFileSync('./lib/service.json'));
} catch (error) {
    console.error("Error loading or parsing service.json:", error);
    throw `[❗] Gagal memuat data layanan. Pastikan file 'service.json' sudah benar.`;
}

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
            response += `\nKetik nama kategori *.cariproduk tiktok* atau ketik *allproduk* untuk melihat layanan lebih banyak.`;
        }

        return await m.reply(response);
    }

    // Perform search if there is text input
    let results = searchService(text);
    
    if (results.length === 0) {
        return await m.reply(`[❗] Tidak ditemukan layanan atau produk dengan nama atau kategori yang sesuai "${text}".`);
    }

    // Limit results if too many are found
    let limitedResults = results.slice(0, 10); // Limit to 10 results for readability

    // Format the search results to display all results
    let response = `*Hasil Pencarian untuk:* "${text}"\n\n`;
    limitedResults.forEach(service => {
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

    // Notify user if there are more results not shown
    if (results.length > 10) {
        response += `\n*[ℹ️]* Ada lebih banyak hasil yang tidak ditampilkan. Coba gunakan kata kunci yang lebih spesifik.`;
    }

    // Send response with results
    await m.reply(response);
};

handler.help = ['cariservice', 'cariproduk'];
handler.tags = ['search'];
handler.command = /^(cariservice|cariproduk)$/i;

export default handler;