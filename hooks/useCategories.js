"use client"
// import useSWR from "swr"
import RemoteEndPoints from "@/app/modules/endpoints"
import { useEffect, useState } from "react"

// const fetcher = (args) => fetch(args.url, args.options).then((r) => r.json())

const useCategories = (apikey) => {
  //     try {
  //   const { data, error, isValidating } = useSWR(
  //     {
  //       url: RemoteEndPoints.CATEGORIES,
  //       options: {
  //         method: "GET",
  //         headers: {
  //           apikey,
  //           "Content-Type": "application/json",
  //         },
  //         redirect: "follow",
  //       },
  //     },
  //     fetcher
  //   )
  //   console.log({ data })
  //  } catch (err) {
  //       return {
  //         success: false,
  //         error: err.message,
  //         data: null,
  //       }
  //     }
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const isValidating = false

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      try {
        const response = await fetch(RemoteEndPoints.CATEGORIES, {
          method: "GET",
          headers: {
            apikey: apikey,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          next: { revalidate: 60 * 60 * 24 },
        }).catch((err) => {
          console.log(err)
          setError("Error reaching the server. Please check your connection")
        })

        if (response) {
          const result = await response.json()
          const { data, success } = result
          if (success) {
            setData(data)
          } else {
            setError(
              data?.message ?? `${response.status} ${response.statusText}`
            )
          }
        } else {
          setError("Error reaching the server. Please check your connection")
        }
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }
    getCategories()
  }, [])
  return { data, error, isValidating, loading }
}
export default useCategories
