import React, { Component, Fragment } from 'react'

import { Form, Button, Message } from 'semantic-ui-react'
import { Div, Span, A, Label, CardSection } from './styled-semantic/styled-semantic.js'

import { graphql, compose } from 'react-apollo'
import { allEnquiries, createEnquiry, updateEnquiry } from '../graphql/enquiry'
import { upsertOrder } from '../graphql/order'
import { setLayout, getLayout, getLayoutOptions } from '../graphql/layout'
import { createOrg } from '../graphql/org'
import { allOrgsAndModels } from '../graphql/combinedQueries'

import LocalDatePicker from './common/LocalDatePicker'
import CurrencyInput from './common/CurrencyInput'
import SmartForm from './common/SmartForm'
import SmartInput from './common/SmartInput'

import { toLocalISOString }from '../utils/dates'

class OrderEdit extends Component {
    componentIsMounted = true
    // isNewEntity = this.props.id === 'new'
    isNewEntity = this.props.layout.details === 'new'
    state = {
        loading: false,
        err: null
    }
    submit = (entity) => {
        this.upsertOrder({
            ...entity, 
            ...this.isNewEntity && {
                enquiryId: this.props.entity.enquiryId,
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
            console.log('res > ', res)
            this.props.setLayout({ variables: {
                details: {
                    type: 'Order',
                    id: res.data.upsertOrder.id
                }
            }})
            // this.props.selectEnquiry(res.data.createEnquiry.id)
            // this.props.selectEntity(res.data.createOrder.id)
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
        // const orgs = allOrgsAndModels.orgs
        // const models = allOrgsAndModels.models
        const { closeDetails, cancel, submit, loading, layout: {details} } = this.props
        const isNewEntity = details.id === 'new'
        console.log('isNewEntity, details.id > ', isNewEntity, details.id)
        const order = isNewEntity
        ?   {
                dateLocal: toLocalISOString(new Date()).slice(0, 10),
                qty: '',
                amount: ''
            } 
        :   {
                dateLocal: this.props.order.dateLocal,
                qty: this.props.order.qty,
                amount: this.props.order.amount
            }
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
                    <CardSection>
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
                    </CardSection>
                    <CardSection>
                        {err &&
                            <Message
                                error
                                header={err.title}
                                content={err.message} 
                            />
                        }
                        <Div inline w='formLabelWidth' />
                        <Button 
                            primary
                            content={this.isNewEntity ? 'Создать' : 'Сохранить'}
                            disabled={disabled}
                            loading={loading}
                            onClick={submit}
                        />
                        <A cancel onClick={closeDetails}>Отмена</A>
                    </CardSection>
                </Fragment>}
            </SmartForm>
		)
	}
}

export default compose(
    graphql(createOrg, { 
        name: 'createOrg',
        options: {
            update: (cache, {data: { createOrg }}) => {
                const query = allOrgsAndModels
                const data = cache.readQuery({ query })
                data.orgs.push(createOrg)
                data.orgs.sort((a, b) => a.name > b.name)
                cache.writeQuery({ query, data })
            }
        }
    }),
    graphql(allOrgsAndModels, { name: 'allOrgsAndModels' }),
    graphql(setLayout, { name: 'setLayout' }),
    graphql(getLayout, getLayoutOptions),
    graphql(upsertOrder, { name: 'upsertOrder' }),
    graphql(updateEnquiry, { name: 'updateEnquiry' }),
    graphql(createEnquiry, { 
        name: 'createEnquiry',
        options: {
            update: (cache, {data: { createEnquiry }}) => {
                const query = allEnquiries
                const data = cache.readQuery({ query })
                createEnquiry.curStatusEvents = [createEnquiry.events[0]]
                createEnquiry.lastCoEvents = []
                data.enquiries.unshift(createEnquiry)
                cache.writeQuery({ query, data })
            }
        }
    }),
)(OrderEdit)