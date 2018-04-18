const TeleBot = require('telebot');

const bot = new TeleBot('583347744:AAGr1XHfoAm0E7OWxiVXEI0nOARmKqwSuhY');

bot.on('text', (msg) => msg.reply.text('salam behx'));

bot.start();

