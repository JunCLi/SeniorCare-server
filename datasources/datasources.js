const UsersDB = require('./usersDB')
const CaregiverDB = require('./caregiverDB')
const JobDB = require('./jobDB')

const dataSources = () => ({
	usersDB: new UsersDB(),
	caregiverDB: new CaregiverDB(),
	jobDB: new JobDB(),
})

module.exports = dataSources