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
		getApplicants(jobId: ID): [CaregiverC]
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

	type CaregiverC {
		userId: ID!
		userDetails: UserC
		caregiverDetails: CaregiverDetailsC
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

	type CaregiverDetailsC {
		birthdate: String
		yearsExperience: Int
		description: String
		gender: Gender
		availability: Availability
		averageRating: Float
		hourlyRate: Int
	}

	extend type Mutation {
		applyJob(input: ApplyJobInput): Response
	}

	input ApplyJobInput {
		jobId: ID!
		familyId: ID!
		message: String
	}
`