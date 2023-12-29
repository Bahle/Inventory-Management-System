function lastInsertID(con) {
	return new Promise((resolve, reject) => {
		// pool.getConnection(function(err, con) {
		con.query(`SELECT LAST_INSERT_ID() AS last_record`, function(err, dbResults) {
			if (err) {
				reject(err);
			} else {
				console.log('GOT!!!' + JSON.stringify(dbResults))

				resolve(dbResults[0].last_record);
			}
		});
		// });
	});
}

module.exports = lastInsertID;