import React from 'react'
import ReactDOM from 'react-dom'

const Draggable = (props) => {
  const [dragging, setDragging] = React.useState(false)
  const [coords, setCoords] = React.useState({
    x: 0,
    y: 0
  })
  const [rel, setRel] = React.useState(null)

  const drag = (e) =>{
    setRel({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    })
    setDragging(true)
  }

  const drop = (e) => {
    setDragging(false)
    e.stopPropagation()
    e.preventDefault()
  }

  const move = (e) => {
    if (dragging) {
      setCoords({
        x: e.pageX - rel.x,
        y: e.pageY - rel.y
      })
      e.stopPropagation()
      e.preventDefault()
    }
  }

  return (
    <div
      onMouseMove={move}
      onMouseUp={drop}
      onMouseDown={drag}
      style={{ left: coords.x, top: coords.y }}
      className={props.className}
    >
      { props.children }
    </div>
  )
}

export default Draggable