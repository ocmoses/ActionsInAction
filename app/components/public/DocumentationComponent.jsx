
import React from 'react'

export default function DocumentationH2Title({text}){
  return(
     <h2 className='py-5 text-[24px] text-mtn-400'>
      {text}
    </h2>
  )
}

export const DocumentationH3Title = ({text}) => {
  return(
    <h3 className="border-white/10 border-y p-2 m-4">
      {text}
    </h3>
  )
}


