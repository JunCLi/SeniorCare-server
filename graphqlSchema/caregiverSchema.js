const { gql } = require('apollo-server-express')

module.exports = gql`
	extend type Query {
		getAllCaregivers: [Caregiver!]!
	}

	type Caregiver {
		user_id: ID!
		userDetails: User
		caregiverDetails: CaregiverDetails
	}

	type CaregiverDetails {
		birthdate: String
		years_experience: Int
		description: String
		gender: String
		availability: String
		average_rating: Float
		hourly_rate: Int
	}
`