const { DataSource } = require('apollo-datasource')

const authenticate = require('../utils/authentication/authenticate')
const { encryptPassword, comparePassword } = require('../utils/DSHelperFunctions/bcryptFunctions')
const { createCookie, setCookie, retrieveCookie } = require('../utils/authentication/cookieFunctions')
const { createInsertQuery, createUpdateQuery, createSelectQuery } = require('../utils/DSHelperFunctions/makeQueries')

const databaseSchema = 'senior_care'
const usersTable = `${databaseSchema}.users`
const caregiverTable = `${databaseSchema}.caregiver`
const blacklistTable = `${databaseSchema}.blacklist_jwt`

class CaregiverDB extends DataSource {
	constructor() {
		super()
	}

	initialize(config) {
		this.context = config.context
	}

	async getAllCaregivers(input) {
		try {
			
			const getUsersColumns = [
				'*',
			]
			const getUsersQuery = createSelectQuery(getUsersColumns, caregiverTable)
			const getUsersResult = await this.context.postgres.query(getUsersQuery)

			return getUsersResult.rows
		} catch(err) {
			throw err
		}
	}

}

module.exports = CaregiverDB