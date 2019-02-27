import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import Drawing from './Drawing'

export default SortableContainer(({
  drawings,
  toggleDrawingSelection,
  selectedDrawings,
  sortMode
}) => {
  return (
    <div>
      {drawings.map((drw, i) =>
        <Drawing
          key={drw.id}
          index={i}
          drawing={drw}
          toggleSelection={toggleDrawingSelection}
          selected={!!selectedDrawings.includes(drw.id)}
          selectMode={!!selectedDrawings.length}
          sortMode={sortMode}
          disabled={!sortMode}
        />
      )}
    </div>
  )
})

