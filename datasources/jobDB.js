const { DataSource } = require('apollo-datasource')

const { formatJobPosts } = require('../utils/format/jobs')
const { createInsertQuery, createUpdateQuery, createSelectQuery, createSelectAndQuery, createInnerJoinSelect } = require('../utils/DSHelperFunctions/makeQueries')

const databaseSchema = 'senior_care'
const jobTable = `${databaseSchema}.job_posting`
const applicantsTable = `${databaseSchema}.applicants`
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

	async getServices(jobId) {
		try {
			const getServicesQuery = createInnerJoinSelect(['title'], servicesJobTable, servicesTable,
			'service_id', 'id', 'job_id', jobId)
			const getServicesResult = await this.context.postgres.query(getServicesQuery)
			return getServicesResult.rows.map(service => service.title)
		} catch(err) {
			throw err
		}
	}

	async createJob(input, seniorId, user_id) {
		try {
			const { basicInformation, serviceDetails, houseDetails, caregiverPreferences } = input
			const { location, ...basicInformationNoLocation } = basicInformation
	
			const newJobObject = {
				...basicInformationNoLocation,
				familyId: user_id,
				seniorId,
				...location,
				...houseDetails,
				...caregiverPreferences,
			}
			const newJobQuery = createInsertQuery(newJobObject, jobTable, ['*'])
			const newJobResult = await this.context.postgres.query(newJobQuery)

			return newJobResult.rows[0]
		} catch(err) {
			throw err
		}
	}

	async addServices(serviceDetails, jobId) {
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

		return serviceArray
	}

	async getAllUserJobs(user_id) {
		try {
			const getJobPostsQuery = createSelectQuery(['*'], jobTable, 'family_id', user_id)
			const getJobPostsResult = await this.context.postgres.query(getJobPostsQuery)
	
			return getJobPostsResult.rows
		} catch (err) {
			throw err
		}
	}

	async getAllJobs() {
		try {
			const getJobsQuery = createSelectQuery(['*'], jobTable)
			const getJobsResult = await this.context.postgres.query(getJobsQuery)

			const sortedJobs = getJobsResult.rows.sort((a, b) => {
				return b.date_created - a.date_created
			})

			return sortedJobs
		} catch(err) {
			throw err
		}
	}

	async getJob (jobId) {
		try {
			const getJobPostQuery = createSelectQuery(['*'], jobTable, 'id', jobId)
			const getJobPostResult = await this.context.postgres.query(getJobPostQuery)
			return getJobPostResult.rows[0]
		} catch(err) {
			throw err
		}
	}

	async getJobPost(jobId) {
		try {			
			const [ job, services ] = await Promise.all([this.getJob(jobId), this.getServices(jobId)])
			const senior = await this.context.dataSources.seniorDB.getSenior(job.senior_id)

			return formatJobPosts(job, services, senior)
		} catch (err) {
			throw err
		}
	}

	async applyJob(input, user_id) {
		try {
			const { jobId, familyId, message } = input
			const checkDuplicateColumns = [
				'status'
			]
			const checkDuplicateSelectors = [
				'jobpost_id',
				'caregiver_id',
			]
			const checkDuplicateSelectorValues = [
				jobId,
				user_id,
			]
			const checkDuplicateQuery = createSelectAndQuery(checkDuplicateColumns, applicantsTable, checkDuplicateSelectors, checkDuplicateSelectorValues)
			const checkDuplicateResult = await this.context.postgres.query(checkDuplicateQuery)
			checkDuplicateResult.rows.forEach(duplicate => {
				if (duplicate.status === 'applied') throw 'duplicate application'
			})

			const applyJobObject = {
				jobpost_id: jobId,
				family_id: familyId,
				caregiver_id: user_id,
				status: 'applied',
				message: message,
			}
			const applyJobQuery = createInsertQuery(applyJobObject, applicantsTable)
			await this.context.postgres.query(applyJobQuery)
		} catch(err) {
			throw err
		}
	}

	async getJobApplications(selectorObject) {
		try {
			const getApplicationColumns = [
				'id',
				'family_id',
				'jobpost_id',
				'caregiver_id',
				'date_created',
				'status',
				'message',
			]
			const getApplicantsSelectors = Object.keys(selectorObject)
			const getApplicantsSelectorValues = Object.values(selectorObject)

			const getApplicantsQuery = createSelectAndQuery(getApplicationColumns, applicantsTable, getApplicantsSelectors, getApplicantsSelectorValues)
			const getApplicantResult = await this.context.postgres.query(getApplicantsQuery)

			return getApplicantResult.rows
		} catch(err) {
			throw err
		}
	}
}

module.exports = JobDB
