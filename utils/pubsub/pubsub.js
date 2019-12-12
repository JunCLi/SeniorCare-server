const { PubSub, withFilter } = require('graphql-subscriptions')
const pubsub = new PubSub()

module.exports = pubsub