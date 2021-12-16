import React from 'react'

import {
  FaPencilAlt,
  FaEraser,
  FaPlus,
  FaMinus,
  FaRegStickyNote,
  FaImage,
  FaVideo
} from 'react-icons/fa'
import { ChromePicker } from 'react-color'

import { getUniqueID } from '../utils/id'

const Tools = (props) => {
  const colorBtn = React.createRef()
  const inputFile = React.createRef()
  const inputFileVideo = React.createRef()

  const [open, setOpen] = React.useState(false)
  const [bounds, setBounds] = React.useState({})

  const getDataUrl = (img) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    return canvas.toDataURL('image/jpeg')
 }

  const loadImage = () => {
    const image = new Image()
    image.onload = (i) => {
      props.setImages([
        ...props.images,
        {
          id: getUniqueID(),
          src: getDataUrl(image),
          width: i.path[0].width,
          height: i.path[0].height
        }
      ])
    }
    image.src = URL.createObjectURL(inputFile.current.files[0])
  }

  const loadVideo = () => {
    const reader = new FileReader()
    reader.readAsDataURL(inputFileVideo.current.files[0])

    reader.onload = function () {
      props.setVideos([
        ...props.videos,
        {
          id: getUniqueID(),
          src: reader.result
        }
      ])
    }
  }

  React.useEffect(() => {
    if (props.images.length <= 0) {
      inputFile.current.value = null
    }
    if (props.videos.length <= 0) {
      inputFileVideo.current.value = null
    }
  }, [props.images, props.videos])

  React.useEffect(() => {
    if (colorBtn.current && Object.keys(bounds).length <= 0) {
      const colorBounds = colorBtn.current.getBoundingClientRect()
      setBounds({
        left: colorBounds.x,
        top: colorBtn.current.offsetTop + colorBounds.height,
      })
    }
  }, [colorBtn])

  return (
    <div
      className="absolute left-0 top-2/4 bg-slate-300 shadow-xl px-2 rounded-lg divide-y flex flex-col divide-slate-400"
      style={{ transform: 'translateY(-50%)' }}
    >
      <button onClick={() => props.setMode('draw')} className="p-3 h-10">
        <FaPencilAlt className="my-0 mx-auto" />
      </button>
      <button onClick={() => props.setMode('erase')} className="p-3 h-10">
        <FaEraser className="my-0 mx-auto" />
      </button>
      <button onClick={() => props.setLineWidth(props.lineWidth + 5)} className="p-2 h-10">
        <FaPlus className="my-0 mx-auto" />
      </button>
      <button onClick={() => props.lineWidth > 5 ? props.setLineWidth(props.lineWidth - 5) : 5} className="p-2 h-10">
        <FaMinus className="my-0 mx-auto" />
      </button>
      <button className="p-2 h-10" onClick={() => setOpen(true)}>
        <div
          ref={colorBtn}
          style={{ backgroundColor: props.penColor }}
          className="h-full w-full rounded-full"
        />
      </button>
      <button
        className="p-2 h-10"
        onClick={() => {
          props.setNotes([
            ...props.notes,
            {
              text: '',
              id: getUniqueID()
            }
          ])
          props.setMode('none')
        }}
      >
        <FaRegStickyNote className="my-0 mx-auto" />
      </button>
      <button
        className="p-2 h-10"
        onClick={() => {
          inputFile.current.click()
          props.setMode('none')
        }}
      >
        <input
          type="file"
          hidden
          ref={inputFile}
          onChange={loadImage}
          accept="image/*"
        />
        <FaImage className="my-0 mx-auto" />
      </button>
      <button
        className="p-2 h-10"
        onClick={() => {
          inputFileVideo.current.click()
          props.setMode('none')
        }}
      >
        <input
          type="file"
          hidden
          ref={inputFileVideo}
          onChange={loadVideo}
          accept="video/*"
        />
        <FaVideo className="my-0 mx-auto" />
      </button>
      { open ?
        <div
          tabIndex={0}
          className="absolute"
          style={bounds}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}>
          <ChromePicker
            color={props.penColor}
            onChangeComplete={(color) => props.setPenColor(color.hex)}
          />
        </div>
      : null }
    </div>
  )
}

export default Tools