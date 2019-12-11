const { gql } = require('apollo-server-express')

module.exports = gql`
	extend type Subscription {
		messageAdded: Message
		conversationAdded: Conversation
	}

	extend type Query {
		getMessages(conversationId: ID): [Message]
		getConversations: [Conversation]
	}

	extend type Mutation {
		addMessage(input: AddMessageInput): Message
		startConversation(recipientId: ID): Conversation
	}

	input AddMessageInput {
		conversationId: ID
		content: String
	}

	type Message {
		id: ID
		conversationId: ID
		author: ID
		dateCreated: Date
		content: String
	}

	type Conversation {
		id: ID
		familyId: ID
		caregiverId: ID
	}
`