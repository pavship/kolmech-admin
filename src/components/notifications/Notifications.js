import React from "react"
import reactDom from 'react-dom'

import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import Notification from "./Notification"

const NotificationsHolder = styled.div`
	position: fixed;
  bottom: 0;
	top: 0;
	left: 0;
  width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	pointer-events: none;
  z-index: 100;
`

const PosedItem = posed.div({
  boobl: {
		y: 200,
		opacity: 0,
	},
  enter: {
		y: 0,
		opacity: 1,
	},
	exit: {
		x: -400,
		opacity: 0,
	},
})

export default function Notifications ({
	messages,
	dismissNotification,
	cancelAutoDismiss
}) {
	// this Portal is never unmounted
  return reactDom.createPortal(
		<NotificationsHolder>
			<PoseGroup
				animateOnMount
				preEnterPose='boobl'
			>
				{messages.map(m =>
					<PosedItem
						key={m.id}
						initialPose="boobl"
					>
						<Notification
							message={m}
							dismissNotification={dismissNotification}
							cancelAutoDismiss={cancelAutoDismiss}
						/>
					</PosedItem>
				)}
			</PoseGroup>
		</NotificationsHolder>,
		document.getElementById('kolmech-notifications')
	)
}