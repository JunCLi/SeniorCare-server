const { gql } = require('apollo-server-express')

module.exports = gql`
	enum Gender {
		female
		male
		other
		nopref
	}

	enum Availability {
		livein
		liveout
	}

	extend type Query {
		getAllCaregivers(input: FilterCaregivers): [Caregiver!]!
	}

	input FilterCaregivers {
		gender: Gender
		availability: Availability
		hourlyRate: Int
		yearsExperience: Int
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
		gender: Gender
		availability: Availability
		average_rating: Float
		hourly_rate: Int
	}
`