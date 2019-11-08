module.exports = {
	Query: {
		async placeholderApi(parent, { input }, { dataSources, req, app, postgres }){
			return await dataSources.placeholderApi.queryPlaceholder('placeholder Api')
		},
  },

  Mutation: {
		async placeholderApi(parent, { input }, { dataSources, req, app, postgres }){
			return await dataSources.placeholderApi.mutationPlaceholder('placeholder')
		},
  },
}



