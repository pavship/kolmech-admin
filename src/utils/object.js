export const getObjProp = function(obj, path){
  const pathArr = path.split('.')
  for (let i=0; i<pathArr.length; i++){
      obj = obj[pathArr[i]]
      if (!obj) return undefined
  }
  return obj
}