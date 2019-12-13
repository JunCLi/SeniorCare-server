const userResolvers = require('./usersResolvers')
const caregiverResolvers = require('./caregiverResolvers')
const jobResolvers = require('./jobResolvers')
const familyResolvers = require('./familyResolvers')
const messagesResolvers = require('./messagesResolvers')

module.exports = () => {
  return {
    Query: {
			...userResolvers.Query,
			...caregiverResolvers.Query,
			...jobResolvers.Query,
			...familyResolvers.Query,
			...messagesResolvers.Query,
		},

		Mutation: {
			...userResolvers.Mutation,
			...caregiverResolvers.Mutation,
			...jobResolvers.Mutation,
			...familyResolvers.Mutation,
			...messagesResolvers.Mutation,
		},

		Subscription: {
			...caregiverResolvers.Subscription,
			...jobResolvers.Subscription,
			...messagesResolvers.Subscription,
		}
  }
}
