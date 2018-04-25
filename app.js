const TeleBot = require('telebot');
const mongoose = require("mongoose");
const moodCreate = require('./moodCreate');
const config = require('./config');

let controller = require('./controller');

mongoose.connect("mongodb://localhost/itlab");
mongoose.Promise = global.Promise;

const bot = new TeleBot({
    token: config.token,
    usePlugins: ['askUser']
});

bot.on(['/start', 'back'], msg => {
    let replyMarkup = bot.keyboard([
        [bot.button('/newRecom'), bot.button('/searchRecom')]
    ], {
        resize: true
    });
    return bot.sendMessage(msg.from.id, 'در حال پردازش', {
        replyMarkup
    });
});

bot.on(['/newRecom'], msg => {
    const id = msg.from.id;
    const name = msg.text;
    return bot.sendMessage(id, 'لطفاً یک تگ وارد کنید', {
        ask: 'newRecomTag'
    });
});
let recoms = {};
bot.on('ask.newRecomTag', msg => {
    const id = msg.from.id;
    const tag = msg.text;
    recoms[id] = {
      tag: tag
    };
    let message = tag + '\n';
    message += 'لطفاً توصیه‌ی مورد نظر خود را وارد کنید';
    // Ask Recomm Message
    return bot.sendMessage(id, message, {
        ask: 'newRecomMessage'
    });
});

bot.on('ask.newRecomMessage', msg => {
    let replyMarkup = bot.keyboard([
        [bot.button('/newRecom'), bot.button('/searchRecom')]
    ], {
        resize: true
    });
    const id = msg.from.id;
    const recom = msg.text;
    recoms[id].recom = recom;
    controller.create(recoms[id]).then(()=>{
      let message = 'با موفقیت انجام شد.';
      return bot.sendMessage(id, message, {
        replyMarkup
      });
    }).catch((error)=>{
      let message = 'error';
      console.log(error);
      return bot.sendMessage(id, message, {
        replyMarkup
      });
    });
});

bot.on(['/searchRecommendation'], msg => {
    bot.on('text', msg => {
        console.log(msg);
    })
});

bot.start();