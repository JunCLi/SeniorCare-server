const { PubSub, withFilter } = require('graphql-subscriptions')
const pubsub = require('../utils/pubsub/pubsub')

const { DataSource } = require('apollo-datasource')

const { snakeToCamel } = require('../utils/helperFunctions/caseConv')
const { createInsertQuery, createSelectQuery, createSelectAndQuery, createSelectAndQueryOBJ } = require('../utils/DSHelperFunctions/makeQueries')

const databaseSchema = 'senior_care'
const conversationTable = `${databaseSchema}.conversations`
const messagesTable = `${databaseSchema}.messages`

class UsersDB extends DataSource {
	constructor() {
		super()
	}

	initialize(config) {
		this.context = config.context
	}

	async getRecipientId(conversationObject, userType) {
		const oppositeUserType = userType === 'family' ? 'caregiver_id' : 'family_id'
		return conversationObject[oppositeUserType]
	}

	async checkAuthor(authorId, recipientId, userType) {
		const familyObject = {
			familyId: authorId,
			caregiverId: recipientId,
		}
		const caregiverObject = {
			caregiverId: authorId,
			familyId: recipientId,
		}

		return userType === 'family'
			? familyObject
			: caregiverObject
	}

	async validateParticipant(conversationId, authorId) {
		try {
			const validateColumns = [
				'familyId',
				'caregiverId',
			]
			const validateQuery = createSelectQuery(validateColumns, conversationTable, 'id', conversationId)
			const validateResult = await this.context.postgres.query(validateQuery)

			if (!validateResult.rows.length) throw 'no such conversation'

			const checkParticipant = validateResult.rows.find(participants => participants.caregiver_id === authorId || participants.family_id === authorId)

			return checkParticipant ? true : false
		} catch(err) {
			throw err
		}
	}

	async createConversation(familyId, caregiverId) {
		try {
			const newConversationObject = {
				familyId,
				caregiverId,
			}
			const newConversationQuery = createInsertQuery(newConversationObject, conversationTable, ['*'])
			const newConversationResult = await this.context.postgres.query(newConversationQuery)

			return newConversationResult.rows[0]
		} catch(err) {
			throw err
		}
	}

	async checkConversation(familyId, caregiverId) {
		try {
			const checkConversationColumns = [
				'id',
				'familyId',
				'caregiverId'
			]
			const selectors = [
				{
					selector: 'familyId',
					value: familyId,
				},
				{
					selector: 'caregiverId',
					value: caregiverId,
				}
			]
			const checkConversationQuery = createSelectAndQueryOBJ(checkConversationColumns, conversationTable, selectors)
			const checkConversationResult = await this.context.postgres.query(checkConversationQuery)

			return checkConversationResult.rows.length ? checkConversationResult.rows[0] : null
		} catch(err) {
			throw err
		}
	}

	async addMessage(input, authorId) {
		try {
			const { conversationId, content } = input

			if (!(await this.validateParticipant(conversationId, authorId))) throw 'not a participant'

			const newMessageObject = {
				conversationId,
				authorId,
				content,
			}
			const newMessageQuery = createInsertQuery(newMessageObject, messagesTable, ['*'])
			const newMessageResult = await this.context.postgres.query(newMessageQuery)
			const newMessage = snakeToCamel(newMessageResult.rows[0])

			pubsub.publish('messageAdded', { messageAdded: newMessage })

			return newMessage
		} catch(err) {
			throw err
		}
	}

	async getMessages(conversationId, userId) {
		try {
			if (!(await this.validateParticipant(conversationId, userId))) throw 'not a participant'

			const getMessagesColumns = [
				'id',
				'content',
				'dateCreated',
				'authorId',
			]
			const getMessagesQuery = createSelectQuery(getMessagesColumns, messagesTable, 'conversation_id', conversationId)
			const getMessagesResult = await this.context.postgres.query(getMessagesQuery)

			return getMessagesResult.rows
		} catch(err) {
			throw err
		}
	}

	async getConversations(userId) {
		try {
			const getConversationsColumns = [
				'id',
				'familyId',
				'caregiverId',
			]
			const selectors = [
				{
					selector: 'family_id',
					value: userId,
				},
				{
					selector: 'caregiver_id',
					value: userId,
				},
			]
			const getConversationsQuery = createSelectAndQueryOBJ(getConversationsColumns, conversationTable, selectors, 'or')
			const getConversationsResult = await this.context.postgres.query(getConversationsQuery)

			return getConversationsResult.rows
		} catch(err) {
			throw err
		}
	}
}

module.exports = UsersDB
