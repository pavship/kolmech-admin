import React from 'react'
import styled from 'styled-components'
import { Label as SLabel, Card } from 'semantic-ui-react'

export const theme = {
	formLabelWidth: '110px' //required
}

const baseSet = (props) => {
	return `
		${props.fw && `font-weight: ${props.fw};`}
		${props.lh && `line-height: ${props.lh};`}
	`
}

export const Div = styled.div`
	${props => props.inline && `display: inline-block;`}
	${props => props.w && `width: ${props.w === 'formLabelWidth' ? `calc(${props.theme.formLabelWidth} + 0.857143em)`: props.w};`}
`

export const P = styled.p`
	${props => baseSet(props) }
`

export const Span = styled.span`
	${props => props.pl && `padding-left: ${props.pl};`}
	${props => props.c && `color: ${props.c};`}
	${props => props.fs && `font-size: ${props.fs};`}
	${props => props.ws && `word-spacing: ${props.ws};`}
`

export const A = styled.a`
	${props => props.cancel && `{
		padding-left: 15px;
		color: rgba(0,0,0,.87);
		&:hover {
			color: #B03060;
		}
	}`}
`

export const Label = styled.label`
	width: ${props => props.theme.formLabelWidth} !important;
`

const CardContentPropFiltered = ({ secondary, minor, head, noIndent, ...rest }) => (
	<Card.Content {...rest} />
)
export const CardSection = styled(CardContentPropFiltered).attrs({
	minor: props => props.minor || props.head
})`
	&&& {
		padding-left: 55px;
		${props => props.secondary && `{
			background: #f3f4f5;
			color: rgba(0,0,0,.6);
		}`}
		${props => props.minor && `{
			padding-top: 0.464286em;
			padding-bottom: 0.464286em;
			min-height: 3.5em;
		}`}
		${props => props.head && `{
			display: flex;
			align-items: center;
		}`}
		${props => props.noIndent && `{
			padding-left: 1em;
		}`}
	}
`
