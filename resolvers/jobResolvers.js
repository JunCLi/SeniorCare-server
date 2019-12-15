const { withFilter } = require('graphql-subscriptions')
const pubsub = require('../utils/pubsub/pubsub')

const authenticate = require('../utils/authentication/authenticate')
const { snakeToCamel } = require('../utils/helperFunctions/caseConv')
const { formatJobPosts } = require('../utils/format/jobs')

const databaseSchema = 'senior_care'
const blacklistTable = `${databaseSchema}.blacklist_jwt`

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
					const jobPoster = await dataSources.usersDB.getUserDetails(job.family_id)
					return { 
						family: snakeToCamel(jobPoster),
						jobDetails: formatJobPosts(job, services, senior),
					}
				}))
				return formattedJobs
			} catch(err) {
				throw err
			}
		}
	}
}