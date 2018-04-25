const TeleBot = require('telebot');
const mongoose = require("mongoose");
const config = require('./config');

let controller = require('./controller');

mongoose.connect("mongodb://localhost/itlab");
mongoose.Promise = global.Promise;

const bot = new TeleBot({
    token: config.token,
    usePlugins: ['askUser']
});

const replyMarkup = bot.keyboard([
    [bot.button('/newRecom'), bot.button('/searchRecom'), bot.button('/trendList')]
], {
    resize: true
});

bot.on(['/trendList'], msg => {
  let trends = controller.findTags();
  let msg = '';
  for(var m in trends){
    msg += m.tag;
    msg += ' ' + m.count + '\n';
  }
  return bot.sendMessage(msg.from.id, 'تگ های محبوب', {
      msg,
      replyMarkup
  });
})
bot.on(['/start', 'back'], msg => {
    return bot.sendMessage(msg.from.id, 'گزینه‌ی مورد نظر خود را وارد کنید.', {
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
    let message = '';
    message += 'لطفاً توصیه‌ی مورد نظر خود را وارد کنید';
    // Ask Recomm Message
    return bot.sendMessage(id, message, {
        ask: 'newRecomMessage'
    });
});

bot.on('ask.newRecomMessage', msg => {
    const id = msg.from.id;
    const recom = msg.text;
    recoms[id].recom = recom;
    controller.create(recoms[id]).then(() => {
        let message = 'با موفقیت انجام شد.';
        return bot.sendMessage(id, message, {
            replyMarkup
        });
    }).catch((error) => {
        let message = 'error';
        console.log(error);
        return bot.sendMessage(id, message, {
            replyMarkup
        });
    });
});

bot.on(['/searchRecom'], msg => {
    const id = msg.from.id;
    return bot.sendMessage(id, 'حال خود را برای دریافت توصیه وارد کنید!', {
        ask: 'searchRecom'
    });
});

bot.on('ask.searchRecom', msg => {
    const id = msg.from.id;
    let tag = msg.text;
    controller.find(tag).then((result) => {
        return bot.sendMessage(id, result.recom, {
            replyMarkup
        });
    }).catch((err) => {
        bot.sendMessage(id, 'توصیه‌ای برای تگ مورد نظر موجود نیست :( مجدداً دستور مورد نظر خود را از بین دکمه‌ها انتخاب کنید.', {
            replyMarkup
        });
    });
});

bot.start();