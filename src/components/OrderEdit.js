import React, { Component, Fragment } from 'react'

import { Form, Button, Message } from 'semantic-ui-react'
import { Div, Span, A, Label, Section } from './styled-semantic/styled-semantic.js'

import { graphql, compose } from 'react-apollo'
import { orderLocal, upsertOrder } from '../graphql/order'
import { allEnquiries } from '../graphql/enquiry'

import { toLocalISOString } from '../utils/dates'

import LocalDatePicker from './common/LocalDatePicker'
import CurrencyInput from './common/CurrencyInput'
import SmartForm from './common/SmartForm'
import SmartInput from './common/SmartInput'

class OrderEdit extends Component {
	componentIsMounted = true
	isNewEntity = this.props.id === 'new'
	state = {
		loading: false,
		err: null
	}
	submit = (entity) => {
		this.upsertOrder({
			...entity,
			...this.isNewEntity && {
				enquiryId: this.props.enquiryId,
			},
			...!this.isNewEntity && {
				id: this.props.id,
			}
		})
	}
	upsertOrder = async (variables) => {
		try {
			this.setState({ loading: true })
			const res = await this.props.upsertOrder({ variables })
			if (!this.componentIsMounted) return
			this.setState({ loading: false, err: null })
			this.props.setDetails({
				type: 'Order',
				id: res.data.upsertOrder.id
			})
			this.props.setExpanded({
				id: res.data.upsertOrder.id,
				value: true
			})
		} catch (err) {
			if (!this.componentIsMounted) return
			this.setState({
				loading: false,
				err: {
					title: `${this.isNewEntity ? 'Создать' : 'Сохранить'} не удалось..`,
					message: err.message
				}
			})
			console.log(err)
		}
	}
	componentWillUnmount() {
		this.componentIsMounted = false
	}
	render() {
		const { loading } = this.state
		const { id, closeDetails, setDetails } = this.props
		const isNewEntity = id === 'new'
		const order = isNewEntity
			? {
				dateLocal: toLocalISOString(new Date()).slice(0, 10),
				qty: '',
				amount: ''
			}
			: this.props.orderLocal.orderLocal
		return (
			<SmartForm
				isNewEntity={isNewEntity}
				entity={order}
				requiredFields={['dateLocal', 'qty', 'amount']}
				submit={this.submit}
				err={this.state.err}
			>
				{({
					disabled,
					err,
					setField,
					submit,
					formState: { dateLocal, qty, amount }
				}) => <Fragment>
					<Section
						bottomBorder
					>
						<Form>
							<Form.Field inline>
								<Label>Дата</Label>
								<LocalDatePicker
									field={dateLocal}
									setField={setField}
								/>
							</Form.Field>
							<Form.Field inline required>
								<Label>Кол-во</Label>
								<SmartInput
									type='number'
									placeholder='Введите кол-во шт.'
									field={qty}
									setField={setField}
								/>
								<Span pl='6px'>шт.</Span>
							</Form.Field>
							<Form.Field inline required>
								<Label>Сумма</Label>
								<CurrencyInput
									field={amount}
									setField={setField}
									placeholder='Введите сумму заказа'
								/>
							</Form.Field>
						</Form>
					</Section>
					<Section>
						{err &&
							<Message
								error
								header={err.title}
								content={err.message}
							/>
						}
						<Div inline w='formLabel' />
						<Button
							primary
							content={this.isNewEntity ? 'Создать' : 'Сохранить'}
							disabled={disabled}
							loading={loading}
							onClick={submit}
						/>
						<A cancel
							onClick={
								id === 'new'
									? closeDetails
									: () => setDetails({
										type: 'Order',
										id
									})
							}
						>
							Отмена
						</A>
					</Section>
				</Fragment>}
			</SmartForm>
		)
	}
}

export default compose(
	graphql(upsertOrder, {
			name: 'upsertOrder',
			options: {
				update: (cache, { data: responseData }) => {
					const upsertedOrder = responseData.upsertOrder
					console.log('this > ', this)
					const query = allEnquiries
					const data = cache.readQuery({ query })
					const enquiry = data.enquiries.find(e => e.id === upsertedOrder.enquiry.id)
					enquiry.orders = [
						...enquiry.orders.filter(o => o.id !== upsertedOrder.id),
						upsertedOrder
					].sort((a, b) => a.num > b.num)
					cache.writeQuery({ query, data })
				}
			}
	}),
	graphql(orderLocal, {
		name: 'orderLocal',
		skip: (props) => props.id === 'new'
	}),
)(OrderEdit)