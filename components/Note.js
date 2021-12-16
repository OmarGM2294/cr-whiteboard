import React from 'react'

import { AiOutlineClose } from 'react-icons/ai'

import Draggable from '../utils/draggable'

const Note = (props) => {
  const changeValue = (e) => {
    const modNotes = [...props.notes]
    const modData = modNotes.find((e) => e.id === props.data.id)
    modData.text = e.target.value
    props.setData(modNotes)
  }

  const deleteNote = (id) => {
    const modNotes = [...props.notes]
    const itemIndex = modNotes.findIndex(e => e.id === id)
    modNotes.splice(itemIndex, 1)
    props.setData(modNotes)
  }

  return (
    <Draggable className="absolute h-72 w-64">
      <div className="relative w-full h-full">
        <button onClick={() => deleteNote(props.data.id)}>
          <AiOutlineClose className="absolute right-1 top-1 text-gray-50" />
        </button>
        <textarea
          className="w-full h-full bg-red-400 resize-none shadow-md p-2 focus:outline-none focus:shadow-xl focus:bg-red-500 text-gray-50"
          value={props.data.text}
          onChange={changeValue}
        />
      </div>
    </Draggable>
  )
}

export default Note