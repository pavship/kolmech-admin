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
    Input as SInput,
    Dropdown as SDropdown,
    Form as SForm,
    Ref
} from 'semantic-ui-react';

export const theme = {
	widths: {
		formLabel: '122px', //required calc(110px + 0.857143em)
		detailsPL: '55px',
		extraSidebar: '250px'
	},
	colors: {
		green: '#016936',
		blue: '#0E6EB8',
		error: '#9f3a38',
		errorBorder: '#e0b4b4'
	}
}
const getThemeColor = (color) => theme.colors[color] || color
const baseSet = ({ theme, bt, bb, bc, bl, br, bs, bsh, c, cur, d, f, fl, fs, fw, h, l, lh, mw, minw, m, mb, mt, ml, mr, o, ov, ox, oy, p, pb, pe, pos, pl, pr, pt, t, tr, ta, to, v, va, w, whs, ws, z }) => {
	return `
		${bt 	? `border-top: ${bt};`														: ''}
		${bb 	? `border-bottom: ${bb};`													: ''}
		${bc 	? `background-color: ${bc};`											: ''}
		${bl 	? `border-left: ${bl};`														: ''}
		${br 	? `border-right: ${br};`													: ''}
		${bs 	? `box-sizing: ${bs};`														: ''}
		${bsh ? `box-shadow: ${bsh};`														: ''}
		${c 	? `color: ${theme.colors && theme.colors[c] || c};`	: ''}
		${cur 	? `cursor: ${cur};`															: ''}
		${d 	? `display: ${d};`																: ''}
		${f 	? `flex: ${f};`																		: ''}
		${fl 	? `float: ${fl};`																	: ''}
		${fs 	? `font-size: ${fs};`															: ''}
		${fw 	? `font-weight: ${fw};`														: ''}
		${h 	? `height: ${h};`																	: ''}
		${l 	? `left: ${l};`																		: ''}
		${lh 	? `line-height: ${lh};`														: ''}
		${mw 	? `max-width: ${mw};`															: ''}
		${minw? `min-width: ${minw};`														: ''}
		${m 	? `margin: ${m};`																	: ''}
		${mb 	? `margin-bottom: ${mb};`													: ''}
		${mt 	? `margin-top: ${mt};`														: ''}
		${ml 	? `margin-left: ${ml};`														: ''}
		${mr 	? `margin-right: ${mr};`													: ''}
		${o  	? `opacity: ${o};`																: ''}
		${ov  ? `overflow: ${ov};`															: ''}
		${ox  ? `overflow-x: ${ox};`														: ''}
		${oy  ? `overflow-y: ${oy};`														: ''}
		${p 	? `padding: ${p};`																: ''}
		${pb 	? `padding-bottom: ${pb};`												: ''}
		${pl 	? `padding-left: ${pl};`													: ''}
		${pe 	? `pointer-events: ${pe};`												: ''}
		${pos ? `position: ${pos};`															: ''}
		${pr 	? `padding-right: ${pr};`													: ''}
		${pt 	? `padding-top: ${pt};`														: ''}
		${t 	? `top: ${t};`																		: ''}
		${tr 	? `transition: ${tr};`														: ''}
		${ta 	? `text-align: ${ta};`														: ''}
		${to 	? `text-overflow: ${to};`													: ''}
		${v 	? `visibility: ${v};`															: ''}
		${va 	? `vertical-align: ${va};`												: ''}
		${w 	? `width: ${(theme.widths && theme.widths[w]) || w};`		: ''}
		${whs ? `white-space: ${whs};`													: ''}
		${ws 	? `word-spacing: ${ws};`													: ''}
		${z 	? `z-index: ${z};`																: ''}
	`
}

const DivPropFilter = ({ ml, w, inline, ...rest }) => (
	<div {...rest} />
)
export const Div = styled(DivPropFilter)`
	${props => props.inline && `display: inline-block;`}
	${props => baseSet(props)}
`

const PPropFilter = ({ ...rest }) => (
	<p {...rest} />
)
export const P = styled(PPropFilter)`
	${props => baseSet(props)}
`

const SpanPropFilter = ({ ml, ...rest }) => (
	<span {...rest} />
)
export const Span = styled(SpanPropFilter)`
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

const HeaderPropFilter = ({ inline, c, ...rest }) => (
	<SHeader {...rest} />
)
export const Header = styled(HeaderPropFilter)`
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

const IconPropFilter = ({
	active,
	activeColor,
	selectMode,
	disabled,
	onClick,
	...rest
}) => (
	<SIcon
		{...rest}
		disabled={disabled}
		onClick={disabled ? undefined : onClick}
	/>
)
export const Icon = styled(IconPropFilter)`
	&&&& {
		${props => baseSet(props)}
	}
	&&&&& {
		${props => props.activeColor && `{
			&:hover {
				color: ${getThemeColor(props.activeColor)} !important;
			}
			&.active {
				color: ${getThemeColor(props.activeColor)} !important;
			}
			${props.active && `color: ${getThemeColor(props.activeColor)} !important;`}
		}`}
		${props => props.disabled && 'opacity: .45!important;'}
	}
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

const ButtonPropFilter = ({ activeColor, menu, ...rest }) => (
	<SButton {...rest} />
)
export const Button = styled(ButtonPropFilter)`
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

const MessagePropFilter = ({
	section,
	...rest
}) => (
	<SMessage {...rest} />
)
export const Message = styled(MessagePropFilter)`
	&&&& {
		${props => baseSet(props)}
	}
	&&& {
		${props => props.section && `
			margin-top: 0;
			padding-left: ${props.theme.widths.detailsPL};
			box-shadow: 0 0 0 1px #e0b4b4, 0 0 0 0 transparent;
			border-radius: 0;
		`}
	}
`

const SectionPropFiltered = React.forwardRef(({
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
}, ref) => (
		<div
			ref={ref}
			{...rest}
			onClick={onClick || undefined}
		>
			{children}
		</div>
))
export const Section = styled(SectionPropFiltered)`
	width: 100%;
	padding: 1em 1em 1em 55px;
	${props => baseSet(props)}
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

const PopupPropFilter = ({ showIf, ...rest }) => (
	<SPopup {...rest} />
)
export const Popup = styled(PopupPropFilter)`
	&&& {
		${props => !props.showIf && `{
			opacity: 0;
		}`}
	}
`

export const Label = styled.label`
	${props => baseSet(props)}
	width: ${props => props.theme.widths.formLabel} !important;
	margin-right: 0 !important;
`

const InputPropFilter = React.forwardRef(({ w, ...rest }, ref) => (
	<Ref innerRef={ref}>
		<SInput {...rest} />
	</Ref>
))
export const Input = styled(InputPropFilter)`
	&&&& {
		${props => baseSet(props)}
	}
`

export const Dropdown = styled(SDropdown)`
	&&&& {
		${props => baseSet(props)}
	}
`

const FormFieldPropFilter = ({ w, ...rest }) => (
	<SForm.Field {...rest} />
)
export const FormField = styled(FormFieldPropFilter)`
	&&&& {
		${props => baseSet(props)}
	}
`