const { gql } = require('apollo-server-express')

module.exports = gql`
	enum UserType {
		caregiver
		family
	}

	scalar Date

	extend type Query {
		getLoggedUser: User
		getUser(userId: ID!): User
	}

	type User {
		userId: ID
		email: String
		firstName: String
		lastName: String
		dateCreated: Date
		lastModified: Date
		avatar: String
		phoneNumber: String
		location: String
		userType: UserType
	}

	type Family {
		userId: ID
    fullname: String
    avatar: String
    phoneNumber: String
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

