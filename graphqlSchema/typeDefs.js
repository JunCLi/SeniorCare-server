const rootSchema = require('./rootSchema')
const usersSchema = require('./usersSchema')
const caregiverSchema = require('./caregiverSchema')

const schemaArray = [rootSchema, usersSchema, caregiverSchema]

module.exports = schemaArray