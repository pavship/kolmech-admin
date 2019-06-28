import React, { Component } from 'react'

import { Mutation } from 'react-apollo'
import { createDrawings, deleteDrawings, setDrawingsSortOrder } from '../../../graphql/drawing'

import { NotificationsConsumer } from '../../notifications/NotificationsContext'

import Dropzone from 'react-dropzone'

import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { Loader } from 'semantic-ui-react'
import { Icon, Button, Span } from '../../styled/styled-semantic'
import CollapsableSection from '../../presentational/CollapsableSection'
import SortableDrawingsList from './Drawings/Sortable'
import SortedCollectionProvider from './Drawings/SortedCollectionProvider'
import StatefulList from '../../context/StatefulList'
import StatefulBool from '../../context/StatefulBool'

const DropzoneArea = styled.div`
  position: relative;
  :focus {
    outline: none;
  }
`

const DropzoneOverlay = styled(posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.65);
`

const MenuOverlay = styled(posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: absolute;
  z-index: 1;
  top: 1px;
  right: 0;
  left: 0;
  height: 48px;
  display: flex;
  align-items: center;
  background-color: rgba(255,255,255,1);
`

const MenuLeftIcon = styled(Icon)`
  &&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`

export default class Drawings extends Component {
  render() {
    console.log('> Drawings render')
    const { model, sidebarRef } = this.props
    const { id: modelId, drawings } = model
    return (
      <NotificationsConsumer>
        {({ notify }) =>
          <Mutation
            mutation={createDrawings}
            onCompleted={() => notify({
              type: 'success',
              title: 'Файлы успешно загружены'
            })}
            onError={err => notify({
              type: 'error',
              title: 'Ошибка загрузки файлов',
              content: err.message,
            })}
          >
            {(createDrawings, { loading: creating, client }) =>
              <Mutation
                mutation={deleteDrawings}
                onCompleted={() => notify({
                  type: 'success',
                  title: 'Файлы удалены'
                })}
                onError={err => notify({
                  type: 'error',
                  title: 'Ошибка удаления файлов',
                  content: err.message,
                })}
              >
                {(deleteDrawings, { loading: deleting }) =>
                  <Mutation
                    mutation={setDrawingsSortOrder}
                    onCompleted={() => notify({
                      type: 'success',
                      content: 'Новый порядок чертежей установлен'
                    })}
                    onError={err => notify({
                      type: 'error',
                      title: 'Ошибка сортировки',
                      content: err.message,
                    })}
                  >
                    {(setDrawingsSortOrder, { loading: sorting }) =>
                      <SortedCollectionProvider
                        collection={drawings}
                        sortBy='sortOrder'
                      >
                        {({ sortedCollection: drawings, move: moveDrawing }) =>
                          <StatefulList>
                            {({
                              list: selectedDrawings,
                              toggle: toggleDrawingSelection,
                              clear: deselectAllDrawings,
                              removeMany: deselectManyDrawings
                            }) =>
                              <StatefulBool>
                                {({
                                  bool: sortMode,
                                  enable: enableSortMode,
                                  disable: disableSortMode
                                }) =>
                                  <Dropzone
                                    disabled={sortMode}
                                    onDrop={async (acceptedFiles) => {
                                      console.log('acceptedFiles > ', acceptedFiles)
                                      if (!acceptedFiles.length) return
                                      const res = await createDrawings({
                                        variables: {
                                          modelId,
                                          files: acceptedFiles
                                        }
                                      })
                                      if (!res) return
                                      const { data } = res
                                      client.writeData({
                                        id: `Model:${modelId}`,
                                        data: {
                                          ...model,
                                          drawings: [
                                            ...drawings,
                                            ...data.createDrawings
                                          ]
                                        }
                                      })
                                      this.collapsableSection.expand()
                                    }}
                                    disableClick
                                    accept='image/jpeg, image/png'
                                    onDropRejected={() => notify({
                                      type: 'error',
                                      title: 'Недопустимый формат файла',
                                      content: 'Поддерживаются только изображения .jpeg или .png',
                                    })}
                                  >
                                    {({
                                      getRootProps,
                                      getInputProps,
                                      open: openFileDialog,
                                      isDragActive,
                                    }) =>
                                      <DropzoneArea
                                        isDragActive={isDragActive}
                                        {...getRootProps()}
                                      >
                                        <input {...getInputProps()} />
                                        <PoseGroup>
                                          {isDragActive &&
                                            <DropzoneOverlay key='1'>
                                              <Icon
                                                name='download'
                                                size='large'
                                                c='white'
                                              />
                                            </DropzoneOverlay>
                                          }
                                          {selectedDrawings.length &&
                                            <MenuOverlay key='2' >
                                              <MenuLeftIcon
                                                link
                                                size='large'
                                                name='cancel'
                                                onClick={() => deselectAllDrawings()}
                                              />
                                              <Span
                                                fs='1.1em'
                                                c='rgba(0,0,0,.75)'
                                                fw='700'
                                              >
                                                Выбрано чертежей: {selectedDrawings.length}
                                              </Span>
                                              <Span
                                                m='0 23px 0 auto'
                                              >
                                                <Icon
                                                  link
                                                  d={deleting ? 'none' : undefined}
                                                  activeColor='#db2828'
                                                  name='trash alternate outline'
                                                  size='large'
                                                  onClick={async () => {
                                                    const ids = selectedDrawings
                                                    const res = await deleteDrawings({ variables: { ids }})
                                                    if (!res) return
                                                    client.writeData({
                                                      id: `Model:${modelId}`,
                                                      data: {
                                                        ...model,
                                                        drawings: [ ...drawings.filter(drw => !ids.includes(drw.id)) ]
                                                      }
                                                    })
                                                    deselectManyDrawings(ids)
                                                    console.log('deleted!')
                                                  }}
                                                />
                                                <Loader
                                                  inline
                                                  size='small'
                                                  active={deleting}
                                                />
                                              </Span>
                                              
                                            </MenuOverlay>
                                          }
                                          {sortMode &&
                                            <MenuOverlay key='3' >
                                              <MenuLeftIcon
                                                link
                                                name='check'
                                                size='large'
                                                c='#016936'
                                                onClick={async () => {
                                                  let reordered = false
                                                  drawings.forEach((drw, i) => {
                                                    if (drw.sortOrder !== i) {
                                                      reordered = true
                                                      client.writeData({
                                                        id: `Drawing:${drw.id}`,
                                                        data: {
                                                          ...drw,
                                                          sortOrder: i
                                                        }
                                                      })
                                                    }
                                                  })
                                                  if (reordered) await setDrawingsSortOrder({ variables: {
                                                    ids: drawings.map(drw => drw.id)
                                                  }})
                                                  disableSortMode()
                                                }}
                                              />
                                              <Span
                                                fs='1.1em'
                                                c='rgba(0,0,0,.75)'
                                                fw='700'
                                              >
                                                Сортировка
                                              </Span>
                                              <Span
                                                m='0 23px 0 auto'
                                              >
                                                <Loader
                                                  inline
                                                  size='small'
                                                  active={sorting}
                                                />
                                              </Span>
                                            </MenuOverlay>
                                          }
                                        </PoseGroup>
                                        <CollapsableSection
                                          ref={component => this.collapsableSection = component}
                                          initiallyExpanded={!!drawings.length}
                                          disabled={!drawings.length}
                                          title='Чертеж '
                                          subtitle={
                                            <Span
                                              fs='1.2em'
                                            >
                                              <Icon
                                                name='file image outline'
                                                mr='4px'
                                              />
                                              {drawings.length}
                                            </Span>
                                          }
                                          buttons={<>
                                            <Button compact circular menu
                                              activeColor='green'
                                              icon='plus'
                                              onClick={e => {
                                                e.stopPropagation()
                                                notify({
                                                  type: 'warning',
                                                  content: 'Чтобы загрузить файлы, перетащите их в раздел',
                                                })
                                                openFileDialog()
                                              }}
                                              loading={creating}
                                            />
                                            <Button compact circular menu
                                              icon='sort'
                                              onClick={e => {
                                                e.stopPropagation()
                                                notify({
                                                  type: 'warning',
                                                  content: 'Чтобы изменить порядок, выберите и перетащите нужные чертежи',
                                                })
                                                enableSortMode()
                                              }}
                                            />
                                          </>}
                                        >
                                          <SortableDrawingsList
                                            drawings={drawings}
                                            toggleDrawingSelection={toggleDrawingSelection}
                                            selectedDrawings={selectedDrawings}
                                            sortMode={sortMode}
                                            onSortEnd={({ oldIndex, newIndex }) => moveDrawing( oldIndex, newIndex )}
                                            getContainer={() => sidebarRef}
                                          />
                                        </CollapsableSection>
                                      </DropzoneArea>
                                    }
                                  </Dropzone>
                                }
                              </StatefulBool>
                            }
                          </StatefulList>
                        }
                      </SortedCollectionProvider>
                    }
                  </Mutation>
                }
              </Mutation>
            }
          </Mutation>
        }
      </NotificationsConsumer>
    )
  }
}
