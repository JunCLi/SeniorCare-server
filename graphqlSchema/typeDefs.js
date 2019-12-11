const rootSchema = require('./rootSchema')
const usersSchema = require('./usersSchema')
const caregiverSchema = require('./caregiverSchema')
const familySchema = require('./familySchema')
const jobsSchema = require('./jobsSchema')
const messagesSchema = require('./messagesSchema')

const schemaArray = [
	rootSchema,
	usersSchema,
	caregiverSchema,
	familySchema,
	jobsSchema,
	messagesSchema,
]

module.exports = schemaArray