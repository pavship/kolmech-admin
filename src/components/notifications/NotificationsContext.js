import React, { useContext, useMemo, useState, useCallback } from 'react'
import produce from 'immer'
import cuid from 'cuid'
import Notifications from './Notifications'

const NotificationsContext = React.createContext()
export default NotificationsContext

export function NotificationsProvider ({
  children
}) {
  const [ messages, setMessages ] = useState([])
  const create = message => {
    message.id = cuid()
    // notification will auto dismiss
    message.timerId = setTimeout(() => {
      dismiss(message.id)
    }, 5000)
    setMessages(produce(messages, draft => {
      draft.push(message)
    }))
  }
  const dismiss = messageId => setMessages(produce(messages, draft => {
    console.log('messageId > ', messageId)
    return draft.splice[messages.findIndex(m => m.id === messageId), 1]
  }))
  const cancelAutoDismiss = messageId => setMessages(produce(messages, draft => {
    const message = draft[messages.findIndex(m => m.id === messageId)]
    clearTimeout(message.timerId)
    delete message.timerId
  }))
  const providerValue = useMemo(() => ({ notify: create }), [])
  return <NotificationsContext.Provider
    value={providerValue}
  >
    <Notifications
      messages={messages}
      dismissNotification={dismiss}
      cancelAutoDismiss={cancelAutoDismiss}
    />
    {children}
  </NotificationsContext.Provider>
}

export const NotificationsConsumer = ({ children }) => (
  <NotificationsContext.Consumer>
    {({ notify }) =>
      <PureChild notify={notify} >
        {children}
      </PureChild>
    }
  </NotificationsContext.Consumer>
)

const PureChild = React.memo(({ notify, children }) => children({ notify }))

export const useNotifications = () => {
  const { notify } = useContext(NotificationsContext)
  return {
    // notify: useMemo(notify, [])
    notify: useCallback((msg) => notify(msg), [])
  }
}

