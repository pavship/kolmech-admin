import React from 'react'

import styled from 'styled-components'
import { Div } from '../styled/styled-semantic'
import { Statistic } from 'semantic-ui-react'
import { currency } from '../../utils/format';

const SStatistic = styled(Statistic)`
	&&&&>.value {
		${({ color }) => color && `
			color: ${
				color === 'green' ? '#016936' :
				color === 'red' ? '#9f3a38' :
				color === 'purple' ? '#9924bf' :
				// color === 'violet' ? '#5d31bb' :
				''
			};
		`}
		text-align: unset;
	}
	&&&&>.label {
		padding-left: 2em;
		text-align: unset;
	}
`

export default ({
	payments,
	accounts,
}) => {
	// TODO make postgres aggregation query on server side instead of reduce here
	const accountsStats = payments
		.reduce((accounts, p) => {
			const account = accounts.find(a => a.id === p.account.id)
			account.total += (p.article.isIncome ? 1 : -1) * p.amount
			return accounts
		}, accounts.map(a => ({ ...a, total: 0 })))
	const persons = payments
		.map(p => p.person)
		.reduce((uniquePersons, p) => {
			if (!uniquePersons.find(up => up.id === p.id))
				uniquePersons.push(p)
			return uniquePersons
		}, [])
	const deptsAndLoans = payments
		.filter(p => p.article.isLoan)
		.reduce((depts, p) => {
			const person = depts.find(d => d.id === p.person.id)
			person.total += (p.article.isIncome ? 1 : -1) * p.amount
			return depts
		}, persons.map(a => ({ ...a, total: 0 })))
		.reduce((split, d) => {
			if (d.total > 0) split[1].push(d)
			else if (d.total < 0) split[0].push({ ...d, total: -1*d.total})
			return split
		}, [[],[]])
	return (
		<Div
			m='0 30px'
		>
			<Statistic.Group>
				<SStatistic
					color='green'
				>
					<Statistic.Value
						content={currency(accountsStats.reduce((sum, a) => sum + a.total, 0))}
					/>
					<Statistic.Label
						content='Касса, в т.ч.'
					/>
					<Statistic.Group horizontal>
						{accountsStats.map(({ id, name, total }) =>
							<Statistic
								key={id}
								label={name}
								value={currency(total)} 
							/>
						)}
					</Statistic.Group>
				</SStatistic>
				<SStatistic
					color='purple'
				>
					<Statistic.Value
						content={currency(deptsAndLoans[0].reduce((sum, l) => sum + l.total, 0))}
					/>
					<Statistic.Label
						content='Нам должны, в т.ч.'
					/>
					<Statistic.Group
						horizontal
						size='small'
					>
						{deptsAndLoans[0].map(({ id, amoName, total }) =>
							<Statistic
								key={id}
								label={amoName}
								value={currency(total)} 
							/>
						)}
					</Statistic.Group>
				</SStatistic>
				<SStatistic
					color='red'
				>
					<Statistic.Value
						content={currency(-deptsAndLoans[1].reduce((sum, d) => sum + d.total, 0))}
					/>
					<Statistic.Label
						content='Мы должны, в т.ч.'
					/>
					<Statistic.Group
						horizontal
						size='small'
					>
						{deptsAndLoans[1].map(({ id, amoName, total }) =>
							<Statistic
								key={id}
								label={amoName}
								value={currency(total)}
							/>
						)}
					</Statistic.Group>
				</SStatistic>
			</Statistic.Group>
		</Div>
	)
}

