const authenticate = require('../utils/authentication/authenticate')
const { snakeToCamel } = require('../utils/helperFunctions/caseConv')

const databaseSchema = 'senior_care'
const blacklistTable = `${databaseSchema}.blacklist_jwt`

const formatApplicants = (userId, userDetails, caregiverDetails) => {
	return snakeToCamel({
		userId,
		userDetails,
		caregiverDetails,
	})
}

module.exports = {
	Mutation: {
		async applyJob(parent, { input }, { dataSources, req, app, postgres }) {
			try {
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData
	
				if (userType !== 'caregiver') throw 'user type error'

				await dataSources.jobDB.applyJob(input, user_id)
				return {
					message: 'success'
				}
			} catch(err) {
				throw err
			}
		},
	},

	Query: {
		async getAllCaregivers(parent, { input }, { dataSources, req, app, postgres }) {
			try {
				const caregiverDetails = await dataSources.caregiverDB.getAllCaregivers(input)
				const userDetails = await Promise.all(caregiverDetails.map(caregiver => dataSources.usersDB.getUserDetails(caregiver.user_id)))
	
				const caregivers = caregiverDetails.map((caregiver, index) => {
					return formatApplicants(caregiver.user_id, userDetails[index], caregiver)
				})
				
				const sortedCaregivers = caregivers.sort((a, b) => {
					return b.userDetails.lastModified - a.userDetails.lastModified
				})
	
				return sortedCaregivers
			} catch(err) {
				throw err
			}
		},

		async getApplicants(parent, { jobId }, { dataSources, req, app, postgres }) {
			try {
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData
	
				if (userType !== 'family') throw 'user type error'

				const jobApplicantions = await dataSources.jobDB.getJobApplications(user_id, jobId)
				const applicantsArray = await Promise.all(jobApplicantions.map( async application => {
					const caregiverDetails = await dataSources.caregiverDB.getCaregiver(application.caregiver_id)
					const userDetails = await dataSources.usersDB.getUserDetails(application.caregiver_id)
					return formatApplicants(application.caregiver_id, userDetails, caregiverDetails)
				}))

				return applicantsArray
			} catch(err) {
				throw err
			}
		},
	}
}