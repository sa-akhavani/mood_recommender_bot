const TeleBot = require('telebot');
const bot = new TeleBot('583347744:AAGr1XHfoAm0E7OWxiVXEI0nOARmKqwSuhY');
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/itlab");
mongoose.Promise = global.Promise;

let controller = require('./controller');

bot.on(['/start', 'back'], msg => {
    let replyMarkup = bot.keyboard([
	[bot.button('/newRecom'), bot.button('/sendRecommendation')]
    ], {resize: true});
    return bot.sendMessage(msg.from.id, 'در حال پردازش', {replyMarkup});
});

bot.on(['/newRecom'], msg => {
    bot.sendMessage(msg.from.id, 'Enter tag').then(() => {
      bot.event('/getTag', msg);
    });
});

const moodCreate = require('./moodCreate');
let recom = {
}
bot.on(['/getTag'], msg => {
  bot.on('text', (text) => {
    recom.tags = text.text;
    bot.sendMessage(msg.from.id, 'Enter recom').then(() => {
      bot.event('/getRecom', msg)
  });
  });
});

bot.on(['/getRecom'], msg => {
  bot.on('text', (text) => {
    recom.recom = text.text;
    bot.sendMessage(msg.from.id, 'Created');
  })
});

bot.on(['/searchRecommendation'], msg => {
    bot.on('text', msg => {

    })
});


bot.start();
