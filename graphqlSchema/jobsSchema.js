const { gql } = require('apollo-server-express')

module.exports = gql`
	enum FormDirection {
		next
		back
	}

	enum Section {
		basicInformation
		serviceDetails
		seniorDetails
		houseDetails
		caregiverPreferences
	}

	enum Services {
		bathing
		grooming
		dressing
		feeding
		companionship
		driving
		appointments
		mobility
		errands
		mealPrep
		housekeeping
		laundry
		shoppping
	}

	enum HouseholdNeeds {
		errands
		mealPrep
		housekeeping
		laundry
		shoppping
	}

	extend type Query {
		# getJobForm: JobForm
		getAllUserJobs: [Job]
	}

	type Job {
		id: ID
		familyId: ID
		dateCreated: Date
		basicInformation: BasicInformation
		serviceDetails: ServiceDetails
		seniorDetails: SeniorDetails
		houseDetails: HouseDetails
		caregiverPreferences: CaregiverPreferences
		additionalInformation: String
	}

	type Position {
		completed: Boolean
		step: Int
		totalSteps: Int
	}

	type BasicInformation {
		title: String
		startDate: Date
		endDate: Date,
		location: Location
		hourlyRate: Int
	}

	type Location {
		address: String
		city: String
		province: String
		postalCode: String
	}

	type ServiceDetails {
		services: [Services]
		householdNeeds: [HouseholdNeeds]
	}

	type SeniorDetails {
		id: ID
		name: String
		date_created: Date
		last_modified: Date
		gender: Gender
		birthdate: Date
		relation: String
		bio: String
		medical_conditions: String
		language: [String]
		picture: String
	}

	type HouseDetails {
		cigarette: Boolean
		pets: Boolean
		cannabis: Boolean
	}

	type CaregiverPreferences {
		availability: Availability
		genderPref: Gender
		driversLicense: Boolean
		additionalInformation: String
	}

	extend type Mutation {
		submitJobPost(input: JobFormInput): Response
	}

	input JobFormInput {
		basicInformation: BasicInformationInput
		serviceDetails: ServiceDetailsInput
		seniorDetails: SeniorDetailsInput
		houseDetails: HouseDetailsInput
		caregiverPreferences: CaregiverPreferencesInput
		additionalInformation: String
	}

	input BasicInformationInput{
		title: String
		startDate: Date
		endDate: Date,
		location: LocationInput
		hourlyRate: Int
	}
	
	input LocationInput {
		address: String
		city: String
		province: String
		postalCode: String
	}

	input ServiceDetailsInput {
		services: [Services]
		householdNeeds: [HouseholdNeeds]
	}

	input SeniorDetailsInput {
		seniorId: ID
		name: String
		gender: Gender
		birthdate: Date
		relation: String
		bio: String
		medicalConditions: String
		language: [String]
		picture: String
	}

	input HouseDetailsInput {
		cigarette: Boolean
		pets: Boolean
		cannabis: Boolean
	}

	input CaregiverPreferencesInput {
		availability: Availability
		genderPref: Gender
		driversLicense: Boolean
		additionalInformation: String
	}
`