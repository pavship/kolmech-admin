import React, { useState, useContext, useEffect } from 'react'
import { useQuery as useQueryProto, useMutation as useHookMutation } from 'react-apollo-hooks'
import { useNotifications } from '../notifications/NotificationsContext'
// import useRefMounted from './useRefMounted'

export function useQuery(
  query,
  {
    onCompleted,
    onError,
    successMsg,
    errMsg,
    ...options
  } = {},
) {
  const { notify } = useNotifications()
  const { data, loading, error } = useQueryProto(query, options)
  useEffect(() => {
    if (onCompleted && !loading && !error) {
      onCompleted(data)
    } else if (!loading && error) {
      if (onError) onError(error)
      else notify({
        type: 'error',
        title: errMsg || 'Ошибка загрузки данных',
        content: error.message,
      })
    }
  }, [loading, data, error])
  return { data, loading, error }
}

export const useMutation = (
  mutation,
  {
    onCompleted,
    onError,
    successMsg,
    errMsg,
    ...options
  } = {}
) => {
  // const refMounted = useRefMounted()
  // console.log('refMounted.current1 > ', refMounted.current)
  const { notify } = useNotifications()
  const [loading, setLoading] = useState(false)
  const [called, setCalled] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const mutate = useHookMutation(mutation, options)
  // const handler = async (variables, rest) => {
  const handler = async (...args) => {
    setLoading(true)
    setCalled(true)
    setError(null)
    setData(null)
    try {
      // const { data } = await mutate({ variables, ...rest })
      const { data } = await mutate(...args)
      // console.log('refMounted.current2 > ', refMounted.current)
      // if (refMounted.current) {
        setData(data)
        setLoading(false)
      // }
      if (onCompleted) {
        onCompleted(data)
      } 
      else notify({
        type: 'success',
        title: successMsg || 'Данные сохранены',
      })
      return { data }
    } catch (err) {
      setLoading(false)
      setError(err)
      if (onError) {
        onError(err)
      } 
      else notify({
        type: 'error',
        title: errMsg || 'Ошибка сохранения',
        content: err.message,
      })
    }
  }
  return [
    handler,
    {
      loading,
      called,
      error,
      data
    }
  ]
}