const UsersDB = require('./usersDB')
const CaregiverDB = require('./caregiverDB')

const dataSources = () => ({
	usersDB: new UsersDB(),
	caregiverDB: new CaregiverDB(),
})

module.exports = dataSources