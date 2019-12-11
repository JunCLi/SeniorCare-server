const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
		root: String
	}

	type Mutation { 
		root: String
	}

	type Subscription {
		root: String
	}
`

