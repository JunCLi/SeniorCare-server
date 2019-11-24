module.exports = {
	Mutation: {
		// async signup(parent, { input }, { dataSources, req, app, postgres }) {
		// 	return await dataSources.usersDB.signup(input)
		// },
	},

	Query: {
		async getAllCaregivers(parent, { input }, { dataSources, req, app, postgres }) {
			const caregiverDetails = await dataSources.caregiverDB.getAllCaregivers(input)
			const userDetails = await Promise.all(caregiverDetails.map(caregiver => dataSources.usersDB.getUserDetails(caregiver.user_id)))

			const caregivers = caregiverDetails.map((caregiver, index) => ({
				user_id: caregiver.user_id,
				userDetails: userDetails[index],
				caregiverDetails: caregiver,
			}))
			
			const sortedCaregivers = caregivers.sort((a, b) => {
				return b.userDetails.last_modified - a.userDetails.last_modified
			})

			return sortedCaregivers
		},
	}
}