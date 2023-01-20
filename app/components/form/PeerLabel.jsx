import React from 'react'

function PeerLabel({ id, label }) {
  return (
    <label
      htmlFor={id}
      className="absolute text-lg text-gray-500 duration-300 transform -translate-y-0 top-1 z-10 origin-[0]  px-3 peer-focus:text-gray-500 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:top-1/2 peer-focus:top-0 "
    >
      {label}
    </label>
  )
}

export default PeerLabel
