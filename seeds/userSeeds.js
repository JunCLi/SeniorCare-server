const userSeeds = [
	{
		id: 'ca-nic-bRbEFAdRpPihA47EZ4kL',
		email: 'nicknurse@basketball.com',
		password: '$2b$12$fNnGo60D/19iB6U0yKg8H.jzp.vlKR3oAQNUVJsX3uKz9qeihZSyC',
		first_name: 'Nick',
		last_name: 'Nurse',
		date_created: "2018-07-21T21:05:43.397Z",
		last_modified: "2019-09-07T21:05:43.397Z",
		status: 'confirmed',
		phone_number: '905-123-4567',
		avatar: 'https://www.catster.com/wp-content/uploads/2018/05/A-gray-cat-crying-looking-upset.jpg',
		location: 'South Core, TO',
		user_type: 'caregiver',
	},
	{
		id: 'ca-mik-hyJ1YCv5diQct6eB.LH5',
		email: 'mikebabcock@hockey.com',
		password: '$2b$12$rglqSuxQbiGZJJy/DtKwbuDsEv55RzpcTw2iDmd9ccy8vIrukCCrK',
		first_name: 'Mike',
		last_name: 'Babcock',
		date_created: "2018-05-04T21:05:43.397Z",
		last_modified: "2019-07-12T21:05:43.397Z",
		status: 'confirmed',
		phone_number: '905-456-7890',
		avatar: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		location: 'Corktown, TO',
		user_type: 'caregiver',
	},
	{
		id: 'ca-mar-zrEODfqusvw4e1HLp8vU',
		email: 'mariepoulin@hockey.com',
		password: '$2b$12$g6E5here.8d2AKSFA/8xPeDW4ZajdKDvVJ.QJklm9wZ6IE8U9OVom',
		first_name: 'Marie-Philip',
		last_name: 'Poulin',
		date_created: "2019-01-31T21:05:43.397Z",
		last_modified: "2019-10-22T21:05:43.397Z",
		status: 'confirmed',
		phone_number: '905-321-9876',
		avatar: 'https://amp.businessinsider.com/images/55c906efdd0895b0558b45bc-1136-852.jpg',
		location: 'Kensington, TO',
		user_type: 'caregiver',
	},
	{
		id: 'kc-vdu-bRbEFAdRpPihA47EZ4kL',
		email: 'vdumouchel@me.com',
		password: '$2b$12$g6E5here.8d2AKSFA/8xPeDW4ZajdKDvVJ.QJklm9wZ6IE8U9OVom',
		first_name: 'Vincent',
		last_name: 'Dumouchel',
		date_created: "2019-01-15T21:05:43.397Z",
		last_modified: "2019-01-15T21:05:43.397Z",
		status: 'confirmed',
		phone_number: '5147466616',
		avatar: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fscontent-amt2-1.cdninstagram.com%2Fvp%2F71510ae3b542e7eab19ba30048a8cf19%2F5D37E5A5%2Ft51.2885-15%2Fe35%2F44580391_2183576808562825_3580599290827743053_n.jpg%3F_nc_ht%3Dscontent-amt2-1.cdninstagram.com%26se%3D7%26ig_cache_key%3DMTkxODIyNDcwNTYxNjAyNzEyNA%253D%253D.2',
		location: 'Queen West',
		user_type: 'family',
	},
	{
		id: 'kc-jef-soUPhN4sVvTOFTx8yhft',
		email: 'jeffalanjohnson22@gmail.com',
		password: '$2b$12$g6E5here.8d2AKSFA/8xPeDW4ZajdKDvVJ.QJklm9wZ6IE8U9OVom',
		first_name: 'Jeff',
		last_name: 'Johnson',
		date_created: "2019-04-19T21:05:43.397Z",
		last_modified: "2019-07-23T21:05:43.397Z",
		status: 'confirmed',
		phone_number: '5147466616',
		avatar: 'https://www.jeffalanjohnson.com/static/media/solo.f70aa132.png',
		location: 'South Core',
		user_type: 'family',
	},
	{
		id: 'kc-mai-NwAsLDboyLd8OExFvqG8',
		email: 'mail@alamtalash.com',
		password: '$2b$12$g6E5here.8d2AKSFA/8xPeDW4ZajdKDvVJ.QJklm9wZ6IE8U9OVom',
		first_name: 'Alam',
		last_name: 'Talash',
		date_created: "2019-08-21T21:05:43.397Z",
		last_modified: "2019-11-15T21:05:43.397Z",
		status: 'confirmed',
		phone_number: '5147466616',
		avatar: 'https://avatars1.githubusercontent.com/u/22881406?s=400&v=4',
		location: 'Kensington',
		user_type: 'family',
	},
	{
		id: 'kc-mar-SquScHU599bpIQh9t98G',
		email: '	mark@olechconsulting.com',
		password: '$2b$12$g6E5here.8d2AKSFA/8xPeDW4ZajdKDvVJ.QJklm9wZ6IE8U9OVom',
		first_name: 'Mark',
		last_name: 'Olech',
		date_created: "2018-08-03T21:05:43.397Z",
		last_modified: "2019-10-11T21:05:43.397Z",
		status: 'confirmed',
		phone_number: '5147466616',
		avatar: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fb.zmtcdn.com%2Fdata%2Fuser_profile_pictures%2F353%2Fcd97361149db1414db07685354a0b353.jpg%3Ffit%3Daround%257C400%253A400%26crop%3D400%253A400%253B%252A%252C%252A',
		location: 'Little Italy',
		user_type: 'family',
	},
	{
		id: 'kc-jas-BOORy0CC9ECVGcQnGj4a',
		email: 'jassouline@ryerson.ca',
		password: '$2b$12$g6E5here.8d2AKSFA/8xPeDW4ZajdKDvVJ.QJklm9wZ6IE8U9OVom',
		first_name: 'Julien',
		last_name: 'Assouline',
		date_created: "2018-05-02T21:05:43.397Z",
		last_modified: "2019-09-13T21:05:43.397Z",
		status: 'confirmed',
		phone_number: '5147466616',
		avatar: 'https://amp.businessinsider.com/images/55c906efdd0895b0558b45bc-1136-852.jpg',
		location: 'Bayview',
		user_type: 'family',
	},
]

module.exports = {
	table: 'users',
	seeds: userSeeds,
}