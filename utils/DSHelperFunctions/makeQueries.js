const camelToSnake = string => (
	string.replace(/([A-Z])/g, letter => (
			'_' + letter.toLowerCase()
	))
)

module.exports.createSelectQuery = (selectColumns, table, selector, selectorValue) => {
  const queryString = selectColumns.join(', ')

  if (selector) {
    return {
      text: `SELECT ${queryString} FROM ${table} WHERE ${selector} = '${selectorValue}'`
    }
  } else {
    return {
      text: `SELECT ${queryString} FROM ${table}`
    }
  }
}

module.exports.createSelectAndQuery = (selectColumns, table, selectors, selectorValues, conditions) => {
	const queryString = selectColumns.join(', ')
	const whereConditionArray = selectors.map( (selector, index) => (
		`${camelToSnake(selector)} ${conditions ? conditions[index] : '=' } '${selectorValues[index]}'`
		))
	const whereConditionString = whereConditionArray.join(' AND ')
	
	if (selectors.length) {
		return {
			text: `SELECT ${queryString} FROM ${table} WHERE ${whereConditionString}`
		}
	} else {
		return {
			text: `SELECT ${queryString} FROM ${table}`
		}
	}
}

module.exports.createSelectOrQuery = (selectColumns, table, selectors, selectorValues, conditions) => {
	const queryString = selectColumns.join(', ')
	const whereConditionArray = selectors.map( (selector, index) => (
		`${camelToSnake(selector)} ${conditions ? conditions[index] : '=' } '${selectorValues[index]}'`
		))
	const whereConditionString = whereConditionArray.join(' OR ')
	
	if (selectors.length) {
		return {
			text: `SELECT ${queryString} FROM ${table} WHERE ${whereConditionString}`
		}
	} else {
		return {
			text: `SELECT ${queryString} FROM ${table}`
		}
	}
}
	
module.exports.createOffsetSelectQuery = (selectColumns, table, selector, selectorValue, limit, offset) => {
	const queryString = selectColumns.join(', ')

	if (selector) {
		return {
			text: `SELECT ${queryString} FROM ${table} WHERE ${selector} = '${selectorValue}' LIMIT ${limit} OFFSET ${offset}`
		}
	} else {
		return {
			text: `SELECT ${queryString} FROM ${table} LIMIT ${limit} OFFSET ${offset}`
		}
	}
}

module.exports.createInsertQuery = (inputObject, table, returnValues) => {
	const queryKeys = Object.keys(inputObject)
  const queryValues = Object.values(inputObject)
	const convertedQueryKeys = queryKeys.map(key => camelToSnake(key))
  const queryString = convertedQueryKeys.join(', ')
  const queryValuesString = queryKeys.map(
    (key, index) => `$${index + 1}`
  ).join(', ')


	
  if(returnValues) {
		const returnString = Array.isArray(returnValues)
			? returnValues.map(returnVal => camelToSnake(returnVal)).join(', ')
			: returnValues
    return {
      text: `INSERT INTO ${table} (${queryString}) VALUES (${queryValuesString}) RETURNING ${returnString}`,
      values: queryValues
    }
  } else {
    return {
      text: `INSERT INTO ${table} (${queryString}) VALUES (${queryValuesString})`,
      values: queryValues
    }
  }
}

module.exports.createUpdateQuery = (inputObject, table, selector, optSelectorValue) => {  
  const queryKeys = Object.keys(inputObject).filter(
    key => inputObject[key] !== null && key !== selector
  )
  const queryValues = queryKeys.map(key => inputObject[key])
  const queryString = queryKeys.map((key, index) => {
    return `${key} = $${index + 1}`
  }).join(', ')

  if (optSelectorValue) {
    return {
      text: `UPDATE ${table} SET ${queryString} WHERE ${selector} = '${optSelectorValue}' RETURNING id`,
      values: queryValues
    }
  } else {
    return {
      text: `UPDATE ${table} SET ${queryString} WHERE ${selector} = '${inputObject[selector]}' RETURNING id`,
      values: queryValues
    }
  }
}

module.exports.createDeleteQuery = (table, selector, selectorValue) => {
	return {
		text: `DELETE FROM ${table} WHERE ${selector} = ${selectorValue}`
	}
}

module.exports.createInnerJoinSelect = (selectColumns, table1, table2, joinCondition1, joinCondition2, selector, selectorValue) => {
	const queryString = selectColumns.join(', ')
	return {
		text: `SELECT ${queryString}
			FROM ${table1}
			INNER JOIN ${table2}
			ON ${table1}.${joinCondition1} = ${table2}.${joinCondition2}
			WHERE ${selector} = '${selectorValue}'`
	}
}