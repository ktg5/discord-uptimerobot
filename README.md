# Discord + UptimeRobot sample bot. `Version 2.1`
A Discord bot that uses UptimeRobot to detect if a service is down or not.

## For those who are updating to v2 of this repo, PLEASE REDO THE INSTALLATION PROCESS BELOW.

## Installation process.
### Part 1 -- Getting started:
1. Download the source by using `git clone https://github.com/kt5company/discord-uptimerobot` in a command prompt that has Git installed.
2. Make sure you have [Node.js + npm](https://nodejs.org/en/) installed and run `npm i` inside the folder.
3. Open `auth.json` with any text editor and...
3a. Replace `DISCORD TOKEN HERE` with your Discord bot's token.
3b. Replace `UPTIMEROBOT TOKEN HERE` with your UptimeRobot account's token.
4. Open `info.json` with any text editor and...
* Replace `YOUR DISCORD ID HERE` with your Discord user ID.
* Replace `YOUR PREFIX HERE` with the prefix you'll be using to trigger the bot.

6. When you have everything configured, run `npm start` in your terminal/command prompt.
7. Invite the Discord bot to your server and use `(prefix)ping` to make sure it's running.

**Make sure that all IDs you use are still in the quotes or else the last 2 numbers will be zeros, this goes with all IDs in the JSON files.**

### Part 2 -- Setting up monitors: (VERY IMPORTANT)
Since v2, monitors are now defined in `data/db.json`. For every monitor -- there should be another list in the collection.
If you look in the `commands/service.js` script, you will see an "example monitor".

First you must find the number for the monitor.
Go to line 24 and uncomment the line.
Save the file and run the command without any args.

Check your console and you should see a list of monitors from your UptimeRobot account.
Find the monitor ID you would like to use for this example, it will be above the monitor's `"friendlyname"`.
In the "db.json" file, in the `"name"` value the monitor whatever you like because it doesn't really matter. But in the `"value"` value, enter in your monitor ID.

You can now change the example case name in the `service` command to use when you want to look at the information for that monitor.

If you wanted to add more monitors, repeat the 2nd part of this process, copy the lines 3-7 in `db.json` and make sure to change the `"value"` to your other monitor ID, and copy the lines 26-50 in `commands/service.js` and make sure to change the case name to something different and change the `monitorlist[0].value` to `monitorlist[1].value`; the more you add, the higher the number is.

### (Opinional) Part 3 -- Automatic checking of monitors:
Search for your info.json and change the values in `"guild"` to your chosen guild ID and `"channel"`to your chosen channel ID.

**Make sure that the IDs you use are still in the quotes or else the last 2 numbers will be zeros, this goes with all IDs in the JSON files.**

## What's new in v 2.1?
* Deletes old "auto-monitor-reporting" messages.
* Fixed bugs.

## Questions or need help?
[Find questions to things you might be asking yourself](http://kt5company.com/docs/discord-uptimerobot)
[Join our support server!](https://discord.gg/8QTX46D)
