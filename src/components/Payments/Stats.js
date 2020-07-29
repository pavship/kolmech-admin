import React from 'react'

import styled from 'styled-components'
import { Statistic } from 'semantic-ui-react'
import { currency } from '../../utils/format'

const Container = styled.div`
	flex-grow: 1;
	height: 100%;
	margin-left: 30px;
  overflow-y: auto;
	>div {
		width: 100%;
	}
`

const SStatistic = styled(Statistic)`
	&&&&>.value {
		${({ color }) => color && `
			color: ${
				color === 'green' ? '#016936' :
				color === 'red' ? '#9f3a38' :
				color === 'purple' ? '#9924bf' :
				// color === 'violet' ? '#5d31bb' :
				color === 'blue' ? '#2185d0' :
				color
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
	mdKontragents,
	userRole,
}) => {
	const persons = payments
		.filter(p => !!p.person)
		.map(p => p.person)
		.reduce((uniquePersons, p) => {
			if (!uniquePersons.find(up => up.id === p.id))
				uniquePersons.push(p)
			return uniquePersons
		}, [])
	const debtsAndLoans = payments
		.filter(p => !!p.article)
		.filter(p => p.article.isLoan)
		.reduce((debts, p) => {
			const counterparty = debts.find(d => d.id === (p.person && p.person.id) || d.Inn === p.inn)
			counterparty.total += (p.article.isIncome ? 1 : -1) * p.amount
			return debts
		}, [
			...persons.map(a => ({ ...a, total: 0 })),
			...mdKontragents.map(a => ({ ...a, total: 0 }))
		])
		.reduce((split, d) => {
			if (d.total > 0) split[1].push(d)
			else if (d.total < 0) split[0].push({ ...d, total: -1*d.total})
			return split
		}, [[],[]])
	return (
		<Container>
			<Statistic.Group>
				<SStatistic
					color='green'
				>
					<Statistic.Value
						content={currency(accounts
							.filter(a => !a.number) // only cache accounts
							.reduce((sum, a) => sum + a.balance, 0))}
					/>
					<Statistic.Label
						content='Касса, в т.ч.'
					/>
					<Statistic.Group
						horizontal
						size='small'
					>
						{accounts
							.filter(a => !a.number)
							.map(({ id, name, balance }) =>
								<Statistic
									key={id}
									label={name}
									value={currency(balance)} 
								/>
						)}
					</Statistic.Group>
				</SStatistic>
				{userRole === 'OWNER' && <>
					<SStatistic
						color='blue'
					>
						<Statistic.Value
							content={currency(accounts
								.filter(a => !!a.number) // only bank accounts
								.reduce((sum, a) => sum + a.balance, 0))}
						/>
						<Statistic.Label
							content='Счета, в т.ч.'
						/>
						<Statistic.Group
							horizontal
							size='small'
						>
							{accounts
								.filter(a => !!a.number)
								.map(({ id, name, balance }) =>
									<Statistic
										key={id}
										label={name}
										value={currency(balance)} 
									/>
							)}
						</Statistic.Group>
					</SStatistic>
					<SStatistic
						color='purple'
					>
						<Statistic.Value
							content={currency(debtsAndLoans[0].reduce((sum, l) => sum + l.total, 0))}
						/>
						<Statistic.Label
							content='Нам должны, в т.ч.'
						/>
						<Statistic.Group
							horizontal
							size='small'
						>
							{debtsAndLoans[0].map(({ id, Id, amoName, name, total, Name }, i) =>
								<Statistic
									key={id || Id}
									label={!!amoName
										? amoName.slice(0, amoName.lastIndexOf(' ') + 2) + '.' :
										Name ? Name : name.slice(0, 12) + '...'
									}
									value={currency(total)} 
								/>
							)}
						</Statistic.Group>
					</SStatistic>
					<SStatistic
						color='red'
					>
						<Statistic.Value
							content={currency(-debtsAndLoans[1].reduce((sum, d) => sum + d.total, 0))}
						/>
						<Statistic.Label
							content='Мы должны, в т.ч.'
						/>
						<Statistic.Group
							horizontal
							size='small'
						>
							{debtsAndLoans[1].map(({ id, Id, amoName, name, total, Name }, i) =>
								<Statistic
									key={id || Id}
									label={!!amoName
										? amoName.slice(0, amoName.lastIndexOf(' ') + 2) + '.' :
										Name ? Name : name.slice(0, 12) + '...'
									}
									value={currency(total)}
								/>
							)}
						</Statistic.Group>
					</SStatistic>
				</>}
			</Statistic.Group>
		</Container>
	)
}

