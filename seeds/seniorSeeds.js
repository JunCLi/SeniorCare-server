const seniorSeeds = [
	{
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
	{
		family_id: 'kc-jef-soUPhN4sVvTOFTx8yhft',
		name: 'Drake',
		date_created: '2019-11-22 00:00:00-05',
		last_modified: '2019-11-27 20:12:23.067206-05',
		birthdate: '1957-10-19T22:35:16.000Z',
		gender: 'male',
		relation: 'Dad',
		medical_conditions: 'Mostly healthy',
		bio: 'I just need someone to keep him company while I am on a trip. He loves fried chicken and golfing',
		picture: 'https://cdn.shopify.com/s/files/1/0434/4749/files/Buzz_Cut_78e594d9-69de-4d09-947b-0b3ff655e7f5_grande.jpg?v=1536673831',
	},
	{
		family_id: 'kc-mar-SquScHU599bpIQh9t98G',
		name: 'Mark Senior',
		date_created: '2019-12-01 00:00:00-05',
		last_modified: '2019-12-01 00:00:00-05',
		birthdate: '1952-01-13T22:35:16.000Z',
		gender: 'male',
		relation: 'Dad',
		medical_conditions: 'Forgetfullness, highblood pressure',
		bio: 'Awesome and chill but is very forgetful. Smokes and drinks and has some health complications about that.',
		picture: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/10/10/10/silver-fox-pierce-brosnan.jpg?w968h681',
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
	{
		senior_id: 3,
		language_id: 1,
	},
	{
		senior_id: 4,
		language_id: 1,
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