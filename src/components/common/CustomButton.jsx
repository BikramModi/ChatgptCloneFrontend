import React from 'react'

const CustomButton = ({ text, texty, onClick }) => {
  return (
    <button className="bg-purple-600 text-white rounded px-10 py-2 text-lg
    hover:bg-purple-400
    cursor-pointer"
    onClick={onClick}>
        {text}
        {texty}
    </button>
  )
}

export default CustomButton