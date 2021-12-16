import React from 'react'

import { AiFillCloseCircle } from 'react-icons/ai'

import Draggable from '../utils/draggable'

const Video = (props) => {
  const deleteVideo = (id) => {    
    const modVideos = [...props.videos]
    const itemIndex = modVideos.findIndex(e => e.id === id)
    modVideos.splice(itemIndex, 1)
    props.setData(modVideos)
  }

  return (
    <Draggable
      className="absolute aspect-video"
      style={{
        width: props.data.width,
        height: props.data.height
      }}>
      <div className="relative w-full h-full">
        <button
          className="absolute right-1 top-1 z-10 bg-white shadow-2xl rounded-full"
          onClick={() => deleteVideo(props.data.id)}
        >
          <AiFillCloseCircle className="text-red-800 text-lg" />
        </button>
        <video className="h-full w-full" controls>
          <source src={props.data.src} />
            Your browser does not support HTML5 video.
        </video>
      </div>
    </Draggable>
  )
}

export default Video