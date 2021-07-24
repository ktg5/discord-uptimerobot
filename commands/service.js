const Discord = require("discord.js");
var logger = require('winston');
const auth = require(`../auth.json`)
const botInfo = require(`../info.json`);
const botTools = require('../custom-modules/tools')
var uptimerobot = require('uptime-robot');
var cl = new uptimerobot(auth["uptimerobot-key"]);
var Monitors = require(`../custom-modules/monitor`);

const prefix = botInfo.prefix
module.exports.run = async (bot, message, args, db) => {
    // Shortcuts
    var channelmsg = message.channel;
    var guildmsg = message.guild;
    var usernameMSG = message.author.username;
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var monitorlist = Monitors.getAllMonitors(db)

    // ######################################################################################################################

    await cl.getMonitors({customUptimeRatio: [1, 7, 30]}).then((res) => {
      switch (args[1]) {
        case `example`:
          // Example monitor
          // 
          // Monitors are defined in "data/db.json", for every monitor -- there should be another list in the collection.
          // See the README.md for more information.
          var monitor = botTools.findMonitor(res, monitorlist[0].value);
          var monitStatus = botTools.monitorStatus(monitor.status);
          var monitColor = botTools.embedColor(monitor.status);
          var emojiStatus = botTools.emojiMsg(monitor.status);
          var monitType = botTools.monitorType(monitor.port, monitor.type);
          
          var embed = new Discord.MessageEmbed()
            .setTitle(`${emojiStatus} ${monitor.friendlyname}`)
            .addField(`Type:`, monitType)
            .addField(`URL:`, monitor.url)
            .addField(`Status:`, monitStatus)
            .addField(`Today's uptime percentage:`, `${monitor.customuptimeratio[0]}%`)
            .setFooter(`Uptime detection by UptimeRobot.`)
            .setColor(monitColor)
          channelmsg.send({embed});

          logger.info(`----------------------------------------------`)
          logger.info(`${monitor.friendlyname} was tested by ${usernameMSG} on ${guildmsg.name}.`)
          logger.info(`Status: ${monitStatus} | Today's uptime %: ${monitor.customuptimeratio[0]}`)
        break;
        default:
          var embed = new Discord.MessageEmbed()
            .setTitle(`Please select your monitor you'd like to check on.`)
            .addField(`\`${prefix}service example\``, `Example monitor.`)
            .setColor(`0xFFFFDB`)
          channelmsg.send({embed});
        break;
      }
  });
}
 
module.exports.help = {
  name: "service"
}
