export const projectEntity = (entity, schema) => {
	let result = {}
	handleObj(schema, entity, result)
	return result
}

export const preparePayload = (values, initialValues, schema) => {
	let result = {}
	handlePayloadObj(schema, initialValues, values, result)
	return result
}

const handleObj = (objSchema, obj = {}, result) => {
	// preserve ids of entity objects
	if (obj.id) result.id = obj.id
	Object.keys(objSchema).forEach(k => {
		const type = typeof objSchema[k]
		// NOTE form schema should contain only non-empty nested objects
		if (type === 'object' && Array.isArray(objSchema[k]))
			return handleArr(objSchema[k], obj[k], result[k] = [])
		if (type === 'object')
			return handleObj(objSchema[k], obj[k], result[k] = {})
		result[k] = obj[k] || objSchema[k]
	})
}

const handleArr = (arrSchema, arr = [], resultArr) => {
	// NOTE schema array should contain one element only just to define schema
	const type = typeof arrSchema[0]
	// TODO handle array of primitives (now only collections)
	if (type === 'object') {
		return arr.length
			? arr.forEach((obj, i) => handleObj(arrSchema[0], obj, resultArr[i] = {}))
			: handleObj(arrSchema[0], {}, resultArr[0] = {})
	}
}

const handlePayloadObj = (objSchema, initialObj, obj, result) => {
	// preserve ids of entity objects
	if (obj.id) result.id = obj.id
	Object.keys(objSchema).forEach(k => {
		// console.log('k > ', k)
		// console.log('objSchema[k] > ', objSchema[k])
		// preserve any db entities' Ids
		// if (k.endsWith('Id')) return result[k] = obj[k] || objSchema[k]
		if (k.endsWith('Id') && !!obj[k]) return result[k] = obj[k]
		const type = typeof objSchema[k]
		// NOTE form schema should contain only non-empty nested objects
		if (type === 'object' && Array.isArray(objSchema[k]))
			return handlePayloadArr(objSchema[k], initialObj[k], obj[k], result[k] = [])
		if (type === 'object')
			return handlePayloadObj(objSchema[k], initialObj[k], obj[k], result[k] = {})
		// result includes changed values
		// console.log('obj[k] !== initialObj[k] > ', obj[k] !== initialObj[k])
		if (obj[k] !== initialObj[k]) return result[k] = obj[k]
		// and non-empty schema values
		// console.log('!!objSchema[k] > ', !!objSchema[k])
		if (!!objSchema[k]) return result[k] = objSchema[k]
	})
}

const handlePayloadArr = (arrSchema, initialArr, arr, resultArr) => {
	// NOTE schema array should contain one element only just to define schema
	const type = typeof arrSchema[0]
	// TODO handle array of primitives (now only collections)
	if (type === 'object') {
		// arr should contain at least one element
		return arr.forEach((obj, i) =>
			handlePayloadObj(arrSchema[0], initialArr[i], obj, resultArr[i] = {})
		)
	}
}
