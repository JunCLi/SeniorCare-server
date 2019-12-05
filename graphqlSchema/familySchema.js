const { gql } = require('apollo-server-express')

module.exports = gql`
	extend type Query {
		getAllSeniors: [Senior!]!
	}

	type Senior {
		id: ID
		name: String
		gender: Gender
		birthdate: Date
		relation: String
		bio: String
		medicalConditions: String
		language: [String]
		picture: String
	}

	extend type Mutation {
		addSeniorLanguage(language: [String]): Response
	}
`