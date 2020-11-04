// Modules
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

// Bot prefix (DEFINE IN "info.json")
var prefix = botInfo.prefix;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Find commands
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

    // Set bot status
    bot.user.setStatus('available')
    setInterval(() => {
        var messages = [
            {
                name: `services | dt:service`,
                type: "WATCHING",
            }
        ]
        bot.user.setPresence({
            game: messages[botTools.getRandomArbitrary(0, messages.length)]
        });
    }, 60000);
});

bot.on(`message`, function (message) {
    // Start
    if (bot.user.id === message.author.id) {return}
    if (message.author.bot == true) return;

    // If someone mention me
    if (message.isMentioned(bot.user)) {
        var embed = new Discord.RichEmbed()
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
        logger.info(`Servers: ${bot.guilds.size}`) // How many servers the bot is in.
        logger.info(`CMDS status: ${botInfo.CMDS}`)
        logger.info(`Uptime: ${botUptime()}`)
    }

    if (message.content.substring(0, 3) == prefix) {
        var args = message.content.substring(3).split(' ');
        var cmd = args[0];
        
        let commandfile = bot.commands.get(cmd);

        // Run commands within the folder "commands"
        if (commandfile) {
            commandfile.run(bot, message, args);
        }
    }
});