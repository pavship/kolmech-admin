import React from 'react'
import styled from 'styled-components'

// S prefix is used throughout the App just to have flexebility (two names for each component)
// N prefix stands for NativeCssImplementation of a component (When html element is styled instead of semantic ui component) 

import { 
	Header as SHeader, 
	// Label as SLabel,
	Icon as SIcon, 
	Button as SButton,
	Message as SMessage,
	Popup as SPopup,
	Dropdown as SDropdown
} from 'semantic-ui-react'

export const theme = {
	widths: {
		formLabel: '122px', //required calc(110px + 0.857143em)
		detailsPL: '55px',
		extraSidebar: '250px'
	},
	colors: {
		green: '#016936',
		blue: '#0E6EB8'
	}
}
const getThemeColor = (color) => theme.colors[color] || color
const baseSet = ({ theme, w, m, ml, pl, fs, fw, c, lh, ta, ws }) => {
	return `
		${w ? `width: ${theme.widths[w] || w};`: ''}
		${m ? `margin: ${m};`: ''}
		${ml ? `margin-left: ${ml};`: ''}
		${pl ? `padding-left: ${pl};`: ''}
		${fs ? `font-size: ${fs};`: ''}
		${fw ? `font-weight: ${fw};`: ''}
		${c ? `color: ${c};`: ''}
		${lh ? `line-height: ${lh};`: ''}
		${ta ? `text-align: ${ta};`: ''}
		${ws ? `word-spacing: ${ws};`: ''}
	`
}

const DivWithFilteredProps = ({ ml, inline, ...rest }) => (
	<div {...rest} />
)
export const Div = styled(DivWithFilteredProps)`
	${props => props.inline && `display: inline-block;`}
	${props => baseSet(props)}
`

const PWithFilteredProps = ({ ...rest }) => (
	<p {...rest} />
)
export const P = styled(PWithFilteredProps)`
	${props => baseSet(props)}
`

const SpanWithFilteredProps = ({ ml, ...rest }) => (
	<span {...rest} />
)
export const Span = styled(SpanWithFilteredProps)`
	${props => baseSet(props)}
`

export const A = styled.a`
	cursor: pointer;
	${props => props.cancel && `{
		padding-left: 15px;
		color: rgba(0,0,0,.87);
		&:hover {
			color: #B03060;
		}
	}`}
`

const HeaderWithFilteredProps = ({ inline, c, ...rest }) => (
	<SHeader {...rest} />
)
export const Header = styled(HeaderWithFilteredProps)`
	&&&& {
		${props => baseSet(props)}
	}
	&&& {
		${props => props.inline && `{
			margin: 0;
			padding: 0 1rem;
		}`}
	}
`

export const Label = styled.label`
	width: ${props => props.theme.widths.formLabel} !important;
	margin-right: 0 !important;
`

const DropdownIcon = ({active, disabled, ...rest}) => (
	<SIcon {...rest}
		name='dropdown'
	/>
)
export const Caret = styled(DropdownIcon)`
	transform: ${
		props => !props.active && (
			props.size === 'large'
			? 'translateX(0) translateY(0) rotate(-90deg) !important'
			: 'translateX(-3px) translateY(3px) rotate(-90deg) !important'
		)
	};
	&&& {
		${props => props.disabled && `{
			color: rgba(0,0,0,.6);
		}`}
	}
`

const ButtonWithFilteredProps = ({ activeColor, menu, ...rest }) => (
	<SButton {...rest} />
)
export const Button = styled(ButtonWithFilteredProps)`
	&&&& {
		${props => baseSet(props)}
	}
	&&& {
		&.compact {
			padding: .5rem 1rem;
		}
		${props => props.activeColor && `{
			&:hover {
				color: ${getThemeColor(props.activeColor)} !important;
			}
			&.active {
				color: ${getThemeColor(props.activeColor)} !important;
        	}
		}`}
		${props => props.menu && `{
			margin: .25rem 0 .25rem 0.5rem;
			z-index: 3;
		}`}
	}
`

const MessageWithFilteredProps = ({
	section,
	...rest
}) => (
	<SMessage {...rest} />
)
export const Message = styled(MessageWithFilteredProps)`
	&&& {
		${props => props.section && `
			margin-top: 0;
			padding-left: ${props.theme.widths.detailsPL};
			box-shadow: 0 0 0 1px #e0b4b4, 0 0 0 0 transparent;
			border-radius: 0;
		`}
	}
`

const SectionPropFiltered = ({
	head,
	minor,
	small,
	secondary,
	noP,
	noLP,
	noIndent,
	topBorder,
	bottomBorder,
	children,
	onClick,
	...rest
}) => (
		<div
			{...rest}
			onClick={onClick || undefined}
		>
			{children}
		</div>
)
export const Section = styled(SectionPropFiltered)`
	width: 100%;
	padding: 1em 1em 1em 55px;
	${props => props.head && `{
		display: flex;
		align-items: center;
		padding-top: 0;
		padding-bottom: 0;
	}`}
	${props => props.onClick && `{
		cursor: pointer;
	}`}
	${props => props.minor && `{
		min-height: 3.5em;
	}`}
	${props => !props.size && props.head && `{
		min-height: 3.5em;
	}`}
	${props => props.size === 'small' && `{
		min-height: 2.5em;
	}`}
	${props => props.secondary && `{
		background: #f3f4f5;
		color: rgba(0,0,0,.6);
	}`}
	${props => props.noLP && `{
		padding-left: 0;
	}`}
	${props => props.noIndent && `{
		padding-left: 1em;
	}`}
	${props => props.topBorder && `{
		border-top: 1px solid ${props.topBorder === 'dark' ? 'rgba(152, 153, 154, 1)' : 'rgba(34,36,38,.15)'};
	}`}
	${props => props.bottomBorder && `{
		border-bottom: 1px solid ${props.bottomBorder === 'dark' ? 'rgba(126, 127, 129, 1)' : 'rgba(34,36,38,.1)'};
	}`}
`

const PopupWithFilteredProps = ({ showIf, ...rest }) => (
	<SPopup {...rest} />
)
export const Popup = styled(PopupWithFilteredProps)`
	&&& {
		${props => !props.showIf && `{
			opacity: 0;
		}`}
	}
`

export const Dropdown = styled(SDropdown)`
	&&&&&& {
		width: 350px;
		&:hover {
			border-color: rgba(34, 36, 38, 0.15);
		}
	}
`
