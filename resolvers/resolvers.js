const userResolvers = require('./usersResolvers')
const caregiverResolvers = require('./caregiverResolvers')

module.exports = () => {
  return {
    Query: {
			...userResolvers.Query,
			...caregiverResolvers.Query,
		},

		Mutation: {
			...userResolvers.Mutation,
			...caregiverResolvers.Mutation,
		},
  }
}
