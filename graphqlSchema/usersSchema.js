const { gql } = require('apollo-server-express')

module.exports = gql`
	enum UserType {
		caregiver
		keyContact
	}

	type QueryPlaceholder {
		id: ID
	}

	extend type Query {
		getLoggedUser: User
	}

	type User {
		user_id: ID!
		email: String
		first_name: String
		last_name: String
	}

	extend type Mutation {
		signup(input: SignupObject!): Response!
		login(input: LoginObject!): LoginResponse!
		logout: Response!
		testAuthenticate: Response!
	}

	input SignupObject {
		email: String!
		password: String!
		firstName: String!
		lastName: String!
		phoneNumber: String!
		userType: UserType!
	}

	input LoginObject {
		email: String!
		password: String!
		userType: UserType!
	}

	type Response {
		message: String!
	}

	type LoginResponse {
		message: String!
		token: String!
		user_id: ID!
		user: User!
	}
`

