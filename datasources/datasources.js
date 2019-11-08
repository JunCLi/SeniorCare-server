const UsersDB = require('./usersDB')
const PlaceholderApi = require('./placeholderApi')

const dataSources = () => ({
	usersDB: new UsersDB(),
	placeholderApi: new PlaceholderApi(),
})

module.exports = dataSources