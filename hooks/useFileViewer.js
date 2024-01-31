"use client";

import RemoteEndpoints from "@/app/modules/endpoints";
import useUsers from "@/hooks/useUsers";
import useAdmins from "@/hooks/useAdmins";


import { useState } from "react";

export default function useFileViewer(){

    const {user} = useUsers();
    const {admin} = useAdmins();

    console.log("USER FROM PREVIEW: ", user);
    console.log("ADMIN FROM PREVIEW: ", admin);

    const [fileViewer, setFileViewer] = useState(null);
    
    const previewFile = async (file) => {


        try {
            const response = await fetch(
            `${RemoteEndpoints.PREVIEW_FILE.replace(":file", file)}`,
            {
                cache: "no-store",
                next: { revalidate: 120 },
                method: 'GET',
                headers: {
                    apikey: process.env.NEXT_PUBLIC_APIKEY,
                    token: user.token,
                    // "Content-Type": "application/json",
                    Authorization: `bearer ${user.token}`,
                },
            }
            );
            
            if (!response)
            return {
                error: "This request has no response available",
            };
            const result = await response.json();

            console.log("FILE PREVIEW RESPONSE", result);

            // setProcessing(false);
            // if (result?.success) {
            //   const data = result?.data;
            
            //   console.log('Preview data: ', data);

            return {
                data: result
            };
            // }
            // return {
            //   error:
            //     result?.data?.message ??
            //     "Something went wrong. Please check your connection and try again",
            // };
        } catch (error) {
            console.log({ error });
                return {
                    error:
                    error.message ??
                    "Something went wrong. Please check your connection and try again",
                };
        }

    }

    return {
        fileViewer,
        setFileViewer,
        previewFile
    }

}



