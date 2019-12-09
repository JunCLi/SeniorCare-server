const toCamel = (string) => {
  return string.replace(/([-_][a-z])/ig, (letter) => {
    return letter.toUpperCase()
			.replace('-', '')
			.replace('_', '')
  })
}

const snakeToCamel = object => {
	if (typeof object  === 'object'
		&& object !== null
		&& !Array.isArray(object)
		&& !(object instanceof Date)
	) {
		const newObject = {}
		Object.keys(object).forEach(key => {
			newObject[toCamel(key)] = snakeToCamel(object[key])
		})

		return newObject
	} else if (Array.isArray(object)) {
		return object.map(item => snakeToCamel(item))
	}

  return object
}

module.exports.snakeToCamel = snakeToCamel

module.exports.camelToSnake = string => (
	string.replace(/([A-Z])/g, letter => (
			'_' + letter.toLowerCase()
	))
)