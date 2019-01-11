import React from 'react'
import Field from './Field'

const renderObj = (obj, objSchema, key) => {
  // obj may be any value
  // objSchema should be either Object or Array with only one schema object element
  const isArray = Array.isArray(objSchema)
  const schema = isArray ? objSchema[0] : objSchema
  const schemaKeys = Object.keys(schema)
  // if objSchema contains 'label' than that's a field
  const isField = schemaKeys.includes('label')
  if (isField) {
    // default type is 'string
    const type = schema.type || 'string'
    return (
      <Field
        key={key}
        type={type}
        label={schema.label}
        content={obj}
      />
    )
  }
  else {
    // when traversing, take only obj keys that are non-empty arrays/values
    return schemaKeys
      .filter(k => Array.isArray(obj[k]) ? obj[k].length : !!obj[k])
      .map((k, i)=> renderObj(obj[k], objSchema[k], i))
  }
}

export default ({
  entity,
  schema
}) => renderObj(entity, schema, '0')
