import React, { forwardRef } from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Section, Caret } from '../styled/styled-semantic'

const SIcon = styled(Icon)`
	&&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`
const SCaret = styled(Caret)`
	&&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`

export default forwardRef(({
	children,
	// style
	size,
	bottomBorder,
	close,
	expanded,
	disabled,
	onClick,
	noIndent,
}, ref) => {
	const modes = {
		...close && { close: true },
		...(typeof expanded !== 'undefined') && { expand: true },
	}
	return (
		<Section
			ref={ref}
			bc='white'
			head
			noLP
			noIndent={noIndent}
			bottomBorder={bottomBorder || true}
			size={size || undefined}
			onClick={onClick}
		>
			{ modes['close']
				?	<SIcon link
						size='big'
						name='cancel'
						onClick={close}
					/> :
				// TODO make disabled work (grey out color)
				modes['expand']
				? <SCaret
						size='large'
						active={expanded ? 1 : 0}
						disabled={disabled}
					/> : null
			}
			{children}
		</Section>
	)
})
