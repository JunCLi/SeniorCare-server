const jwt = require('jsonwebtoken')

const { cookieName, cookieSigniture, cookieExpHours } = require('./configureAuth')

module.exports.createCookie = data => {
  const exp = Math.floor(Date.now() / 1000 + 60 * 60 * cookieExpHours)
  return jwt.sign({
		data: data,
		exp: exp
	}, cookieSigniture)
}


module.exports.setCookie = (token, res) => {
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}

module.exports.retrieveCookie = req => {
	try {
		const jwtCookie = req.cookies[cookieName]
		const jwtInformation = jwt.verify(jwtCookie, cookieSigniture)
		return {
			token: jwtCookie,
			...jwtInformation,
		}
	} catch(err) {
		throw err
	}
}