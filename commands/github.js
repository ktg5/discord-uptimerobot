const Discord = require("discord.js");
var logger = require('winston');

var special_ids = {
    ownerID1: 184070212012736512,
    ownerID2: 184068065594572801,
    CupheadID: 244944893317873666,
    ServerHostALT: 474219060721221693
};

const botTools = require('../custom-modules/tools')
module.exports.run = async (bot, message, args) => {
    // Shortcuts
    var channelmsg = message.channel;
    var guildmsg = message.guild;
    var usernameMSG = message.author.username;

    // ######################################################################################################################

    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var embed = new Discord.RichEmbed()
        .setColor(randomColor)
        .addField('GitHub link.', `[Click here to visit the code!](https://github.com/kt5company/discord-uptimerobot/)`)
    channelmsg.send({embed});
}
 
module.exports.help = {
  name: "github"
}