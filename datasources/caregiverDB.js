const { DataSource } = require('apollo-datasource')

const authenticate = require('../utils/authentication/authenticate')
const { encryptPassword, comparePassword } = require('../utils/DSHelperFunctions/bcryptFunctions')
const { createCookie, setCookie, retrieveCookie } = require('../utils/authentication/cookieFunctions')
const { createInsertQuery, createUpdateQuery, createSelectQuery } = require('../utils/DSHelperFunctions/makeQueries')

const databaseSchema = 'senior_care'
const usersTable = `${databaseSchema}.caregiver`
const blacklistTable = `${databaseSchema}.blacklist_jwt`

class CaregiverDB extends DataSource {
	constructor() {
		super()
	}

	initialize(config) {
		this.context = config.context
	}

	async signup(input) {
		try {
			let { email, password } = input
			email = email.toLowerCase()

			const checkDuplicateEmailColumns = [
				'email'
			]
			const checkDuplicateEmailQuery = createSelectQuery(checkDuplicateEmailColumns, usersTable, 'email', email)
			const checkDuplicateEmailResult = await this.context.postgres.query(checkDuplicateEmailQuery)

			if (checkDuplicateEmailResult.rows.length) throw 'A user with this email already exists.'

			const hashedPassword = await encryptPassword(password)
			const insertUserObject = {
				...input,
				password: hashedPassword,
				email: email,
			}
			const insertUserQuery = createInsertQuery(insertUserObject, usersTable)
			await this.context.postgres.query(insertUserQuery)

			return { message: 'success' }
		} catch(err) {
			throw err
		}
	}

	async login(input) {
		try {
			let { email, password } = input
			email = email.toLowerCase()

			const getUserColumns = [
				'id',
				'email',
				'first_name',
				'last_name',
				'password',
			]
			const getUserQuery = createSelectQuery(getUserColumns, usersTable, 'email', email)
			const getUserResult = await this.context.postgres.query(getUserQuery)
			if (!getUserResult.rows.length) throw "A user with this email doesn't exist"

			const { id: user_id, password: dbPassword } = getUserResult.rows[0]
			if (!await comparePassword(password, dbPassword)) throw 'Incorrect password'

			const tokenData = {
				user_id: user_id
			}
			const myJWTToken = await createCookie(tokenData)
			setCookie(myJWTToken, this.context.req.res)

			return {
				message: 'success',
				user_id: user_id,
				token: myJWTToken,
			}
		} catch(err) {
			throw err
		}
	}

	async logout(input) {
		try {
			const jwtCookie = retrieveCookie(this.context.req)
			const { token, exp, iat } = jwtCookie
			const { user_id } = jwtCookie.data

			const blacklistJWTObject = {
				user_id: user_id,
				token: token,
				tokenIssued: iat,
				tokenExpiration: exp
			}

			const blacklistJWTQuery = createInsertQuery(blacklistJWTObject, blacklistTable)
			await this.context.postgres.query(blacklistJWTQuery)

			return { message: 'success' }
		} catch(err) {
			throw err
		}
	}

	async getLoggedUser(input) {
		try {
			const tokenData = await authenticate(this.context.req, blacklistTable, this.context.postgres)
			const { user_id } = tokenData

			return await this.getUserFromId(user_id)
		} catch(err) {
			throw err
		}
	}

	async getUserFromId(user_id) {
		try {
			const getUserColumns = [
				'email',
				'first_name',
				'last_name',
			]
			const getUserQuery = createSelectQuery(getUserColumns, usersTable, 'id', user_id)
			const getUserResult = await this.context.postgres.query(getUserQuery)

			return { 
				...getUserResult.rows[0],
				user_id: user_id,
			}
		} catch(err) {
			throw err
		}
	}
}

module.exports = CaregiverDB
