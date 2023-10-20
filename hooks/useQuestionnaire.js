"use client";
import RemoteEndpoints from "@/app/modules/endpoints";
import { apikey } from "@/app/modules/constants";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import useProcessing from "@/hooks/useProcessing";
import useLogout from "@/hooks/useLogout";
import { useStoreState } from "easy-peasy";
import usePartners from "@/hooks/usePartners";

export default function useQuestionnaire(){

    const [{ errors, setError, clearErrors }] = useErrors(null);
    const {users} = useUsers();
    const {setProcessing} = useProcessing();
    const {Logout, LogoutAdmin} = useLogout();
    const states = useStoreState((state) => state);
    const {partner} = usePartners();


    const getQuestionnaire = async () => {
        
        try {
          const response = await fetch(RemoteEndpoints.GET_QUESTIONNAIRE, {
            method: "GET",
            headers: {
              apikey: apikey,
              token: states.users?.token,
              "Content-Type": "application/json",
            },
            redirect: "follow",
            next: { revalidate: 60 * 60 * 24 },
          }).catch((err) => {
            console.log(err)
            setError("Error reaching the server. Please check your connection")
          })
  
          if (response) {
            return response;
          } else {
            setError("Error reaching the server. Please check your connection")
          }
        } catch (err) {
          setError(err.message)
        }
    }
    
    const getQuestionnaireStatus = async () => {
        try {
            setProcessing(true);
            const response = await fetch(
            `${RemoteEndpoints.GET_QUESTIONNAIRE_STATUS.replace(':partner-uuid', partner.uuid)}`,
                {
                    cache: "no-store",
                    next: { revalidate: 120 },
                    method: 'GET',
                    headers: {
                        apikey: process.env.NEXT_PUBLIC_APIKEY,
                        token: states.users?.token,
                        Authorization: `bearer ${states.users?.token}`,
                    },
                }
            );
            
            
            if (!response)
            return {
            error: "This request has no response available",
            };

            if (response.status === 401 ) {
                Logout();
                return;
            }

            // console.log('Create response', response.text);

            const result = await response.json();

            // console.log('RemoteEndpoints.SEND_QUESTIONNAIRE', RemoteEndpoints.SEND_QUESTIONNAIRE);
            // console.log('Create result', result);
            // console.log('users.token', users.token);

            setProcessing(false);
            if (result?.success) {
                const message = result.data?.message;
                
                // console.log('Retrieval message', message);

                return {
                    message
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

    const sendQuestionnaire = async (data) => {
        try {
            setProcessing(true);
            const response = await fetch(
            `${RemoteEndpoints.SEND_QUESTIONNAIRE}`,
            {
                cache: "no-store",
                next: { revalidate: 120 },
                method: 'POST',
                body: data,
                headers: {
                    apikey: process.env.NEXT_PUBLIC_APIKEY,
                    token: states.users?.token,
                    Authorization: `bearer ${states.users?.token}`,
                },
            }
            );
            
            
            if (!response)
            return {
            error: "This request has no response available",
            };

            if (response.status === 401 ) {
                Logout();
                return;
            }

            // console.log('Create response', response.text);

            const result = await response.json();

            // console.log('RemoteEndpoints.SEND_QUESTIONNAIRE', RemoteEndpoints.SEND_QUESTIONNAIRE);
            // console.log('Create result', result);
            // console.log('users.token', users.token);

            setProcessing(false);
            if (result?.success) {
                const message = result.data?.message;
                
                console.log('Created message', message);

                return {
                    message
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
    };

    return {
        getQuestionnaireStatus,
        sendQuestionnaire
    };

}