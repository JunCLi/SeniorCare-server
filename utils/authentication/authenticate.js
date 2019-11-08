const jwt = require('jsonwebtoken')

const { cookieName, cookieSigniture } = require('./configureAuth')
const { createSelectQuery } = require('../DSHelperFunctions/makeQueries')

const authenticate = async (req, blacklistDB, postgres) => {
	try {
		const jwtCookie = req.cookies[cookieName]

		if (blacklistDB) {
			const getJWTColumns = [
				'token',
			]
			const getJWTQuery = createSelectQuery(getJWTColumns, blacklistDB, 'token', jwtCookie)
			const getJWTResult = await postgres.query(getJWTQuery)

			if (getJWTResult.rows.length) throw 'blacklisted JWT'
		}
		
		const verified_information = jwt.verify(jwtCookie, cookieSigniture)
    return verified_information.data
  } catch(err) {
		throw err
  }
}

module.exports = authenticate
