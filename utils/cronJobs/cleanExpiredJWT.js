const postgres = require('../../config/postgres')
const { createSelectQuery, createDeleteQuery } = require('../DSHelperFunctions/makeQueries')

const DBName = 'boilerplate.blacklist_jwt'

const getBlacklistedJWT = async () => {
	const checkJWTColumns = [
		'token',
		'token_expiration',
	]
	const checkJWTQuery = createSelectQuery(checkJWTColumns, DBName)
	const blacklistedJWTs = await postgres.query(checkJWTQuery)

	return blacklistedJWTs.rows
}

const checkExpiredJWT = async () => {
	const blacklistedJWTs = await getBlacklistedJWT()

	return blacklistedJWTs.filter(blacklistedJWT => (
		Date.now() < blacklistedJWT.token_expiration && blacklistedJWT
	))
}

const cleanExpiredJWT = async () => {
	const expiredJWTs = await checkExpiredJWT()

	expiredJWTs.forEach(async expiredJWT => {
		const deleteExpiredJWTQuery = createDeleteQuery(DBName, 'token_expiration', expiredJWT.token_expiration)
		await postgres.query(deleteExpiredJWTQuery)
	})
	
	console.log('Cleaned blacklisted JWTs on: ', Date.now())
}

module.exports = cleanExpiredJWT