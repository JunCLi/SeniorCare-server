const { DataSource } = require('apollo-datasource')

const authenticate = require('../utils/authentication/authenticate')
const { encryptPassword, comparePassword } = require('../utils/DSHelperFunctions/bcryptFunctions')
const { createCookie, setCookie, retrieveCookie } = require('../utils/authentication/cookieFunctions')
const { createInsertQuery, createUpdateQuery, createSelectQuery } = require('../utils/DSHelperFunctions/makeQueries')

const databaseSchema = 'senior_care'
const jobTable = `${databaseSchema}.job_posting`
const seniorTable = `${databaseSchema}.senior`
const servicesTable = `${databaseSchema}.services`
const servicesJobTable = `${databaseSchema}.services_job`
const blacklistTable = `${databaseSchema}.blacklist_jwt`

class SeniorDB extends DataSource {
	constructor() {
		super()
	}

	initialize(config) {
		this.context = config.context
	}

	async addSeniorLanguages(input) {
		try {
			console.log('input: ', input)
		} catch(err) {
			throw err
		}
	}

	async getAllSeniors(input) {
		try {
			const tokenData = await authenticate(this.context.req, blacklistTable, this.context.postgres)
			const { user_id, userType } = tokenData
	
			console.log('user id: ', user_id)

			if (userType !== 'family') throw 'user type error'
	
			const getSeniorsColumns = [
				'id',
				'family_id',
				'name',
				'date_created',
				'last_modified',
				'birthdate',
				'gender',
				'relation',
				'language',
				'medical_conditions',
				'bio',
				'picture'
			]
			const getSeniorsQuery = createSelectQuery(getSeniorsColumns, seniorTable, 'family_id', user_id)
			const getSeniorsResult = await this.context.postgres.query(getSeniorsQuery)

			console.log('rows', getSeniorsResult.rows)

			return getSeniorsResult.rows
		} catch(err) {
			throw err
		}
	}
}

module.exports = SeniorDB
