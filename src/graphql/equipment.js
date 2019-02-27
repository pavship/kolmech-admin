import gql from 'graphql-tag'

export const equipmentFragmentBasic = gql`
	fragment EquipmentFragmentBasic on Equipment {
		id
		name
	}
`

export const equipmentFragmentFull = gql`
	fragment EquipmentFragmentFull on Equipment {
		...EquipmentFragmentBasic
	}
	${equipmentFragmentBasic}
`