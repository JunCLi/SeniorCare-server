const { DataSource } = require('apollo-datasource')

const authenticate = require('../utils/authentication/authenticate')
const { encryptPassword, comparePassword } = require('../utils/DSHelperFunctions/bcryptFunctions')
const { createCookie, setCookie, retrieveCookie } = require('../utils/authentication/cookieFunctions')
const { createInsertQuery, createUpdateQuery, createSelectQuery, createSelectAndQuery } = require('../utils/DSHelperFunctions/makeQueries')

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
			const conditionsConversion = {
				gender: '=',
				availability: '=',
				hourlyRate: '<=',
				yearsExperience: '>=',
			}
			
			const selectors = Object.keys(input)
			const selectorValues = Object.values(input)
			const conditions = selectors.map(selector => conditionsConversion[selector] )
			
			const getUsersColumns = [
				'*',
			]
			const getUsersQuery = createSelectAndQuery(getUsersColumns, caregiverTable, selectors, selectorValues, conditions)
			const getUsersResult = await this.context.postgres.query(getUsersQuery)

			return getUsersResult.rows
		} catch(err) {
			throw err
		}
	}

	async getCaregiver(caregiverId) {
		try {
			const getCaregiverColumns = [
				'user_id',
				'birthdate',
				'years_experience',
				'description',
				'gender',
				'availability',
				'average_rating',
				'hourly_rate',
			]
			const getCaregiverQuery = createSelectQuery(getCaregiverColumns, caregiverTable, 'user_id', caregiverId)
			const getCaregiverResult = await this.context.postgres.query(getCaregiverQuery)
			return getCaregiverResult.rows[0]
		} catch (err) {
			throw err
		}
	}

}

module.exports = CaregiverDB