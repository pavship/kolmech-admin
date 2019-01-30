import React, { Component } from 'react'

import { Mutation } from 'react-apollo'
import { createDrawings, deleteDrawings } from '../../../graphql/drawing'

import { Subscribe } from 'unstated'
import NotificationsProvider from '../../notifications/NotificationsProvider'
import SelectableListProvider from '../../special/SelectableListProvider'

import Dropzone from 'react-dropzone'

import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { Icon, Button, Span } from '../../styled/styled-semantic'
import CollapsableSection from '../../CollapsableSection'
import Drawing from './Drawing'

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

const CancelIcon = styled(Icon)`
  &&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`

const TrashIcon = styled(Icon)`
  :hover {
    color: #db2828;
  }
`

export default class Drawings extends Component {
  render() {
    const {
      model,
      modelId,
      drawings
    } = this.props
    const selectableList = new SelectableListProvider()
    return (
      <Subscribe
        to={[NotificationsProvider, selectableList]}
      >
        {( notifications,
          {
            state: { list: selectedDrawings },
            select: selectDrawing,
            deselectAll: deselectAllDrawings,
            deselectMany: deselectManyDrawings
          }
        ) =>
          <Mutation
            mutation={createDrawings}
            onCompleted={() => notifications.create({
              type: 'success',
              title: 'Файлы успешно загружены'
            })}
            onError={err => notifications.create({
              type: 'error',
              title: 'Ошибка загрузки файлов',
              content: err.message,
            })}
          >
            {(createDrawings, { loading: creating, error: createError, client }) =>
              <Mutation
                mutation={deleteDrawings}
                onCompleted={() => notifications.create({
                  type: 'success',
                  title: 'Файлы удалены'
                })}
                onError={err => notifications.create({
                  type: 'error',
                  title: 'Ошибка удаления файлов',
                  content: err.message,
                })}
              >
                {(deleteDrawings, { loading: deleting, error: deleteError }) =>
                  <Dropzone
                    onDrop={async (acceptedFiles) => {
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
                    onDropRejected={() => notifications.create({
                      type: 'error',
                      title: 'Недопустимый формат файла',
                      content: 'Поддерживаются только изображения .jpeg или .png',
                    })}
                  >
                    {({
                      getRootProps,
                      getInputProps,
                      open,
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
                              <CancelIcon
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
                              <TrashIcon
                                link
                                m='0 23px 0 auto'
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
                                }}
                              />
                            </MenuOverlay>
                          }
                        </PoseGroup>
                        <CollapsableSection
                          ref={component => this.collapsableSection = component}
                          initiallyExpanded={!!drawings.length}
                          // innerHeight={!!drawings.length 
                          //   ? (() => {
                          //     const { files } = drawings[0]
                          //     const oriImage = files.find(f => f.isOri)
                          //     const image = files.find(f => f.width === 792) || oriImage
                          //     return image.height
                          //   })()
                          //   : undefined
                          // }
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
                          buttons={
                            <Button compact circular menu
                              activeColor='green'
                              icon='plus'
                              active={ false }
                              onClick={e => {
                                e.stopPropagation()
                                notifications.create({
                                  type: 'warning',
                                  content: 'Чтобы загрузить файлы, перетащите их в раздел',
                                })
                                open()
                              }}
                              loading={creating}
                            />
                          }
                        >
                          {drawings.length &&
                            <Drawing
                              drawing={drawings[0]}
                              select={selectDrawing}
                              selected={!!selectedDrawings.includes(drawings[0].id)}
                            />
                          }
                        </CollapsableSection>
                      </DropzoneArea>
                    }
                  </Dropzone>
                }
              </Mutation>
            }
          </Mutation>
        }
      </Subscribe>
    )
  }
}
