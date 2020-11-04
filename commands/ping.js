const Discord = require("discord.js");
var logger = require('winston');
const botTools = require('../custom-modules/tools')
const botInfo = require(`./info.json`);

module.exports.run = async (bot, message, args) => {
    // Shortcuts
    var channelmsg = message.channel;
    var guildmsg = message.guild;
    var usernameMSG = message.author.username;

    // ######################################################################################################################

    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var embed = new Discord.RichEmbed()
        .setColor(randomColor)
        .addField('**:ping_pong:**', `**${Math.round(bot.ping)}ms**`)
    channelmsg.send({embed});
    logger.info(`${Math.round(bot.ping)} ping, tested on ${guildmsg.name} by ${message.author.tag}`)
}
 
module.exports.help = {
  name: "ping"
}