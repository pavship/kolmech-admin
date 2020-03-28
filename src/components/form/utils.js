import produce from 'immer'

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
		if (k.endsWith('Id') && !!obj[k.slice(0, -2)])
			return result[k] = obj[k.slice(0, -2)].id
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
		const type = typeof objSchema[k]
		// NOTE form schema should contain only non-empty nested objects
		if (type === 'object' && Array.isArray(objSchema[k]))
			return handlePayloadArr(objSchema[k], initialObj[k], obj[k], result[k] = [])
		if (type === 'object')
			return handlePayloadObj(objSchema[k], initialObj[k], obj[k], result[k] = {})
		// result includes changed values
		if (obj[k] !== initialObj[k]) return result[k] = obj[k]
		// and non-empty schema values
		if (!obj[k] && !!objSchema[k]) return result[k] = objSchema[k]
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

export const getStructure = obj => {
	const result = {}
	getSkeleton(obj, result)
	return result
}

const getSkeleton = (obj, result) => {
	// preserve ids of entity objects
	Object.keys(obj).forEach(k => {
		if (k === 'id')
			return result.id = obj.id
		if (obj[k] === null)
			// return result[k] = {}
			return
		const type = typeof obj[k]
		if (type === 'object' && Array.isArray(obj[k]))
			return result[k] = getArrSkeleton(obj[k])
		if (type === 'object')
			return getSkeleton(obj[k], result[k] = {})
	})
}

const getArrSkeleton = arr => arr
	.filter(item => typeof item === 'object')
	.map(obj => {
		const result = {}
		getSkeleton(obj, result)
		return result
	})

const analysePath = (path, acc = []) => {
	const dotPos = path.indexOf('.')
	const braketPos = path.indexOf('[')
	if (path === '') {
		acc[acc.length - 1].last = true
		return acc
	}
	if (dotPos*braketPos === 1) return [
		...acc, {
		key: path,
		last: true
	}]
	if (braketPos === -1 || dotPos + 1 && dotPos < braketPos) return analysePath(
		path.slice(dotPos + 1), [
			...acc, {
				key: path.slice(0, dotPos)
			}
	])
	if (dotPos === -1 || braketPos + 1 && braketPos < dotPos) {
		const closingBraketPos = path.indexOf(']')
		return analysePath(
			path.slice(closingBraketPos + 2), [
				...acc, {
					key: path.slice(0, braketPos),
					array: true
				}, {
					key: path.slice(braketPos + 1, closingBraketPos),
					arrayItem: true
				}
		])
	}
}

export const assignNested = (obj, path, val, preserveKeys=false) => {
	const keys = analysePath(path)
	// console.log('keys > ', keys)
	keys.reduce((obj, { key, last, array, arrayItem }) => {
		// console.log('obj > ', JSON.stringify(obj, null, 2))
		!preserveKeys &&
			Object.keys(obj)
				.filter(k => !(
					k === 'id'
					|| k === key
					|| key.startsWith('id=') && obj[k].id === key.slice(3)
				))
				.forEach(k => {
					if (arrayItem) obj[k] = { id: obj[k].id }
					else delete obj[k]
				})
		if (arrayItem && key === 'length' && !last) {
			obj[obj.length] = {}
			return obj[obj.length - 1]
		}
		if (key.startsWith('id=') && !last)
			return obj.find(i => i.id === key.slice(3))
		if (last) {
			if (arrayItem && key === 'length')
				return obj[obj.length] = val
			if (key.startsWith('id='))
				return obj[obj.findIndex(i => i.id === key.slice(3))] = {
					...Object.keys(val).length > 0 && {id: key.slice(3)},
					...val
				}
			return obj[key] = val
		}
		if (!obj[key]) {
			if (array) obj[key] = []
			else obj[key] = {}
		}
		return obj[key]
	}, obj)
}

export const produceNested = (obj, path, val, preserveKeys=false) => {
	const keys = analysePath(path)
	return produce(obj, obj => {
		keys.reduce((obj, { key, last, array, arrayItem }) => {
			Object.keys(obj).forEach(k => {
				if (k === 'id' || k === key) return
				if (!preserveKeys) {
					if (arrayItem) obj[k] = { id: obj[k].id }
					else delete obj[k]
				}
			})
			if (last) {
				if (arrayItem && key === 'length') return obj[obj.length] = val
				return obj[key] = val
			}
			if (!obj[key]) {
				if (array) obj[key] = []
				else obj[key] = {}
			}
			return obj[key]
		}, obj)
	})
}
