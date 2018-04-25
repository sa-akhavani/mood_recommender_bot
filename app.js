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

const replyMarkup = bot.keyboard([
    [bot.button('/newRecom'), bot.button('/searchRecom')]
], {
    resize: true
});

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

bot.on('ask.newRecomTag', msg => {
    const id = msg.from.id;
    const name = msg.text;
    let message = name + '\n';
    message += 'لطفاً توصیه‌ی مورد نظر خود را وارد کنید';
    // Ask Recomm Message
    return bot.sendMessage(id, message, {
        ask: 'newRecomMessage'
    });
});

bot.on('ask.newRecomMessage', msg => {
    const id = msg.from.id;
    const name = msg.text;
    let message = 'با موفقیت انجام شد.';
    return bot.sendMessage(id, message, {
        replyMarkup
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
    console.log('finding tag: ' + tag);
    controller.find(tag).then(function (err, result) {});
    return bot.sendMessage(id, 'با موفقیت انجام شد.', {
        replyMarkup
    });
});

bot.start();