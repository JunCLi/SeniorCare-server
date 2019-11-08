const cron = require('node-cron')

const cleanExpiredJWT = require('./cleanExpiredJWT')

cron.schedule('12 * * *', () => {
	cleanExpiredJWT()
})