"use client";

import RemoteEndpoints from "@/app/modules/endpoints";
import useUsers from "@/hooks/useUsers";
import useAdmins from "@/hooks/useAdmins";
import {questionnaire_link, conduct_link} from "@/app/modules/constants";


export default function useFileDownload(){

    const {user} = useUsers();
    const {admin} = useAdmins();

    let token = "";
    
    if(!admin){
        token = user.token;
    }else{
        token = admin.token;
    }

    // console.log("USER FROM PREVIEW: ", user);
    console.log("ADMIN FROM DOWNLOAD: ", admin);
    
    const downloadQuestionnaire = async () => {

        try {
            const response = await fetch(
                RemoteEndpoints.DOWNLOAD_QUESTIONNAIRE,
                {
                    cache: "no-store",
                    next: { revalidate: 120 },
                    method: 'GET',
                    headers: {
                        apikey: process.env.NEXT_PUBLIC_APIKEY,
                        token: token,
                        "Content-Type": "application/octet-stream",
                        Authorization: `bearer ${token}`,
                    },
                }
            );
            
            if (!response)
                return {
                    error: "This request has no response available",
                };
            const result = await response.blob();

            console.log("QUESTIONAIRRE DOWNLOAD RESPONSE", result);

            download(result, 'Oracle Supplier Questionnaire');

            return true;


        } catch (error) {
            console.log({ error });
                return {
                    error:
                    error.message ??
                    "Something went wrong. Please check your connection and try again",
                };
        }

    }

    const downloadCodeOfConduct = async () => {

        try {
            const response = await fetch(
                RemoteEndpoints.DOWNLOAD_CODE_OF_CONDUCT,
            {
                cache: "no-store",
                next: { revalidate: 120 },
                method: 'GET',
                headers: {
                    apikey: process.env.NEXT_PUBLIC_APIKEY,
                    token: token,
                    "Content-Type": "application/octet-stream",
                    Authorization: `bearer ${token}`,
                },
            }
            );
            
            if (!response)
            return {
                error: "This request has no response available",
            };
            const result = await response.blob();

            console.log("CODE OF CONDUCT DOWNLOAD RESPONSE", result);

            download(result, 'Supplier Code of Conduct');

            return true;

        } catch (error) {
            console.log({ error });
                return {
                    error:
                    error.message ??
                    "Something went wrong. Please check your connection and try again",
                };
        }

    }

    const downloadUnsignedContract = async (partner_uuid, contract_id) => {

        try {
            const response = await fetch(
            RemoteEndpoints.DOWNLOAD_UNSIGNED_CONTRACT.replace(":partner_uuid", partner_uuid).replace(":contract_id", contract_id),
            {
                cache: "no-store",
                next: { revalidate: 120 },
                method: 'GET',
                headers: {
                    apikey: process.env.NEXT_PUBLIC_APIKEY,
                    token: token,
                    "Content-Type": "application/octet-stream",
                    Authorization: `bearer ${token}`,
                },
            }
            );
            
            if (!response)
            return {
                error: "This request has no response available",
            };

            const result = await response.blob();

            console.log("DOWNLOAD SIGNED CONTRACT RESPONSE", result);

            download(result, 'Contract ' + contract_id + '-unsigned');

            return true;
            
        } catch (error) {
            console.log({ error });
                return {
                    error:
                    error.message ??
                    "Something went wrong. Please check your connection and try again",
                };
        }

    }

    const downloadSignedContract = async (partner_uuid, contract_id) => {

        try {
            const response = await fetch(
            RemoteEndpoints.DOWNLOAD_SIGNED_CONTRACT.replace(":partner_uuid", partner_uuid).replace(":contract_id", contract_id),
            {
                cache: "no-store",
                next: { revalidate: 120 },
                method: 'GET',
                headers: {
                    apikey: process.env.NEXT_PUBLIC_APIKEY,
                    token: token,
                    "Content-Type": "application/octet-stream",
                    Authorization: `bearer ${token}`,
                },
            }
            );
            
            if (!response)
            return {
                error: "This request has no response available",
            };
            const result = await response.blob();

            console.log("DOWNLOAD SIGNED CONTRACT RESPONSE", result);

            download(result, 'Contract ' + contract_id + '-signed');

            return true;

        } catch (error) {
            console.log({ error });
                return {
                    error:
                    error.message ??
                    "Something went wrong. Please check your connection and try again",
                };
        }

    }

    const download = (result, filename) => {

        const windowURL = URL.createObjectURL(result);

        let anchor = document.createElement('a');

        anchor.style.display = "none";
        anchor.href = windowURL;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();

        window.URL.revokeObjectURL(windowURL);
    }


    return {
        downloadQuestionnaire,
        downloadCodeOfConduct,
        downloadUnsignedContract,
        downloadSignedContract
    }

}



