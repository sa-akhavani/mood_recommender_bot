let express = require('express');
const app = express();
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/itlab");
mongoose.Promise = global.Promise;

const TeleBot = require('telebot');

const bot = new TeleBot('583347744:AAGr1XHfoAm0E7OWxiVXEI0nOARmKqwSuhY');

bot.on('text', (msg) => msg.reply.text('Bye behx'));

bot.start();

module.exports = {app,bot};
