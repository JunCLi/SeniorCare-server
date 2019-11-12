const UsersDB = require('./usersDB')

const dataSources = () => ({
	usersDB: new UsersDB(),
})

module.exports = dataSources