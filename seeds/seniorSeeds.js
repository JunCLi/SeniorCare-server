const seniorSeeds = [
	{
		id: 1,
		family_id: 'kc-mai-NwAsLDboyLd8OExFvqG8',
		name: 'Lucinda',
		date_created: '2019-10-22 00:00:00-05',
		last_modified: '2019-11-18 22:51:25.067206-05',
		birthdate: '1942-12-13T22:35:16.000Z',
		gender: 'female',
		relation: 'Mother',
		medical_conditions: 'Dementia',
		bio: 'Lucinda is a very nice woman who loves taking care of her garden in the evening',
		picture: 'https://ichef.bbci.co.uk/images/ic/960x540/p01bqf7g.jpg',
	},
	{
		id: 2,
		family_id: 'kc-mai-NwAsLDboyLd8OExFvqG8',
		name: 'Margaret',
		date_created: '2019-11-03 00:00:00-05',
		last_modified: '2019-12-01 13:51:25.067206-05',
		birthdate: '1949-06-22T22:35:16.000Z',
		gender: 'female',
		relation: 'Aunt',
		medical_conditions: 'High Blood Pressure and Diabetes',
		bio: 'Margaret has 3 cats and really enjoys watching House',
		picture: 'https://cdn.britannica.com/54/204154-050-D2C394B3/Margaret-Thatcher-1980.jpg',
	},
]

const languageSeniorSeeds = [
	{
		senior_id: 1,
		language_id: 1,
	},
	{
		senior_id: 1,
		language_id: 2,
	},
	{
		senior_id: 2,
		language_id: 3,
	},
]

const seniorSeedsObject = {
	table: 'senior',
	seeds: seniorSeeds,
}

const languageSeniorSeedsObject = {
	table: 'language_senior',
	seeds: languageSeniorSeeds
}

module.exports = [seniorSeedsObject, languageSeniorSeedsObject]