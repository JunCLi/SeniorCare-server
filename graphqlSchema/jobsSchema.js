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
	}

	enum HouseholdNeeds {
		errands
		mealPrep
		housekeeping
		laundry
		shoppping
	}

	extend type Query {
		getJobForm: JobForm
	}

	type JobForm {
		id: ID
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
		position: Position
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
		position: Position
		services: [Services]
		householdNeeds: [HouseholdNeeds]
	}

	type SeniorDetails {
		position: Position
		name: String
		gender: Gender
		birthdate: Date
		relation: String
		bio: String
		medicalConditions: String
		language: [String]
		picture: String
	}

	type HouseDetails {
		position: Position
		cigarette: Boolean
		pets: Boolean
		cannabis: Boolean
	}

	type CaregiverPreferences {
		position: Position
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