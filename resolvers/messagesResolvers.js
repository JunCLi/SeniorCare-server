const { PubSub, withFilter } = require('graphql-subscriptions')
const pubsub = require('../utils/pubsub/pubsub')

// const { withFilter } = require('graphql-subscriptions')
const authenticate = require('../utils/authentication/authenticate')
const { snakeToCamel } = require('../utils/helperFunctions/caseConv')

const databaseSchema = 'senior_care'
const blacklistTable = `${databaseSchema}.blacklist_jwt`

module.exports = {
	Subscription: {
		messageAdded: {
			subscribe: withFilter(() => pubsub.asyncIterator('messageAdded'), (payload, variables) => {
				return +payload.messageAdded.conversationId === +variables.conversationId 
			})
		},
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
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData

				return snakeToCamel(await dataSources.messagesDB.getMessages(conversationId, user_id))
			} catch(err) {
				throw err
			}
		},

		async getConversations(parent, { input }, { dataSources, req, app, postgres }) {
			try {
				const tokenData = await authenticate(req, blacklistTable, postgres)
				const { user_id, userType } = tokenData

				const conversations = await dataSources.messagesDB.getConversations(user_id)
				const conversationsWithRecipient = await Promise.all(conversations.map(async conversation => {
					const recipientId = await dataSources.messagesDB.getRecipientId(conversation, userType)
					const recipient = await dataSources.usersDB.getUserDetails(recipientId)
					return {
						...conversation,
						recipient,
					}
				}))
				
				return snakeToCamel(conversationsWithRecipient)
			} catch(err) {
				throw err
			}
		}
	},
}