import React from 'react'

import { AiFillCloseCircle } from 'react-icons/ai'

import Draggable from '../utils/draggable'

const Image = (props) => {
  const deleteImage = (id) => {    
    const modImages = [...props.images]
    const itemIndex = modImages.findIndex(e => e.id === id)
    modImages.splice(itemIndex, 1)
    props.setData(modImages)
  }

  return (
    <Draggable
      className="absolute"
      style={{
        width: props.data.width,
        height: props.data.height
      }}>
      <div className="relative w-full h-full">
        <button
          className="absolute right-1 top-1 z-10 shadow-2xl bg-white rounded-full"
          onClick={() => deleteImage(props.data.id)}
        >
          <AiFillCloseCircle className="text-red-800 text-lg" />
        </button>
        <img src={props.data.src} className="h-full w-full" />
      </div>
    </Draggable>
  )
}

export default Image