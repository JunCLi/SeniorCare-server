const { gql } = require('apollo-server-express')

module.exports = gql`
	enum UserType {
		caregiver
		family
	}

	scalar Date

	type QueryPlaceholder {
		id: ID
	}

	extend type Query {
		getLoggedUser: User
	}

	type User {
		user_id: ID
		email: String
		first_name: String
		last_name: String
		date_created: Date
		last_modified: Date
		avatar: String
		phone_number: String
		location: String
		userType: UserType
	}

	type Family {
		user_id: ID
    fullname: String
    avatar: String
    phone_number: String
    email: String
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
	}

	type Response {
		message: String!
	}

	type LoginResponse {
		message: String!
		token: String!
		user: User!
	}
`

