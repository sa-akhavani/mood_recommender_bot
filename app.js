const TeleBot = require('telebot');
const bot = new TeleBot('583347744:AAGr1XHfoAm0E7OWxiVXEI0nOARmKqwSuhY');
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/itlab");
mongoose.Promise = global.Promise;

bot.on(['/start', 'back'], msg => {
    let replyMarkup = bot.keyboard([
        [bot.button('/newRecommendation'), bot.button('/searchRecommendation')]
    ], {
        resize: true
    });
    return bot.sendMessage(msg.from.id, 'در حال پردازش', {
        replyMarkup
    });
});

bot.on(['/newRecommendation'], msg => {
    bot.on('text', msg => {
        console.log(msg.text);
    })
});

bot.on(['/searchRecommendation'], msg => {
    bot.on('text', msg => {
        console.log(msg);
    })
});

bot.start();