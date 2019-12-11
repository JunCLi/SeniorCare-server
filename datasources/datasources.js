const UsersDB = require('./usersDB')
const CaregiverDB = require('./caregiverDB')
const JobDB = require('./jobDB')
const SeniorDB = require('./seniorDB')
const MessagesDB = require('./messagesDB')

const dataSources = () => ({
	usersDB: new UsersDB(),
	caregiverDB: new CaregiverDB(),
	jobDB: new JobDB(),
	seniorDB: new SeniorDB(),
	messagesDB: new MessagesDB(),
})

module.exports = dataSources