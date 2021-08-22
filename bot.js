var Discord = require('discord.js');
var bot = new Discord.Client();
bot.commands = new Discord.Collection();
var fs = require("fs");
var auth = require('./auth.json');
var uptimerobot = require('uptime-robot');
var cl = new uptimerobot(auth["uptimerobot-key"]);
var logger = require('winston');
const botInfo = require(`./info.json`);
const botTools = require(`./custom-modules/tools`);
const lowdb = require(`lowdb`);
const database = require('./custom-modules/database.js');
const db = database.dbInit();
const Monitors = require(`./custom-modules/monitor`);


// Prefix (Define in info.json)
var prefix = botInfo.prefix;


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


// Time
var getDateTime = new Date().toLocaleString();


// RandomColor function
function randomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}


// Find commands (/commands folder)
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        logger.warn("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        logger.info(`CMD: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});


// Initialize Discord Bot
bot.login(auth.token);

bot.on('ready', function (evt) {
    logger.info('Connected to discordapp.com');
    logger.info('Logged into the bot: ');
    logger.info(bot.user.tag);
    logger.info('Online and ready!')
    logger.info(`Reloaded at ${getDateTime}`)
    bot.user.setStatus('available')

    // - USE FOR DEBUG -
    // Use this to find your monitor's ID.
    // cl.getMonitors({customUptimeRatio: [1, 7, 30]}).then((res) => {
    //     console.dir(res);
    // })

    // See all monitor data from 'data/db.json'
    // console.log(Monitors.getAllMonitors(db))

    setInterval(async () => {
        // !!! If the channel defined in "info.json" is not set to defaults (null).
        if (botInfo.guild !== null) {
            if (botInfo.channel !== null) {
                // !!! Find guild and channel defined in "info.json".
                var targetGuild = bot.guilds.cache.get(botInfo.guild);
                var targetChannel = targetGuild.channels.cache.get(botInfo.channel);

                // Find monitors.
                var monitorlist = Monitors.getAllMonitors(db)

                // Delete old messages.
                targetChannel.bulkDelete(monitorlist.length)

                logger.info(`ｰｰｰｰｰｰｰｰｰｰ✄ｰｰｰｰｰｰｰｰｰｰ`);
                logger.info(`5 minute status check:`)
                logger.info(`Date & time: ${getDateTime}`)

                // Check to see if a monitor is down or paused and report about it.
                for(var i = 0; i < monitorlist.length; i++) {
                    await cl.getMonitors({customUptimeRatio: [1, 7, 30]}).then((res) => {
                        var monitor = botTools.findMonitor(res, monitorlist[i].value);
                        var monitStatus = botTools.monitorStatus(monitor.status);
                        var monitColor = botTools.embedColor(monitor.status);
                        var emojiStatus = botTools.emojiMsg(monitor.status);
                        var monitType = botTools.monitorType(monitor.port, monitor.type);
                        
                        switch (monitor.status) {
                            case "9": 
                                if (monitorlist[i].stopped == true) {
                                    return;
                                } else {
                                    var embed = new Discord.MessageEmbed()
                                        .setTitle(`${emojiStatus} ${monitor.friendlyname} is down.`)
                                        .addField(`Type:`, monitType)
                                        .addField(`URL:`, monitor.url)
                                        .addField(`Status:`, monitStatus)
                                        .addField(`24 hour uptime percentage:`, `${monitor.customuptimeratio[0]}%`)
                                        .setFooter(`Powered by the "Discord + UptimeRobot" repo on GitHub.`)
                                        .setColor(monitColor)
                                    targetChannel.send({embed});

                                    monitorlist[i].stopped = true;
                                }
                            break;

                            case "0":
                                if (monitorlist[i].stopped == false) {
                                    return;
                                } else {
                                    var embed = new Discord.MessageEmbed()
                                        .setTitle(`${emojiStatus} ${monitor.friendlyname} is paused.`)
                                        .addField(`Type:`, monitType)
                                        .addField(`URL:`, monitor.url)
                                        .addField(`Status:`, monitStatus)
                                        .addField(`24 hour uptime percentage:`, `${monitor.customuptimeratio[0]}%`)
                                        .setFooter(`Powered by the "Discord + UptimeRobot" repo on GitHub.`)
                                        .setColor(monitColor)
                                    targetChannel.send({embed});

                                    monitorlist[i].stopped = false;
                                }
                            break;
                        }
                    });
                }

                // Run the 5 minute checker.
                for(var i = 0; i < monitorlist.length; i++) {
                    await cl.getMonitors({customUptimeRatio: [1, 7, 30]}).then((res) => {
                        var monitor = botTools.findMonitor(res, monitorlist[i].value);
                        var monitStatus = botTools.monitorStatus(monitor.status);
                        var monitColor = botTools.embedColor(monitor.status);
                        var emojiStatus = botTools.emojiMsg(monitor.status);
                        var monitType = botTools.monitorType(monitor.port);
                        
                        var embed = new Discord.MessageEmbed()
                            .setTitle(`${emojiStatus} ${monitor.friendlyname}`)
                            .addField(`Type:`, monitType)
                            .addField(`URL:`, monitor.url)
                            .addField(`Status:`, monitStatus)
                            .addField(`24 hour uptime percentage:`, `${monitor.customuptimeratio[0]}%`)
                            .setFooter(`Powered by the "Discord + UptimeRobot" repo on GitHub.`)
                            .setColor(monitColor)
                        targetChannel.send({embed});

                        logger.info(`Monitor #${i + 1}: ${monitor.friendlyname}`)
                        logger.info(`Status: ${monitStatus} | 24 hour uptime %: ${monitor.customuptimeratio[0]}`)
                    });
                }
            } else return 
        } else return 
    }, 300000); // You can change the time for how much it'll be until the bot posts another status update here.

    setInterval(() => {
        var messages = [
            {
                name: `services. | ${prefix}service`,
                type: "WATCHING",
            },
        ]
        bot.user.setPresence({
            activity: messages[botTools.getRandomArbitrary(0, messages.length - 1)]
        });
    }, 60000);
});


// Functions
function botUptime() {
    var uptimeSeconds = 0, uptimeMinutes = 0, uptimeHours = 0, uptimeDays = 0;
    
    uptimeSeconds = Math.floor(bot.uptime/1000);
    if(uptimeSeconds > 60){
        uptimeMinutes = Math.floor(uptimeSeconds/60);
        uptimeSeconds = Math.floor(uptimeSeconds % 60);
    }
    if(uptimeMinutes > 60){
        uptimeHours = Math.floor(uptimeMinutes / 60);
        uptimeMinutes = Math.floor(uptimeMinutes % 60);
    }
    if(uptimeHours > 24){
        uptimeDays = Math.floor(uptimeHours / 24);
        uptimeHours = Math.floor(uptimeHours % 24);
    }
    return [`${uptimeDays} days, ${uptimeHours} hours, ${uptimeMinutes} minutes, ${uptimeSeconds} seconds`];
}

// Start
bot.on(`message`, function (message) {
    // Start
    if (bot.user.id === message.author.id) {return}
    if (message.author.bot == true) return;

    // If someone mention me
    if (message.mentions.has(bot.user)) {
        if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
        
        var embed = new Discord.MessageEmbed()
            .setColor(0x6f3ba5)
            .setTitle(`${bot.user.username}`) // Bot username.
            .addField(`Bot prefix:`, `\`${prefix}\``) // Bot prefix (duh).
            .addField(`Servers:`, `\`${bot.guilds.size}\``) // How many servers the bot is in.
            .addField(`Commands enabled?`, `\`${botInfo.CMDS}\``) // Status of commands.
            .addField(`*Uptime (from last reload)*`, `${botUptime()}`) // Gets bot's uptime from last reload.
            .setFooter(`${bot.user.username} ${botInfo.ver} build ${botInfo["build-number"]}`) // Bot username, version, and build.
            .setThumbnail(bot.user.avatarURL)
        message.channel.send({embed});

        logger.info(`The user, ${message.author.tag} has mentioned me on ${message.guild.name}.`)
        logger.info(`Bot prefix: ${prefix}`)
        logger.info(`Servers:`, `\`${bot.guilds.size}\``)
        logger.info(`CMDS status: ${botInfo.CMDS}`)
        logger.info(`Uptime: ${botUptime()}`)
    }

    if (message.content.substring(0, prefix.length) == prefix) {
        var args = message.content.substring(prefix.length).split(' ');
        var cmd = args[0];
        
        let commandfile = bot.commands.get(cmd);

        if (botInfo.CMDS == true) {
            if (commandfile) {
                commandfile.run(bot, message, args, db);
            }
        } else {
            if (message.author.id == botInfo.ownerID1 || message.author.id == botInfo.ownerID2 || message.author.id == botInfo.ServerHostALT) {
                if (commandfile) {
                    commandfile.run(bot, message, args, db);
                }
            } else {
                message.channel.send(`All commands were disabled by developer. (DEVS - Use ${prefix}toggle-cmds to toggle on commands.)`)
            }
        }
    }
});
