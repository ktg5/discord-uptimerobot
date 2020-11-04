# Discord + UptimeRobot bot. (Version 1.1)
A Discord bot that uses UptimeRobot to detect if a service is down or not.

## Installation process.
1. Download the source by using the green button that says "Code".
2. Open the source folder with any terminal/command prompt.
3. Make sure you have [Node.js + npm](https://nodejs.org/en/) installed and run `npm i` inside the folder.
4. Open `auth.json` with any text editor and...
4a. Replace `DISCORD TOKEN HERE` with your Discord bot's token.
4b. Replace `UPTIMEROBOT TOKEN HERE` with your UptimeRobot account's token.
5. Open `info.json` with any text editor and...
5a. Replace `YOUR PREFIX HERE` with the prefix you'll be using to trigger the bot.
5b. Replace `OWNER DISCORD ID HERE` with your Discord user ID.
6. When you have everything configured, run `npm start` in your terminal/command prompt.
7. Invite the Discord bot to your server and use `(prefix)ping` to make sure it's running.

## Adding monitors.
Open `commands/service.js` with any text editor and view the example 

### New things in 1.1!
* Disable and enable commands.
* Mentioning the bot for bot info such as version, prefix, and server count.
* Fixed some stupid bugs.