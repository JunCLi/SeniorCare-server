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

class JobDB extends DataSource {
	constructor() {
		super()
	}

	initialize(config) {
		this.context = config.context
	}

	async submitJobPost(input) {
		// console.log('input: ', input)
		const tokenData = await authenticate(this.context.req, blacklistTable, this.context.postgres)
		const { user_id, userType } = tokenData

		if (userType !== 'family') throw 'user type error'

		const { basicInformation, serviceDetails, seniorDetails, houseDetails, caregiverPreferences } = input
		const { location, ...basicInformationNoLocation } = basicInformation

		let seniorId = seniorDetails.id
		if (!seniorId) {
			const newSeniorObject = {
				...seniorDetails,
				familyId: user_id,
			}
			const newSeniorQuery = createInsertQuery(newSeniorObject, seniorTable, ['id'])
			const newSeniorResult = await this.context.postgres.query(newSeniorQuery)
			seniorId = newSeniorResult.rows[0].id
		} 

		const newJobObject = {
			...basicInformationNoLocation,
			familyId: user_id,
			seniorId,
			startDate: new Date(),
			endDate: new Date(),
			...location,
			...houseDetails,
			...caregiverPreferences,
		}
		const newJobQuery = createInsertQuery(newJobObject, jobTable, ['id'])
		const newJobResult = await this.context.postgres.query(newJobQuery)

		const jobId = newJobResult.rows[0].id

		if (!jobId) throw 'error submitting jobpost'

		const serviceArray = [...serviceDetails.services, ...serviceDetails.householdNeeds]
		const getServiceIdColumns = [
			'id',
			'title',
		]
		const getServiceIdQuery = createSelectQuery(getServiceIdColumns, servicesTable)
		const getServiceIdResult = await this.context.postgres.query(getServiceIdQuery)

		const serviceIdArray = serviceArray.map(service =>
			getServiceIdResult.rows.find(dbService => dbService.title === service).id
		)		
		await Promise.all(serviceIdArray.map(serviceId => {
			const serviceObject = {
				jobId,
				serviceId
			}
			const insertServiceQuery = createInsertQuery(serviceObject, servicesJobTable)
			return this.context.postgres.query(insertServiceQuery)
		}))

		return {
			message: 'success'
		}
	}
}

module.exports = JobDB
