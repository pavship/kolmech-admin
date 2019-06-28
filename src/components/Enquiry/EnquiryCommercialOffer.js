import React, { Component, Fragment } from 'react'

import { Header, Form, Message, Button, Divider } from 'semantic-ui-react'
import { Div, A, Label, Section } from '../styled/styled-semantic'

import LocalDatePicker from '../common/LocalDatePicker'
import CurrencyInput from '../common/CurrencyInput'
import SmartForm from '../common/SmartForm'

import { toLocalISOString } from '../../utils/dates'

class EnquiryCommercialOffer extends Component {
	render() {
		const { cancel, submit, loading } = this.props
		const isNewCO = this.props.id === 'new'
		const co = isNewCO
		?   {
				dateLocal: toLocalISOString(new Date()).slice(0, 10),
				amount: ''
			} 
		:   {
				dateLocal: this.props.co.dateLocal,
				amount: this.props.co.amount
			}
		return (
			<SmartForm
				isNewEntity={isNewCO}
				entity={co}
				requiredFields={['dateLocal', 'amount']}
				submit={submit}
			>
				{({
					disabled,
					err,
					setField,
					submit,
					formState: { dateLocal, amount }
				}) => <Fragment>
					<Section
						head
						minor
						secondary
						topBorder
						bottomBorder
					>
						<Header>
							Коммерческое предложение
						</Header>
					</Section>
					<Section
						secondary
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
								<Label>Сумма</Label>
								<CurrencyInput
									field={amount}
									setField={setField}
									placeholder='Введите сумму КП'
								/>
							</Form.Field>
						</Form>
					</Section>
					<Section
						secondary
						small
					>
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
							content={'Создать'}
							disabled={disabled}
							loading={loading}
							onClick={submit} />
						<A cancel onClick={cancel}>Отмена</A>
					</Section>
					<Divider fitted/>
				</Fragment>}
			</SmartForm>
		)
	}
}

export default EnquiryCommercialOffer