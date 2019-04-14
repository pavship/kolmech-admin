import React from 'react'

import { Mutation, Query } from 'react-apollo'
import { upsertPayment, paymentsPage } from '../../graphql/payment'
import { syncWithAmoContacts } from '../../graphql/amo'

import { Formik } from 'formik'
import { projectEntity, preparePayload } from '../form/utils'
import { formikSchema, validationSchema } from '../../schema/payment'
import Field from '../form/Field'

import { NotificationsConsumer } from '../notifications/NotificationsContext'

import styled from 'styled-components'
import { Button, A, Div } from '../styled/styled-semantic'
import { persons } from '../../graphql/person';
import produce from 'immer';

const Container = styled.div`
	min-height: content;
	max-width: 50%;
	min-width: 430px;
	flex: 0 0 430px;
	box-shadow: 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
	border: 1px solid rgba(34,36,38,.15);
	border-radius: .28571429rem;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	height: 52px;
	padding: 0 2rem;
	font-size: 1.28571429rem;
	line-height: 1.28571429em;
	font-weight: bold;
	border-bottom: 1px solid rgba(34,36,38,.15);
`

const Fields = styled.div`
	.fz-formFieldLabel {
		${({ labelWidth }) => labelWidth ? `flex-basis: ${labelWidth} !important;` : ''}
	}
`

export default ({
	payment,
	reset,
	articles,
	equipment
}) => {
	let schema = formikSchema(new Date())
	let initialValues = payment ? projectEntity(payment, schema) : schema
	const formLabelWidth = '110px'
	const articleOptions = articles.map(a => 
		({ key: a.id, text: a.rusName, value: a.id })
	)
	const bankPayment = payment && payment.org
	return (
		<NotificationsConsumer>
			{({ notify }) =>
				<Container>
					<Query
						query={persons}
						onError={err => notify({
							type: 'error',
							title: 'Ошибка загрузки контактов',
							content: err.message,
						})}
					>
						{({ loading: personsLoading,
								data,
								refetch: refetchPersons
							}) => <>
							<Mutation
								mutation={syncWithAmoContacts}
								onCompleted={() => {
									refetchPersons()
									notify({
										type: 'success',
										title: 'Контакты синхронизированы'
									})
								}}
								onError={err => notify({
									type: 'error',
									title: 'Ошибка синхронизации с Амо',
									content: err.message,
								})}
							>
								{(syncWithAmoContacts, { loading }) => 
									<Header>
										{(payment ? 'Изменить' : 'Добавить') + ' платеж'}
										<Button
											ml='auto'
											icon='sync alternate'
											content='Контакты AmoCRM'
											onClick={() => syncWithAmoContacts()}
											loading={loading}
										/>
									</Header>
								}
							</Mutation>
							<Div
								p='1rem 2rem'
							>
								<Mutation
									mutation={upsertPayment}
									onCompleted={() => notify({
										type: 'success',
										title: 'Платеж сохранен'
									})}
									onError={err => notify({
										type: 'error',
										title: 'Ошибка сохранения',
										content: err.message,
									})}
									update={(cache, { data: { upsertPayment } }) => {
										const { payments } = cache.readQuery({ query: paymentsPage })
										cache.writeQuery({
											query: paymentsPage,
											data: {
												payments: produce(payments, draft => {
													const foundIndex = draft.findIndex(p => p.id === upsertPayment.id)
													return foundIndex
														? draft.splice(foundIndex, 1, upsertPayment)
														: draft.unshift(upsertPayment)
												})
											}
										})
									}}
								>
									{(upsertPayment, { loading }) =>
										<Formik
											initialValues={initialValues}
											enableReinitialize={true}
											validationSchema={validationSchema}
											onSubmit={async (values, { resetForm }) => {
												// console.log('values > ', values)
												// console.log('initialValues > ', initialValues)
												const input = preparePayload(values, initialValues, schema)
												// console.log('input > ', input)
												await upsertPayment({ variables: { input } })
												// const upserted = await upsertPayment({ variables: { input } })
												// console.log('upserted > ', upserted)
												return payment ? reset() : resetForm()
											}}
										>
											{({
												values,
												handleSubmit,
												handleReset,
											}) =>
												<Fields
													labelWidth={formLabelWidth}
												>
													{!bankPayment &&
														<Field
															label='Дата'
															required
															name='dateLocal'
															type='date'
														/>
													}
													<Field
														label='Статья'
														required
														name='articleId'
														options={articleOptions}
													/>
													{!bankPayment &&
														<Field
															label='Контрагент'
															required
															name='personId'
															options={data.persons
																? data.persons.map(p => 
																	({ key: p.id, text: p.amoName || p.fName, value: p.id })
																)
																: undefined
															}
															loading={personsLoading}
															disabled={personsLoading}
														/>
													}
													{values.articleId 
														&& articles.find(a => a.id === values.articleId).relations
														&& articles.find(a => a.id === values.articleId).relations.includes('EQUIPMENT') &&
															<Field
																label='Оборудование'
																required
																name='equipmentId'
																options={equipment.map(e => 
																	({ key: e.id, text: e.name, value: e.id })
																)}
															/>
													}
													{!bankPayment && <>
														<Field
															label='Назначение'
															name='purpose'
														/>
														<Field
															label='Сумма'
															required
															name='amount'
														/>
													</>}
													<Button
														ml={formLabelWidth}
														type='button'
														primary
														content={payment ? 'Сохранить' : 'Добавить'}
														loading={loading}
														onClick={handleSubmit}
													/>
													<A cancel
														onClick={payment ? () => reset() : handleReset}
													>
														{payment ? 'Отмена' : 'Очистить'}
													</A>
												</Fields>
											}
										</Formik>
									}
								</Mutation>
							</Div>
						</>}
					</Query>
				</Container>
			}
		</NotificationsConsumer>
	)
}

