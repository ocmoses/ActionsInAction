'use client'

// 'use client' marks this page as a Client Component
// https://beta.nextjs.org/docs/rendering/server-and-client-components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error logo: ', error)
  }, [error])

  return <div className="text-white">{JSON.stringify(error)}</div>
}
