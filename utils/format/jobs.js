const { snakeToCamel } = require('../helperFunctions/caseConv')

const formatJobPosts = (job, services, senior) => {
	return snakeToCamel({
		id: job.id,
		family_id: job.family_id,
		dateCreated: job.date_created,
		basicInformation: {
			title: job.title,
			startDate: job.start_date,
			endDate: job.end_date,
			location: {
				address: job.address,
				city: job.city,
				province: job.province,
				postalCode: job.postal_code,
			},
			hourlyRate: job.hourly_rate,
		},
		serviceDetails: {
			services: services
		},
		seniorDetails: senior,
		houseDetails: {
			cigarette: job.cigarette,
			pets: job.pets,
			cannabis: job.cannabis,
		},
		caregiverPreferences: {
			availability: job.availability,
			genderPref: job.gender_pref,
			driversLicense: job.drivers_license,
		}
	})
}

const formatApplicants = (userId, userDetails, caregiverDetails) => {
	return snakeToCamel({
		userId,
		userDetails,
		caregiverDetails,
	})
}

const formatJobApplication = (application) => {
	return snakeToCamel({
		...application,
		jobId: application.jobpost_id,
	})
}



module.exports.formatJobPosts = formatJobPosts
module.exports.formatApplicants = formatApplicants
module.exports.formatJobApplication = formatJobApplication