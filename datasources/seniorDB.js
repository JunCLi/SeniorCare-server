const { DataSource } = require('apollo-datasource')

const authenticate = require('../utils/authentication/authenticate')
const { encryptPassword, comparePassword } = require('../utils/DSHelperFunctions/bcryptFunctions')
const { createCookie, setCookie, retrieveCookie } = require('../utils/authentication/cookieFunctions')
const { createInsertQuery, createUpdateQuery, createSelectQuery, createInnerJoinSelect } = require('../utils/DSHelperFunctions/makeQueries')

const databaseSchema = 'senior_care'
const jobTable = `${databaseSchema}.job_posting`
const seniorTable = `${databaseSchema}.senior`
const languageTable = `${databaseSchema}.language`
const languageSeniorTable = `${databaseSchema}.language_senior`
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

	async getSeniorLanguages(id) {
		try {
			const getLanguagesQuery = createInnerJoinSelect(['title'], languageSeniorTable, languageTable, 'language_id', 'id', 'senior_id', id)
			const getLanguagesResult = await this.context.postgres.query(getLanguagesQuery)
			return getLanguagesResult.rows.map(language => language.title)
		} catch(err) {
			throw err
		}
	}

	async getAllSeniors(input) {
		try {
			const tokenData = await authenticate(this.context.req, blacklistTable, this.context.postgres)
			const { user_id, userType } = tokenData

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
				'medical_conditions',
				'bio',
				'picture'
			]
			const getSeniorsQuery = createSelectQuery(getSeniorsColumns, seniorTable, 'family_id', user_id)
			const getSeniorsResult = await this.context.postgres.query(getSeniorsQuery)

			const seniorsWithLanguage = await Promise.all(getSeniorsResult.rows.map(async senior => (
				{
					...senior,
					language: await this.getSeniorLanguages(senior.id)
				}
			)))

			return seniorsWithLanguage
		} catch(err) {
			throw err
		}
	}
}

module.exports = SeniorDB
