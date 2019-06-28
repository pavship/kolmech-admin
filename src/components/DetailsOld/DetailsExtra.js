import React, { Fragment } from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Section } from '../styled/styled-semantic'

import { Query } from 'react-apollo'
import { modelLocal } from '../../graphql/model'
import { modelProds } from '../../graphql/prod'

import GlobalContext from '../context/GlobalContext'
import DetailsHeader from './DetailsHeader'
import ProdsByDept from '../Order/ProdsByDept'
import ProdTableUtils from '../Order/ProdTableUtils'
import DeptProdTable from '../Order/DeptProdTable'
import ListProvider from '../context/ListProvider';
import OrderContext from '../context/OrderContext';

const Container = styled.div`
	width: 40%;
	min-height: calc(100vh - 36px);
	height: fit-content;
	/* border-left: 1px solid rgb(126, 126, 129); */
	border-left: 1px solid rgb(156, 156, 159);
`

const DetailsExtra = ({ closeExtra }) => {
	return (
		<GlobalContext>
			{({ extra, selectedProdIds, setSelectedProdIds }) => (
				<Container>
					{!!extra && 
						<Fragment>
							<Query
								query={modelLocal}
								variables={{ id: extra.modelId }}
							>
								{({ data: { modelLocal } }) =>
									<DetailsHeader
										title={modelLocal.name + ' в наличии'}
										size='small'
										noIndent
										bottomBorder='dark'
										buttons={
											<Icon link
												name='cancel'
												onClick={closeExtra}
											/>
										}
									/>
								}
							</Query>
							<Query
								query={modelProds}
								variables={{ modelId: extra.modelId }}
							>
								{({ loading, error, data }) => {
									if (loading) return <Section noIndent >Загрузка...</Section>
									if (error) return <Section noIndent >Ошибка {error.message}</Section>
									return (
										<OrderContext
											id={extra.orderId}
										>
											{({ orderLocal }) =>
												<ListProvider>
													{({ list: expandedIds, toggle: toggleExpanded }) =>
														<ProdsByDept
															prods={data.modelProds}
															selectedIds={selectedProdIds}
															orderId={extra.orderId}
															selectLimit={orderLocal.qty}
															expandedIds={expandedIds}
														>
															{({ depts }) =>
																<ProdTableUtils
																	depts={depts}
																	setList={setSelectedProdIds}
																	selectLimit={orderLocal.qty}
																>
																	{({ select }) =>
																		<DeptProdTable
																			depts={depts}
																			select={select}
																			expand={toggleExpanded}
																		/>
																	}
																</ProdTableUtils>
															}
														</ProdsByDept>
													}
												</ListProvider>
											}
										</OrderContext>
									)
								}}
							</Query>
						</Fragment>
					}
				</Container>
						
			)}
		</GlobalContext>
	)
}

export default DetailsExtra
