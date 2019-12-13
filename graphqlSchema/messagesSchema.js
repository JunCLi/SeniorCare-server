const { gql } = require('apollo-server-express')

module.exports = gql`
	extend type Subscription {
		messageAdded(input: CursorMessageInput!): Message
		conversationAdded(userId: ID!): SubscriptionConversation
	}

	extend type Query {
		getMessages(input: CursorMessageInput!): [Message]
		getConversations: [Conversation]
	}

	extend type Mutation {
		addMessage(input: AddMessageInput!): Message
		startConversation(recipientId: ID!): Conversation
	}

	input CursorMessageInput {
		conversationId: ID!
		cursor: ID
		first: Int
	}

	input AddMessageInput {
		conversationId: ID
		content: String
	}

	type Message {
		id: ID
		conversationId: ID
		authorId: ID
		dateCreated: Date
		content: String
	}

	type Conversation {
		id: ID
		familyId: ID
		caregiverId: ID
		recipient: User
	}

	type SubscriptionConversation {
		id: ID
		familyId: ID
		caregiverId: ID
		family: User
		caregiver: User
	}
`