# Discord + UptimeRobot sample bot. `Version 1.1.3`
A Discord bot that uses UptimeRobot to detect if a service is down or not.

## Installation process.
1. Download the source by using `git clone https://github.com/kt5company/discord-uptimerobot` in a command prompt that has Git installed.
2. Make sure you have [Node.js + npm](https://nodejs.org/en/) installed and run `npm i` inside the folder.
3. Open `auth.json` with any text editor and...
3a. Replace `DISCORD TOKEN HERE` with your Discord bot's token.
3b. Replace `UPTIMEROBOT TOKEN HERE` with your UptimeRobot account's token.
4. Open `info.json` with any text editor and...
4a. Replace `YOUR PREFIX HERE` with the prefix you'll be using to trigger the bot.
4b. Replace `OWNER DISCORD ID HERE` with your Discord user ID.
5. When you have everything configured, run `npm start` in your terminal/command prompt.
6. Invite the Discord bot to your server and use `(prefix)ping` to make sure it's running.

## Adding monitors.
Open `commands/service.js` with any text editor and view the example 

### New things in 1.1!
* Disable and enable commands.
* Mentioning the bot for bot info such as version, prefix, and server count.
* Fixed some stupid bugs.
