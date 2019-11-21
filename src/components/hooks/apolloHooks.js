import { useContext } from 'react'
import {
  useQuery as useApolloQuery,
  useMutation as useApolloMutation
} from '@apollo/react-hooks'
import NotificationsContext from '../notifications/NotificationsContext'

export function useQuery(
  query,
  {
    onError,
    errMsg,
    ...options
  } = {},
) {
  const { notify } = useContext(NotificationsContext)
  return useApolloQuery(query, {
    ...options,
    onError: err => {
      if (onError) onError(err)
      notify({
        type: 'error',
        title: errMsg || 'Ошибка загрузки данных',
        content: err.message,
      })
    }
  })
}

export const useMutation = (
  mutation,
  {
    onCompleted,
    onError,
    successMsg,
    errMsg,
    mark,
    ...options
  } = {}
) => {
  // const refMounted = useRefMounted()
  // console.log('refMounted.current1 > ', refMounted.current)
  // console.log('useMutation > ', mark)
  const { notify } = useContext(NotificationsContext)
  return useApolloMutation(mutation, {
    ...options,
    onCompleted: res => {
      console.log('onCompleted > ', onCompleted)
      if (onCompleted) onCompleted(res)
      successMsg !== null && notify({
        type: 'success',
        title: successMsg || 'Данные сохранены',
      })
    },
    onError: err => {
      if (onError) onError(err)
      notify({
        type: 'error',
        title: errMsg || 'Ошибка загрузки данных',
        content: err.message,
      })
    }
  })
}