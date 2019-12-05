module.exports = {
	Mutation: {
		async addSeniorLanguage(parent, input, { dataSources, req, app, postgres }) {
			return await dataSources.seniorDB.addSeniorLanguage(input)
		},
	},

	Query: {
		async getAllSeniors (parent, input, { dataSources, req, app, postgres }) {
			return await dataSources.seniorDB.getAllSeniors(input)
		},
	}
}