const monitor = require("./monitor");

module.exports = {
    getDateTime: function() {
        var date = new Date();
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        return month + "/" + day + "/" + year + " - " + hour + ":" + min + ":" + sec;
    },
    
    botUptime: function() {
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
    },
    
    getRandomArbitrary: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    // Find the very cool monitor.
    findMonitor: function(monitors, lookID) {
    var a = null;
    for (var i = 0; i < monitors.length; i++) {
      if (monitors[i].id == lookID) {
        var a = monitors[i]
        return a;
      }
    }
  },
  
  // Color to use for our embed message.
  embedColor: function(arg) {
    var a = null;
    // Switch statements are cool!
    switch(arg) {
      case `9`:
        a = 0xFF0000;
      break;
      case `2`:
        a = 0x00FF00;
      break;
      case `0`:
        a = 0x000000;
      break;
    }
    return a;
  },
  
  // Get a cool emoji to use in our embed message.
  emojiMsg: function(arg) {
    var a = null;
    switch(arg) {
      case `9`:
        a = ":red_circle:";
      break;
      case `2`:
        a = ":green_circle:";
      break;
      case `0`:
        a = ":hourglass:";
      break;
      case `0`:
        a = ":pause_button:";
      break;
      default:
        a = `:grey_question:`
      break;
    }
    return a;
  },
  
  // Finding what our monitor status is.
  monitorStatus: function(arg) {
    var a = null;
    switch (arg) {
      case `9`:
        a = `Down`;
      break;
      case `2`:
        a = `Up`;
      break;
      case `1`:
        a = `Monitor restarting`;
      break;
      case `0`:
        a = `Monitor paused`;
      break;
      default:
        a = `Unknown`
      break;
    }
    return a;
  },
  
  // Definding what our monitor is.
  monitorType: function(port, type) {
    var a = null;
    switch (port) {
      case ``:
        a = `Website (Port 80)`;
      break;
      case `80`:
        a = `Website (Port 80)`;
      break;
      case `8080`:
        a = `Sub-website (Port 8080)`;
      break;
      case `25565`:
        a = `Minecraft Server (Port 25565)`;
      break;
      case `19132`:
        a = `Minecraft Bedrock Server (Port 19132)`;
      break;
      default:
        a = `Not stated`
      break;
    }
    switch (type) {
      case `3`:
        a = "[ping] " + a
      break;
      case `1`:
        a = "[http] " + a
      break;
    }
    console.log(a)
    return a;
  },
}