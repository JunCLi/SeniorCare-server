const userResolvers = require('./usersResolvers')
const caregiverResolvers = require('./caregiverResolvers')
const jobResolvers = require('./jobResolvers')

module.exports = () => {
  return {
    Query: {
			...userResolvers.Query,
			...caregiverResolvers.Query,
			...jobResolvers.Query,
		},

		Mutation: {
			...userResolvers.Mutation,
			...caregiverResolvers.Mutation,
			...jobResolvers.Mutation,
		},
  }
}
