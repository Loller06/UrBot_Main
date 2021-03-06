  const Discord = require("discord.js")

const fs = require("fs");
const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const config = require("./config.json");

var PREFIX = config.prefix;

var bot = new Discord.Client();
var servers = {};
var playing = ' ';

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
  });
});

bot.on('message', async message => {
  
  bot.user.setPresence({game: {name: `online with ${bot.guilds.reduce((p, c) => p + c.memberCount, 0).toLocaleString()} people!`, type: 0}});  
  
if (!message.content.startsWith(PREFIX) || message.author.bot) return;

const args = message.content.slice(PREFIX.length).split(' ');
const command = args.shift().toLowerCase();
  
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args);
  } catch (err) {
    console.error(err);
    message.reply(`ERROR! HERE'S THE LOG: " ${err} "`)
  }
  
});

bot.login(process.env['SECRET']);