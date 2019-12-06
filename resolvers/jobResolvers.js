const authenticate = require('../utils/authentication/authenticate')

const databaseSchema = 'senior_care'
const blacklistTable = `${databaseSchema}.blacklist_jwt`

module.exports = {
	Mutation: {
		async submitJobPost (parent, { input }, { dataSources, req, app, postgres }) {
			const tokenData = await authenticate(req, blacklistTable, postgres)
			const { user_id, userType } = tokenData

			if (userType !== 'family') throw 'user type error'

			const seniorId = await dataSources.seniorDB.createSenior(input.seniorDetails, user_id)
			await dataSources.jobDB.submitJobPost(input, seniorId, user_id)
			return {
				message: 'success'
			}
		},

		async createSenior(parent, { input }, { dataSources, req, app, postgres }) {
			return {
				message: 'success'
			}
		}
	},

	Query: {

	}
}