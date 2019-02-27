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
	flex: 1 1 500px;
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
	articles,
	equipment
}) => {
	let schema = formikSchema(new Date)
	let initialValues = payment ? projectEntity(payment, schema) : schema
	const formLabelWidth = '110px'
	const articleOptions = articles.map(a => 
		({ key: a.id, text: a.rusName, value: a.id })
	)
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
										title: 'Контакты синхронизированны'
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
										Добавить платеж
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
												payments: produce(payments, draft => { draft.unshift(upsertPayment) })
											}
										})
									}}
								>
									{(upsertPayment, { loading }) =>
										<Formik
											initialValues={initialValues}
											validationSchema={validationSchema}
											onSubmit={async (values, { resetForm }) => {
												// console.log('values > ', values)
												const initialValues = payment ? projectEntity(payment, schema) : schema
												// console.log('initialValues > ', initialValues)
												const input = preparePayload(values, initialValues, schema)
												// console.log('input > ', input)
												await upsertPayment({ variables: { input } })
												// const upserted = await upsertPayment({ variables: { input } })
												// console.log('upserted > ', upserted)
												return resetForm()
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
													<Field
														label='Дата'
														required
														name='dateLocal'
														type='date'
													/>
													<Field
														label='Статья'
														required
														name='articleId'
														options={articleOptions}
													/>
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
													<Field
														label='Назначение'
														name='purpose'
													/>
													<Field
														label='Сумма'
														required
														name='amount'
													/>
													<Button
														ml={formLabelWidth}
														type='button'
														primary
														content={payment ? 'Сохранить' : 'Добавить'}
														loading={loading}
														onClick={handleSubmit}
													/>
													<A cancel
														onClick={handleReset}
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

