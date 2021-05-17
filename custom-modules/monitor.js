const database = require("./database.js");

const TABLE_NAME = "monitors";

module.exports = { 
	getMonitor: function(db, name) {
		const monitors = database.dbGetTableValues(db, TABLE_NAME);
		const monitor = monitors ? monitors.find((element) => element.name === name) : null;
		return monitor;
	},

	getAllMonitors: function(db) {
		const monitors = database.dbGetTableValues(db, TABLE_NAME);
		return monitors;
	}
}