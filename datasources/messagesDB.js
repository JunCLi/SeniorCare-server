const { DataSource } = require('apollo-datasource')

const { createInsertQuery, createUpdateQuery, createSelectQuery, createSelectAndQuery, createSelectAndQueryOBJ } = require('../utils/DSHelperFunctions/makeQueries')

const databaseSchema = 'senior_care'
const conversationTable = `${databaseSchema}.conversations`
const messageTable = `${databaseSchema}.messages`

class UsersDB extends DataSource {
	constructor() {
		super()
	}

	initialize(config) {
		this.context = config.context
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
			const newMessageQuery = createInsertQuery(newMessageObject, messageTable, ['*'])
			const newMessageResult = await this.context.postgres.query(newMessageQuery)

			return newMessageResult.rows[0]
		} catch(err) {
			throw err
		}
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
}

module.exports = UsersDB
