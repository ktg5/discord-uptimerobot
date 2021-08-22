const Discord = require("discord.js");
var logger = require('winston');
const botTools = require('../custom-modules/tools')
const botInfo = require(`../info.json`);

module.exports.run = async (bot, message, args) => {
    // Shortcuts
    var channelmsg = message.channel;
    var guildmsg = message.guild;
    var usernameMSG = message.author.username;

    // ######################################################################################################################

    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var embed = new Discord.MessageEmbed()
        .setColor(randomColor)
        .setTitle(`This bot is powered by an open source project made by ktg5 under KT5 Company.`)
        .addField('GitHub link.', `[Click here to visit the base code for this bot!](https://github.com/kt5company/discord-uptimerobot/)`)
    channelmsg.send({embed});
}
 
module.exports.help = {
  name: "github"
}