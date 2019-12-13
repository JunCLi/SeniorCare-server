const jobsSeeds = [
	{ 
		family_id: 'kc-mai-NwAsLDboyLd8OExFvqG8',
		senior_id: 1,
		date_created: '2019-11-22',
		title: 'Taking Care of Mom',
		start_date: '2019-11-28',
		end_date: '2019-12-13',
		address: '1234 Avocado Way',
		city: 'Toronto',
		province: 'Ontario',
		postal_code: 'A1B 2C3',
		availability: 'liveout',
		hourly_rate: 19,
		gender_pref: 'female',
		drivers_license: false,
		cigarette: false,
		pets: false,
		cannabis: false,
	},
	{ 
		family_id: 'kc-jef-soUPhN4sVvTOFTx8yhft',
		senior_id: 3,
		date_created: '2019-11-27',
		title: 'Keep Dad Company While I Am Away',
		start_date: '2019-12-08',
		end_date: '2019-12-19',
		address: 'Somewhere in Texas',
		city: 'Austin',
		province: 'Texas',
		postal_code: '12345',
		availability: 'livein',
		hourly_rate: 25,
		gender_pref: 'nopref',
		drivers_license: true,
		cigarette: false,
		pets: true,
		cannabis: false,
	},
	{ 
		family_id: 'kc-mar-SquScHU599bpIQh9t98G',
		senior_id: 4,
		date_created: '2019-12-01',
		title: 'Caretaker for Dad',
		start_date: '2019-12-03',
		end_date: '2019-12-23',
		address: '3332 Don Mills',
		city: 'Toronto',
		province: 'Ontario',
		postal_code: '6I9 E2F',
		availability: 'liveout',
		hourly_rate: 17,
		gender_pref: 'nopref',
		drivers_license: true,
		cigarette: true,
		pets: false,
		cannabis: false,
	},
	{ 
		family_id: 'kc-mai-NwAsLDboyLd8OExFvqG8',
		senior_id: 2,
		date_created: '2019-12-02',
		title: 'Neighbor needs help',
		start_date: '2020-01-4',
		end_date: '2020-02-02',
		address: '1235 Avocado Way',
		city: 'Toronto',
		province: 'Ontario',
		postal_code: 'A1B 2C3',
		availability: 'livein',
		hourly_rate: 24,
		gender_pref: 'female',
		drivers_license: true,
		cigarette: true,
		pets: true,
		cannabis: true,
	},
]

const servicesJobsSeeds = [
	{
		job_id: 1,
		service_id: 1,
	},
	{
		job_id: 1,
		service_id: 2,
	},
	{
		job_id: 1,
		service_id: 5,
	},
	{
		job_id: 1,
		service_id: 10,
	},
	{
		job_id: 1,
		service_id: 11,
	},
	{
		job_id: 1,
		service_id: 12,
	},
	{
		job_id: 2,
		service_id: 2,
	},
	{
		job_id: 2,
		service_id: 4,
	},
	{
		job_id: 2,
		service_id: 5,
	},
	{
		job_id: 2,
		service_id: 11,
	},
	{
		job_id: 2,
		service_id: 12,
	},
	{
		job_id: 2,
		service_id: 7,
	},
	{
		job_id: 2,
		service_id: 8,
	},
	{
		job_id: 2,
		service_id: 9,
	},
	{
		job_id: 3,
		service_id: 3,
	},
	{
		job_id: 3,
		service_id: 5,
	},
	{
		job_id: 3,
		service_id: 6,
	},
	{
		job_id: 3,
		service_id: 10,
	},
	{
		job_id: 4,
		service_id: 5,
	},
	{
		job_id: 4,
		service_id: 6,
	},
	{
		job_id: 4,
		service_id: 7,
	},
	{
		job_id: 4,
		service_id: 8,
	},
	{
		job_id: 4,
		service_id: 9,
	},
	{
		job_id: 4,
		service_id: 10,
	},
]

const jobsSeedsObject = {
	table: 'job_posting',
	seeds: jobsSeeds,
}

const servicesJobsSeedsObject = {
	table: 'services_job',
	seeds: servicesJobsSeeds,
}

module.exports = [jobsSeedsObject, servicesJobsSeedsObject]