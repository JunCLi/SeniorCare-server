module.exports = {
	Mutation: {
		async submitJobPost (parent, { input }, { dataSources, req, app, postgres }) {
			return await dataSources.jobDB.submitJobPost(input)
		},
	},

	Query: {

	}
}