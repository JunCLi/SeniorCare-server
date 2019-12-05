const userResolvers = require('./usersResolvers')
const caregiverResolvers = require('./caregiverResolvers')
const jobResolvers = require('./jobResolvers')
const familyResolvers = require('./familyResolvers')

module.exports = () => {
  return {
    Query: {
			...userResolvers.Query,
			...caregiverResolvers.Query,
			...jobResolvers.Query,
			...familyResolvers.Query,
		},

		Mutation: {
			...userResolvers.Mutation,
			...caregiverResolvers.Mutation,
			...jobResolvers.Mutation,
			...familyResolvers.Mutation
		},
  }
}
