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

    if (message.author.id == botInfo.ownerID) {
        if (botInfo == true) {
            botInfo.CMDS = false
            message.channel.send(`Commands are now disabled.`)
            logger.info(`Commands were disabled on ${guildmsg.name} by ${message.author.tag}`)
        } else {
            botInfo.CMDS = true
            message.channel.send(`Commands are now enabled.`)
            logger.info(`Commands were enabled on ${guildmsg.name} by ${message.author.tag}`)
        }
    } else {
        message.channel.send(`You are not in the developer list, so you can not use this command. (DEVS - Check \`info.json\` and make sure you typed in the correct ID.)`)
    }
}
 
module.exports.help = {
  name: "toggle-cmds"
}