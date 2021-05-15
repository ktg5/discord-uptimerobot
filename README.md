# Discord + UptimeRobot sample bot. `Version 2.0`
A Discord bot that uses UptimeRobot to detect if a service is down or not.

## For those who are updating to v2 of this repo, PLEASE REDO THE INSTALLATION PROCESS BELOW.

## Installation process.
Part 1 -- Getting started:
1. Download the source by using `git clone https://github.com/kt5company/discord-uptimerobot` in a command prompt that has Git installed.
2. Make sure you have [Node.js + npm](https://nodejs.org/en/) installed and run `npm i` inside the folder.
3. Open `auth.json` with any text editor and...
3a. Replace `DISCORD TOKEN HERE` with your Discord bot's token.
3b. Replace `UPTIMEROBOT TOKEN HERE` with your UptimeRobot account's token.
4. Open `info.json` with any text editor and...
4a. Replace `YOUR DISCORD ID HERE` with your Discord user ID.
4b. Replace `YOUR PREFIX HERE` with the prefix you'll be using to trigger the bot.
(Optional for those who would like monitor reporting) 4c. Change the values in `"guild"` to your chosen guild ID and `"channel"`to your chosen channel ID.
5. When you have everything configured, run `npm start` in your terminal/command prompt.
6. Invite the Discord bot to your server and use `(prefix)ping` to make sure it's running.

Part 2 -- Setting up monitors: (VERY IMPORTANT)
Since v2, monitors are now defined in `data/db.json`. For every monitor -- there should be another list in the collection.
If you look in the `commands/service.js` script, you will see an "example monitor".

First you must find the number for the monitor.
Go to line 24 and uncomment the line.
Save the file and run the command without any args.

Check your console and you should see a list of monitors from your UptimeRobot account.
Find the monitor ID you would like to use for this example, it will be above the monitor's `"friendlyname"`.
In the "db.json" file, in the `"name"` value the monitor whatever you like because it doesn't really matter. But in the `"value"` value, enter in your monitor ID.

You can now change the example case name in the `service` command to use when you want to look at the information for that monitor.

If you wanted to add more monitors, repeat the 2nd part of this process, copy the lines 3-6 in `data.json` and make sure to change the `"value"` to your other monitor ID, and copy the lines 26-50 in `commands/service.js` and make sure to change the case name to something different and change the `monitorlist[1].value` to `monitorlist[2].value`; the more you add, the higher the number is.

## Questions or need help?

[Join our support server!](https://discord.gg/8QTX46D)