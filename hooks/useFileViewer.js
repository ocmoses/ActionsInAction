"use client";

import RemoteEndpoints from "@/app/modules/endpoints";
import { useStoreActions, useStoreState } from "easy-peasy";


import { useState } from "react";

export default function useFileViewer(){

    const [fileViewer, setFileViewer] = useState(null);

    return {
        fileViewer,
        setFileViewer
    }

}

export async function previewFile(file){

    const states = useStoreState((state) => state)

    try {
        setProcessing(true);
        const response = await fetch(
          `${RemoteEndpoints.PREVIEW_FILE.replace(":file", file)}`,
          {
            cache: "no-store",
            next: { revalidate: 120 },
            method: 'GET',
            headers: {
                apikey: process.env.NEXT_PUBLIC_APIKEY,
                token: states.users.token,
                "Content-Type": "application/json",
                Authorization: `bearer ${states.users.token}`,
            },
          }
        );
        
        if (!response)
        return {
          error: "This request has no response available",
        };
        const result = await response.json();
  
        console.log("FILE PREVIEW RESPONSE", result);
  
        setProcessing(false);
        if (result?.success) {
          const data = result?.data;
          
          console.log('Preview data: ', data);
  
          return {
            data
          };
        }
        return {
          error:
            result?.data?.message ??
            "Something went wrong. Please check your connection and try again",
        };
      } catch (error) {
        console.log({ error });
        return {
          error:
            error.message ??
            "Something went wrong. Please check your connection and try again",
        };
      }

}
