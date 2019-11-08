const bcrypt = require('bcrypt')

const saltRounds = 12

module.exports.encryptPassword = async password => {
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds)
		return hashedPassword
	} catch(err) {
		throw err
	}
}

module.exports.comparePassword = async (password, dbPassword) => {
	try {
		return await bcrypt.compare(password, dbPassword)
	} catch(err) {
		throw err
	}
}