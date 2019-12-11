const { withFilter } = require('graphql-subscriptions')
const authenticate = require('../utils/authentication/authenticate')
const { snakeToCamel } = require('../utils/helperFunctions/caseConv')

const databaseSchema = 'senior_care'
const blacklistTable = `${databaseSchema}.blacklist_jwt`

module.exports = {
	Subscriptions: {
		messageAdded: {
			subscribe: {

			}
		}
	},

	Mutation: {
		async addMessage(parent, { input }, { dataSources, req, app, postgres }) {
			try {
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData

				return snakeToCamel(await dataSources.messagesDB.addMessage(input, user_id))
			} catch(err) {
				throw err
			}
		},

		async startConversation(parent, { recipientId }, { dataSources, req, app, postgres }) {
			try {
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData

				const { familyId, caregiverId } = await dataSources.messagesDB.checkAuthor(user_id, recipientId, userType)

				let convo = await dataSources.messagesDB.checkConversation(familyId, caregiverId)
				if ( !convo ) {
					// create convo if doesn't exist
					convo = await dataSources.messagesDB.createConversation(familyId, caregiverId)
				}

				return snakeToCamel(convo)
			} catch (err) {
				throw err	
			}
		},
	},

	Query: {
		async getMessages(parent, { conversationId }, { dataSources, req, app, postgres }) {
			try {

			} catch(err) {
				throw err
			}
		},
	},
}