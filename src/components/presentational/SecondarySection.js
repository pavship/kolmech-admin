import React from 'react'
import { Section, Header, Div, Icon } from '../styled/styled-semantic';

export default ({
  title,
  content,
  onClose
}) => {
  return (
    <Div
      m='0 -1em 1em -55px'
    >
      <Section
        head
        minor
        secondary
        topBorder
        bottomBorder
        noLP={!!onClose}
      >
        {!!onClose &&
          <Icon
            bs='content-box'
            w='calc(55px - 1em)'
            m='0 0.5em'
            link
            size='large'
            name='close'
            // onClick={() => onClose()}
            onClick={onClose}
          />
        }
        <Header
          m='0'
        >
          {title}
        </Header>
      </Section>
      <Section
        secondary
        bottomBorder
      >
        {content}
      </Section>
    </Div>
  )
}
