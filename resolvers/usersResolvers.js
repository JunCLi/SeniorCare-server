module.exports = {
	Mutation: {
		async signup(parent, { input }, { dataSources, req, app, postgres }) {
			return await dataSources.usersDB.signup(input)
		},

		async login(parent, { input }, { dataSources, req, app, postgres }) {
			const loginMessage = await dataSources.usersDB.login(input)
			// const	loginUser = await dataSources.usersDB.getUserFromId(loginMessage.user_id)
			return {
				...loginMessage,
				// user: loginUser,
			}
		},

		async logout(parent, { input }, { dataSources, req, app, postgres }) {
			return await dataSources.usersDB.logout(input)
		},

		async testAuthenticate(parent, { input }, { dataSources, req, app, postgres }) {
			return await dataSources.usersDB.testAuthenticate(input)
		}
	},

	Query: {
		async getLoggedUser(parent, { input }, { dataSources, req, app, postgres }) {
			return await dataSources.usersDB.getLoggedUser(input)
		}
	}
}