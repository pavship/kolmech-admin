import gql from 'graphql-tag'

export const taskFragmentBasic = gql`
	fragment taskFragmentBasic on Task {
		id
	}
`

export const taskFragmentMiddle = gql`
	fragment taskFragmentMiddle on Task {
		...taskFragmentBasic
    end
    from
    status
    to
    exec { id }
  }
  ${taskFragmentBasic}
`

export const taskFragmentFull = gql`
	fragment taskFragmentFull on Task {
		...taskFragmentMiddle
    text
  }
  ${taskFragmentMiddle}
`

export const taskDetails = gql`
	query task ($id: ID!) {
		task (id: $id) {
			...taskFragmentFull
		}
	}
	${taskFragmentFull}
`

export const upsertTask = gql`
	mutation upsertTask($input: TaskInput!) {
		upsertTask(input: $input) {
			...taskFragmentMiddle
		}
	}
	${taskFragmentMiddle}
`