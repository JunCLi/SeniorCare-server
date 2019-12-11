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


const toSnake = string => (
	string.replace(/([A-Z])/g, letter => (
			'_' + letter.toLowerCase()
	))
)

module.exports.camelToSnake = toSnake

// const newCamelToSnake = object => {
// 	if (typeof object  === 'object'
// 		&& object !== null
// 		&& !Array.isArray(object)
// 		&& !(object instanceof Date)
// 	) {
// 		const newObject = {}
// 		Object.keys(object).forEach(key => {
// 			newObject[toSnake(key)] = newCamelToSnake(object[key])
// 		})

// 		return newObject
// 	} else if (Array.isArray(object)) {
// 		return object.map(item => newCamelToSnake(item))
// 	}

//   return object
// }

// module.exports.newCamelToSnake = newCamelToSnake