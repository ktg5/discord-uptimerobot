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
}