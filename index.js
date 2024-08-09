const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');
const express = require('express');
const app = express();

// Replace with your bot token
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

app.get('/', (req, res) => {
    res.send('Bot is running');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});

// Handle the /start command
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to the Music Bot! Use /play <song name> to play a song.");
});

// Handle the /play command
bot.onText(/\/play (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const song = match[1];

    try {
        // You would replace this with logic to search for the song and get a valid YouTube ID
        const youtubeUrl = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`; // Placeholder URL
        
        // Send the YouTube video as audio
        const stream = ytdl(youtubeUrl, { filter: 'audioonly' });
        bot.sendAudio(chatId, stream, { title: song });
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "Sorry, I couldn't find that song.");
    }
});
