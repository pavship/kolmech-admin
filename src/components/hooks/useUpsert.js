import { useMutation } from "./apolloHooks"
import produce from "immer"
import { upsertDeal } from "../../graphql/deal"
import { upsertBatch } from "../../graphql/batch"
import { getStructure, assignNested } from "../form/utils"
import { upsertPersonExec } from "../../graphql/person"
import { upsertOrgExec } from "../../graphql/org"

export default function useUpsert(
  objTypeName, obj, options
) {
  const mutation =
    objTypeName === 'deal' ? upsertDeal :
    objTypeName === 'batch' ? upsertBatch :
    objTypeName === 'personExec' ? upsertPersonExec :
    objTypeName === 'orgExec' ? upsertOrgExec :
    undefined
  const [ mutate ] = useMutation(mutation, options)
  const upsert = async (pathsAndValuesArr, options) => {
    if (pathsAndValuesArr.length % 2 !== 0)
      throw new Error('useUpsert requires first array argument consisting of alternating paths and values')
    return mutate({
      ...options,
      variables: { input:
        produce(getStructure(obj), draft => {
          for (let i = 0; i < pathsAndValuesArr.length; i = i + 2) {
            if (i%2 === 1) continue
            assignNested(draft, pathsAndValuesArr[i], pathsAndValuesArr[i+1], i>0)
          }
        })
      }
    })
  }
  return [ upsert ]
}

export function useSpecUpsert(
  objTypeName, options
) {
  const mutation =
    objTypeName === 'deal' ? upsertDeal :
    objTypeName === 'batch' ? upsertBatch :
    objTypeName === 'personExec' ? upsertPersonExec :
    objTypeName === 'orgExec' ? upsertOrgExec :
    undefined
  const [ mutate ] = useMutation(mutation, options)
  const upsert = async (obj, pathsAndValuesArr, options) => {
    if (pathsAndValuesArr.length % 2 !== 0)
      throw new Error('useUpsert requires first array argument consisting of alternating paths and values')
    return mutate({
      ...options,
      variables: { input:
        produce(getStructure(obj), draft => {
          for (let i = 0; i < pathsAndValuesArr.length; i = i + 2) {
            if (i%2 === 1) continue
            assignNested(draft, pathsAndValuesArr[i], pathsAndValuesArr[i+1], i>0)
          }
        })
      }
    })
  }
  return [ upsert ]
}