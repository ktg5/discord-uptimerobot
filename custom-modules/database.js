const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data/db.json');

module.exports = {
	dbInit: function() {
		const db = low(adapter);
		db.read();
		
		return db;
	},

	dbGetTableValues: function(db, table) {
		return db.get(table).value();
	},

	dbSetTableValue: function(db, tableName, data) {
		db.get(tableName).push(data).write();
	}
}