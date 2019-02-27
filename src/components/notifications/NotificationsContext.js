import React, { Component } from 'react'
import produce from 'immer'
import cuid from 'cuid'

const NotificationsContext = React.createContext()
export default NotificationsContext

export class NotificationsProvider extends Component {
  state = {
    messages: []
  }
  create = message => {
    message.id = cuid()
    // notification will auto dismiss
    message.timerId = setTimeout(() => {
      this.dismiss(message.id)
    }, 5000)
    this.setState(produce(draft => {
      draft.messages.push(message)
    }))
  }
  dismiss = messageId => this.setState(produce(draft => {
    draft.messages = draft.messages.filter(m => m.id !== messageId)
  }))
  cancelAutoDismiss = messageId => this.setState(produce(draft => {
    const message = draft.messages.find(m => m.id === messageId)
    clearTimeout(message.timerId)
    delete message.timerId
  }))
  render() {
    return (
      <NotificationsContext.Provider
        value={{
          state: this.state,
          create: this.create,
          dismiss: this.dismiss,
          cancelAutoDismiss: this.cancelAutoDismiss
        }}
      >
        {this.props.children}
      </NotificationsContext.Provider>
    )
  }
}

export const NotificationsConsumer = ({ children }) => (
  <NotificationsContext.Consumer>
    {({ create: notify }) =>
      <PureChild notify={notify} >
        {children}
      </PureChild>
    }
  </NotificationsContext.Consumer>
)

const PureChild = React.memo(({ notify, children }) => children({ notify }))


