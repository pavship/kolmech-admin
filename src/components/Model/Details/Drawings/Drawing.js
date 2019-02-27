import React from 'react'

import { SortableElement } from 'react-sortable-hoc'

import styled from 'styled-components'
import posed from 'react-pose'
import { Icon } from '../../../styled/styled-semantic';

const AspectRatioDiv = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${props => 100/props.proportion}%;
  margin-bottom: 3px;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,50,.03);
`

const ImgSpacer = posed.div({
  shrinked: {
    width:  'calc(100% - 60px)',
    height: ({ proportion }) => `calc(100% - 60px/${proportion})`,
  },
  fullsize: {
    width: '100%',
    height: '100%',
  }
})

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const Mask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
  transition: background-image .135s cubic-bezier(0.0,0.0,0.2,1);
  :hover {
    background-image: linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent);
  }
  ${props => props.hide && `
    background-image: unset !important;
  `}
  ${props => props.off && `
    display: none;
  `}
`

const CheckBox = styled(Icon)`
  position: absolute;
  top: 7px;
  left: 10px;
  color: white;
  &&& {
    opacity: ${props => 
      props.active ? '1 !important' :
      props.selectMode ? '.5 !important' : '0'};
  }
  ${Mask}:hover && {
    opacity: ${props => props.selectMode ? '1 !important' : '.5'};
  }
`

const Check = styled(Icon)`
  position: absolute;
  left: 5px;
  top: 4px;
  &&& {
    opacity: ${props => props.active ? '.9 !important' : '0'};
    :hover {
      opacity: .5 !important;
    }
  }
  ${Mask}:hover && {
    opacity: ${props => 
      props.active ? '.9 !important' :
      props.selectMode ? '.5 !important' : '.2'};
  }
`

export default SortableElement(({
  drawing: { id, files },
  toggleSelection,
  selected,
  selectMode,
  sortMode
}) => {
  const oriImage = files.find(f => f.imgFor === 'ORIGINAL')
  const image = files.find(f => f.imgFor === 'FEED_792') || oriImage
  const { path, width, height} = image
  const proportion = width/height
  return (<div>
    <AspectRatioDiv
      proportion={proportion}
    >
      <Container>
        <Mask
          hide={selected}
          off={sortMode}
          onClick={() => {
            // deselect drawing if selected, select if in the selectMode
            if (selected || selectMode) return toggleSelection(id)
            // otherwise open fullsize image in new tab
            const win = window.open(oriImage.path, '_blank')
            win.focus()
          }}
        >
          <CheckBox
            link
            name='square'
            size='big'
            fs='2.2em'
            active={selected}
            d={sortMode ? 'none !important' : undefined}
            selectMode={selectMode}
            color={selected ? 'grey' : undefined}
          >
            <Check
              link
              name='check'
              size='small'
              color='black'
              c={selected ? '#fff !important' : undefined}
              active={selected}
              selectMode={selectMode}
              onClick={e => {
                e.stopPropagation()
                toggleSelection(id)
              }}
            />
          </CheckBox>
        </Mask>
        <ImgSpacer
          pose={(selected || sortMode) ? 'shrinked' : 'fullsize'}
          proportion={proportion}
          onClick={() => selected && toggleSelection(id)}
        >
          <Image
            src={path}
            width={width}
            height={height}
          />
        </ImgSpacer>
      </Container>
    </AspectRatioDiv></div>
  )
})
