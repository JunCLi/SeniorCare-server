const userResolvers = require('./usersResolvers')

module.exports = () => {
  return {
    Query: {
			...userResolvers.Query
		},

		Mutation: {
			...userResolvers.Mutation
		},
  }
}
