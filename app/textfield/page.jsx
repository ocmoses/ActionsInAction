'use client'

import { useState } from 'react'

function page({ id, label, value, onChange }) {
  return (
    <div className="flex w-screen pt-20 justify-center">
      <div
        className="relative px-3 py-3 pb-2 z-0 mb-6 w-[200px] group border-1 border-gray-800 rounded-xl"
        style={{
          backgrondColor: '#212121',
          border: '1px solid #333333',
          borderRadius: '10px'
        }}
      >
        <input
          type="text"
          id={id}
          value={value}
          className="block px-3 py-3 pb-2 w-full text-xl text-gray-200 bg-transparent placeholder-transparent rounded-lg border-0 focus:outline-none focus:ring-0  peer"
          placeholder={label}
          autoComplete="new-password"
          onChange={onChange}
          style={{
            fontFamily: 'MTN Brighter Sans',
            fontStyle: 'normal',
            fontWeight: 400,
            color: '#666666'
          }}
        />
        <label
          htmlFor={id}
          className="absolute text-lg top-0 left-6 peer-focus:top-0 text-gray-600 duration-300 transform peer-placeholder-shown:top-5"
        >
          {label}
        </label>
      </div>
    </div>
  )
}

export default page
