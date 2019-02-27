import styled from 'styled-components'

export const Table = styled.table`
	/* table-layout: fixed; */
	width: 100%;
	border-collapse: collapse;
`

export const Tr = styled.tr`
  margin: 0 0 1em;
  line-height: 1.4285em;
  color: rgba(0,0,0,.87);
`

export const Td = styled.td`
  :nth-child(1) {
		width: ${props => props.theme.widths.formLabel};
	// color: rgba(0,0,0,.87);
	/* font-size: .92857143em; */
	/* line-height: 32px; */
		line-height: 1.21428571em;
		padding: .67857143em 0;
		vertical-align: top;
  }
  :nth-child(2) {
		// width: 100px;
		font-size: 1em;
		font-weight: bold;
		line-height: 1.21428571em;
		padding: .67857143em 0;
  }
`
export const InputTd = styled(Td)`
	padding-top: 0 !important;
`

export const EditorTd = styled(InputTd)`
	font-weight: unset !important;
	/* padding-bottom: 0 !important; */
`