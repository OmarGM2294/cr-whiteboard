import React from 'react'

import Tools from './Tools'
import Note from './Note'
import Image from './Image'
import Video from './Video'

const Draw = () => {
  const canvas = React.createRef()
  const pointer = React.createRef()

  const [notes, setNotes] = React.useState([])
  const [images, setImages] = React.useState([])
  const [videos, setVideos] = React.useState([])

  const [mode, setMode] = React.useState('draw')
  const [ctx, setCtx] = React.useState(null)
  const [penColor, setPenColor] = React.useState('black')
  const [lineWidth, setLineWidth] = React.useState(10)
  const [pen, setPen] = React.useState({
    pressed: false,
    coords: []
  })

  const drawing = (e) => {
    if (mode !== 'none') {
      pointer.current.style.left = `${e.nativeEvent.offsetX - (lineWidth / 2)}px`
      pointer.current.style.top = `${e.nativeEvent.offsetY - (lineWidth / 2)}px`
      if (pen.pressed) {
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'

        if (mode === 'draw') {
          ctx.strokeStyle = penColor
        } else if(mode === 'erase') {
          ctx.strokeStyle = 'white'
        }

        ctx.moveTo(pen.coords[0], pen.coords[1])
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        ctx.stroke()

        setPen({
          ...pen,
          coords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
        })
      }
    }
  }

  React.useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.lineWidth = 10
    setCtx(ctx)
  }, [])

  return (
    <>
      { mode !== 'none' ?
        <div
          className="overflow-hidden absolute rounded-full pointer-events-none border-solid border border-black"
          ref={pointer}
          style={{ width: lineWidth, height: lineWidth }}
        />
      : null }
      { typeof window !== 'undefined' ?
        <canvas
          ref={canvas}
          className="h-full w-full overflow-hidden"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseMove={drawing}
          onMouseDown={(e) => setPen({
            pressed: true,
            coords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
          })}
          onMouseUp={() => setPen({ ...pen, pressed: false })}
        />
      : null }
      { notes.map((note, index) => (
        <Note
          data={note}
          setData={setNotes}
          key={index}
          notes={notes}
        />
      )) }
      { images.map((image, index) => (
        <Image
          data={image}
          key={index}
          images={images}
          setData={setImages}
        />
      )) }
      { videos.map((video, index) => (
        <Video
          data={video}
          key={index}
          videos={videos}
          setData={setVideos}
        />
      )) }
      <Tools
        setMode={setMode}
        setLineWidth={setLineWidth}
        lineWidth={lineWidth}
        penColor={penColor}
        setPenColor={setPenColor}
        setNotes={setNotes}
        notes={notes}
        setImages={setImages}
        images={images}
        setVideos={setVideos}
        videos={videos}
      />
    </>
  )
}

export default Draw