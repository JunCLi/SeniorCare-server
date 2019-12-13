const { withFilter } = require('graphql-subscriptions')
const pubsub = require('../utils/pubsub/pubsub')

const authenticate = require('../utils/authentication/authenticate')
const { snakeToCamel } = require('../utils/helperFunctions/caseConv')

const databaseSchema = 'senior_care'
const blacklistTable = `${databaseSchema}.blacklist_jwt`

const formatJobPosts = (job, services, senior) => {
	return snakeToCamel({
		id: job.id,
		family_id: job.family_id,
		dateCreated: job.date_created,
		basicInformation: {
			title: job.title,
			startDate: job.start_date,
			endDate: job.end_date,
			location: {
				address: job.address,
				city: job.city,
				province: job.province,
				postalCode: job.postal_code,
			},
			hourlyRate: job.hourly_rate,
		},
		serviceDetails: {
			services: services
		},
		seniorDetails: senior,
		houseDetails: {
			cigarette: job.cigarette,
			pets: job.pets,
			cannabis: job.cannabis,
		},
		caregiverPreferences: {
			availability: job.availability,
			genderPref: job.gender_pref,
			driversLicense: job.drivers_license,
		}
	})
}

module.exports = {
	Subscription: {
		myJobAdded: {
			subscribe: withFilter(() => pubsub.asyncIterator('myJobAdded'), (payload, variables) => {
				return payload.myJobAdded.familyId === variables.familyId 
			})
		},
	},
	Mutation: {
		async submitJobPost (parent, { input }, { dataSources, req, app, postgres }) {
			try {
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData
	
				if (userType !== 'family') throw 'user type error'
	
				const senior = await dataSources.seniorDB.createSenior(input.seniorDetails, user_id)
				const job = await dataSources.jobDB.createJob(input, senior.seniorId, user_id)
				const services = await (dataSources.jobDB.addServices(input.serviceDetails, job.id))

				const jobPost = formatJobPosts(job, services, senior)
				pubsub.publish('myJobAdded', { myJobAdded: jobPost })
				return {
					message: 'success'
				}
			} catch(err) {
				throw err
			}
		},
	},

	Query: {
		async getAllUserJobs(parent, { input }, { dataSources, req, app, postgres }) {
			try {
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData
	
				if (userType !== 'family') throw 'user type error'
	
				const allJobs = await dataSources.jobDB.getAllUserJobs(user_id)
				const formattedAllJobs = await Promise.all(allJobs.map(async job => {
					const services = await dataSources.jobDB.getServices(job.id)
					const senior = await dataSources.seniorDB.getSenior(job.senior_id)
					return formatJobPosts(job, services, senior)
				}))
				return formattedAllJobs
			} catch(err) {
				throw err
			}
		},

		async getJob(parent, { jobId }, { dataSources, req, app, postgres }) {
			try {
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData
	
				if (userType !== 'family') throw 'user type error'

				const job = await dataSources.jobDB.getJob(jobId)
				const services = await dataSources.jobDB.getServices(jobId)
				const senior = await dataSources.seniorDB.getSenior(job.senior_id)

				return formatJobPosts(job, services, senior)
			} catch(err) {
				throw err
			}
		},

		async getAllJobs(parent, { input }, { dataSources, req, app, postgres }) {
			try {
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData
	
				if (userType !== 'caregiver') throw 'user type error'
				const jobs = await dataSources.jobDB.getAllJobs()
				const formattedJobs = await Promise.all(jobs.map(async job => {
					const services = await dataSources.jobDB.getServices(job.id)
					const senior = await dataSources.seniorDB.getSenior(job.senior_id)
					return formatJobPosts(job, services, senior)
				}))
				return formattedJobs
			} catch(err) {
				throw err
			}
		}
	}
}