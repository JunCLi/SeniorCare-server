const { snakeToCamel } = require('../utils/helperFunctions/caseConv')

module.exports = {
	Mutation: {
		async signup(parent, { input }, { dataSources, req, app, postgres }) {
			return await dataSources.usersDB.signup(input)
		},

		async login(parent, { input }, { dataSources, req, app, postgres }) {
			return await dataSources.usersDB.login(input)
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
			return snakeToCamel(await dataSources.usersDB.getLoggedUser(input))
		}
	}
}