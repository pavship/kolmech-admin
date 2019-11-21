import React from 'react'
import styled from 'styled-components'

import HtmlDatePicker from '../common/HtmlDatePicker'
import HtmlInput from '../common/HtmlInput'
import { HtmlTextArea } from '../common/HtmlTextArea'
import HtmlSelect from '../common/HtmlSelect';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-bottom: .67857143rem;
	${props => props.indent && `
		border-left: 1px solid rgba(34, 36, 38, 0.15);
	`}
`

const Label = styled.div`
	flex: 0 0 122px;
	/* padding-top: calc(10.5rem/14); */
	font-size: calc(13rem/14);
	/* font-weight: bold; */
	line-height: 1.21428571rem;
	${props => props.required && `
		::after {
			content: '*';
			display: inline-block;
			margin: -.2em 0 0 .2em;
			vertical-align: top;
			color: #db2828;
		}
	`}
	${props => props.indent && `
		padding-left: 10px;
	`}
`

const Content = styled.div`
	flex: 1 1 auto;
	max-width: calc(100% - 122px);
`

const InputContainer = styled.div`
	width: ${props => props.width || '215px'};
`

const Error = styled.div`
	color: ${props => props.theme.colors.error};
`

export default ({
	label,
	required,
	indent,
	inputWidth,
	type,
	contentBeforeField,
	error,
	...rest
}) => {
	return (
		<Container
			indent={indent}
		>
			<Label
				className='fz-formFieldLabel'
				required={required}
				indent={indent}
			>
				{label}
			</Label>
			<Content>
				<InputContainer
					width={inputWidth}
				>
					{contentBeforeField}
					{	type === 'date' || type === 'datetime-local'
						? <HtmlDatePicker
								type={type}
								{...rest}
							/> :
						type === 'textarea'
						? <HtmlTextArea
								{...rest}
							/> :
						type === 'select'
						? <HtmlSelect
								{...rest}
							/>
						: <HtmlInput
								{...rest}
							/>
					}
				</InputContainer>
				{error &&
					<Error>
						{error}
					</Error>
				}
			</Content>
		</Container>
	)
}
