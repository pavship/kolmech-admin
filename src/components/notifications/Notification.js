import React from 'react'
import { Message } from '../styled/styled-semantic'

export default ({
	message: { id, type, title, content, timerId },
	dismissNotification,
	cancelAutoDismiss
}) => {
  return (
		<Message
			m='0 0 2rem 2rem'
			w='unset'
			mw='550px'
			pr='4em'
			pe='all'
			compact
			size='large'
			icon={
				type === 'error' ? 'exclamation' :
				type === 'warning' ? 'info' :
				type === 'success' ? 'check' :
				undefined
			}
			header={title}
			content={content}
			error={type === 'error'}
			info={type === 'info'}
			success={type === 'success'}
			warning={type === 'warning'}
			onDismiss={timerId ? undefined : (() => dismissNotification(id))}
			onMouseEnter={timerId ? (() => cancelAutoDismiss(id)) : undefined}
		/>
	)
}