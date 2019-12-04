const rootSchema = require('./rootSchema')
const usersSchema = require('./usersSchema')
const caregiverSchema = require('./caregiverSchema')
const jobsSchema = require('./jobsSchema')

const schemaArray = [rootSchema, usersSchema, caregiverSchema, jobsSchema]

module.exports = schemaArray