const { DataSource } = require('apollo-datasource')

const authenticate = require('../utils/authentication/authenticate')
const { encryptPassword, comparePassword } = require('../utils/DSHelperFunctions/bcryptFunctions')
const { createCookie, setCookie, retrieveCookie } = require('../utils/authentication/cookieFunctions')
const { createInsertQuery, createUpdateQuery, createSelectQuery } = require('../utils/DSHelperFunctions/makeQueries')

const databaseSchema = 'senior_care'
const usersTableDefault = `${databaseSchema}.users`
const blacklistTable = `${databaseSchema}.blacklist_jwt`

class KeyContactDB extends DataSource {
	constructor() {
		super()
	}

	initialize(config) {
		this.context = config.context
	}

	async userIDGenerator(userType, email) {
		const idTypeComposite = userType === 'caregiver'
			? 'ca'
			: 'kc'
		const idEmailComposite = email.substring(0, 3)
		const hashedDate = await encryptPassword(`${Math.floor(Date.now() / 1000 + 60)}`)
		const idDateComposite = hashedDate.split('$').reverse()[0].substring(0, 20)
		return `${idTypeComposite}-${idEmailComposite}-${idDateComposite}`
	}

	async uniqueIDGenerator(userType, email) {
		const id = await this.userIDGenerator(userType, email)

		const checkIDColumns = [
			'id',
		]
		const checkDuplicateIDQuery = createSelectQuery(checkIDColumns, usersTableDefault, 'id', id)
		const checkDuplicateQueryResult = await this.context.postgres.query(checkDuplicateIDQuery)
		if (checkDuplicateQueryResult.rows.length) this.uniqueIDGenerator(userType, email)

		return id
	}

	checkUsersTable(userType) {
		const usersTable = userType === 'caregiver'
			? `${databaseSchema}.caregiver`
			: `${databaseSchema}.key_contact`

		return usersTable
	}

	async signup(input) {
		try {
			let { email, password, userType } = input
			const usersTypeTable = this.checkUsersTable(userType)
			email = email.toLowerCase()

			const checkDuplicateEmailColumns = [
				'email',
			]
			const checkDuplicateEmailQuery = createSelectQuery(checkDuplicateEmailColumns, usersTableDefault, 'email', email)
			const checkDuplicateEmailResult = await this.context.postgres.query(checkDuplicateEmailQuery)
			if (checkDuplicateEmailResult.rows.length) throw `A user with this email already exists.`

			const id = await this.uniqueIDGenerator(userType, email)
			const hashedPassword = await encryptPassword(password)
			const insertUserObject = {
				...input,
				id: id,
				password: hashedPassword,
				email: email,
			}
			const insertUserQuery = createInsertQuery(insertUserObject, usersTableDefault)
			await this.context.postgres.query(insertUserQuery)

			const insertUsersTypeObject = {
				user_id: id,
			}
			const insertUsersTypeQuery = createInsertQuery(insertUsersTypeObject, usersTypeTable)
			await this.context.postgres.query(insertUsersTypeQuery)

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
				'user_type',
			]
			const getUserQuery = createSelectQuery(getUserColumns, usersTableDefault, 'email', email)
			const getUserResult = await this.context.postgres.query(getUserQuery)
			const userType = getUserResult.rows.length && getUserResult.rows[0].user_type

			const userTypeString = userType === 'caregiver' ? 'caregiver' : 'key contact'
			if (!userType) throw `A ${userTypeString} with this email doesn't exist`

			const { id: user_id, password: dbPassword, first_name, last_name } = getUserResult.rows[0]
			if (!await comparePassword(password, dbPassword)) throw 'Incorrect password'

			const tokenData = {
				user_id: user_id,
				userType: userType,
			}
			const myJWTToken = await createCookie(tokenData)
			setCookie(myJWTToken, this.context.req.res)

			return {
				message: 'success',
				user: {
					email: email,
					user_id: user_id,
					first_name: first_name,
					last_name: last_name,
				},
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

	// async getUserFromId(user_id, userType) {
	// 	try {
	// 		const usersTable = this.checkUsersTable(userType)
	// 		const getUserColumns = [
	// 			'email',
	// 			'first_name',
	// 			'last_name',
	// 		]
	// 		const getUserQuery = createSelectQuery(getUserColumns, usersTable, 'id', user_id)
	// 		const getUserResult = await this.context.postgres.query(getUserQuery)

	// 		return { 
	// 			...getUserResult.rows[0],
	// 			user_id: user_id,
	// 			userType: userType,
	// 		}
	// 	} catch(err) {
	// 		throw err
	// 	}
	// }
}

module.exports = KeyContactDB
