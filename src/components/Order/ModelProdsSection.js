import React, { Fragment } from 'react'

import { Mutation } from 'react-apollo'
import { reserveProds } from '../../graphql/order'

import { Section, Button, Message } from '../styled/styled-semantic'

import GlobalContext from '../context/GlobalContext'
import CollapsableSection from '../presentational/CollapsableSection'
import ProdsByDept from './ProdsByDept';
import DeptProdTable from './DeptProdTable';
import ReserveProdsButton from './ReserveProdsButton'
// import ListProvider from './special/ListProvider'
import ProdContext from '../context/ProdContext'

const ModelProdsSection = ({
  order: { id, model, qty, prods }
}) => {
  return (
    <GlobalContext>
      {({ extra, setExtra, selectedProdIds }) => (
        <CollapsableSection
          forceExpanded={!!extra}
          title={model.name}
          subtitle={qty + 'шт'}
          buttons={
            <ReserveProdsButton
              modelId={model.id}
              orderId={id}
              prodIds={prods.map(p => p.id)}
            />
          }
        >
            <ProdContext
              ids={selectedProdIds}
            >
              {({ prodsLocal: selectedProds }) =>
                <ProdsByDept
                  prods={prods}
                  selectedProds={selectedProds}
                  orderProdsQty={qty}
                  expanded
                  diff={!!extra}
                >
                  {({ depts, xor }) =>
                    <Fragment>
                      <DeptProdTable
                        depts={depts}
                        skipFields={['reserve']}
                        expand={() => null}
                        indent='32px'
                        nameFieldWidth='200px'
                      />
                      {extra && 
                      <Mutation
                        mutation={reserveProds}
                        variables={{
                          orderId: id,
                          prodIds: selectedProdIds
                        }}
                      >
                        {( reserveProds, { loading, error }) => 
                          <Fragment>
                            <Section
                              minor
                              head
                              topBorder='dark'
                            >
                              <Button
                                primary
                                compact
                                circular
                                menu
                                ml='0'
                                content='Резервировать'
                                icon='gavel'
                                loading={loading}
                                disabled={!xor}
                                onClick={() => {
                                  reserveProds()
                                  setExtra(null)
                                }}
                              />
                            </Section>
                            {error &&
                              <Message
                                section
                                error
                                header='Зарезервировать не удалось..'
                                content={error.message}
                              />
                            }
                          </Fragment>
                        }
                      </Mutation>
                      }
                    </Fragment>
                  }
                </ProdsByDept>
              }
            </ProdContext>
          {/* {!extra && 
            <ListProvider>
              {({ list: selectedIds, setList: setSelectedProdIds}) =>
                <ProdsByDept
                  prods={prods}
                  selectedIds={selectedIds}
                  orderProdsQty={qty}
                >
                  {({ depts }) =>
                    <DeptProdTable
                      depts={depts}
                      setSelectedProdIds={setSelectedProdIds}
                      skipFields={['reserve']}
                    />
                  }
                </ProdsByDept>
              }
            </ListProvider>
          } */}
        </CollapsableSection>
      )}
    </GlobalContext>
  )
}

export default ModelProdsSection
