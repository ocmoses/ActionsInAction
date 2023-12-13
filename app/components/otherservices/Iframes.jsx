"use client";
import React, { useEffect, useState } from "react";
import axios from 'axios';

// // Nothing was added
// export default function Iframe({ url }) {
//   const [response, setResponse] = useState(null);

//   const postDataToExternalURL = async (auth0Data) => {
//     const requestData = {
//       access_token: auth0Data.access_token,
//       refresh_token: auth0Data.refresh_token,
//       id_token: auth0Data.id_token,
//       scope: auth0Data.scope,
//       expires_in: auth0Data.expires_in,
//       token_type: auth0Data.token_type,
//     };
//     console.log("The requestData is ", requestData);
//     try {
//       const response = await axios.post(url, requestData);

//       // Set the response data to the state
//       setResponse(response.data);

//       // Create a data URL to display the response content in the iframe
//       const dataURL = `data:text/html;base64,${btoa(response.data)}`;

//       // Set the iframe's src attribute to the data URL
//       document.getElementById('responseIframe').src = dataURL;
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   useEffect(() => {
//     const auth0Data = JSON.parse(sessionStorage.getItem("auth0Data"));
//     if (auth0Data == null) {
//       alert('no');
//       // do nothing
//     } else {
//       postDataToExternalURL(auth0Data);
//       console.log("The auth0Data is ", auth0Data);
//     }
//   }, []);

//   return (
//     <iframe id="responseIframe" frameBorder="0" width="100%" height="400"></iframe>
//   );
// }



// export default function Iframe({ url }) {
//   const [response, setResponse] = useState(null);

//   const postDataToExternalURL = async (auth0Data) => {
//     const formData = new FormData();
//     formData.append("access_token", auth0Data.access_token);
//     formData.append("refresh_token", auth0Data.refresh_token);
//     formData.append("id_token", auth0Data.id_token);
//     formData.append("scope", auth0Data.scope);
//     formData.append("expires_in", auth0Data.expires_in);
//     formData.append("token_type", auth0Data.token_type);

//     try {
//       const response = await axios.post(url, formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       });

//       // Set the response data to the state
//       setResponse(response.data);

//       // Create a data URL to display the response content in the iframe
//       const dataURL = `data:text/html;base64,${btoa(response.data)}`;

//       // Set the iframe's src attribute to the data URL
//       document.getElementById('responseIframe').src = dataURL;
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   useEffect(() => {
//     const auth0Data = JSON.parse(sessionStorage.getItem("auth0Data"));
//     if (auth0Data == null) {
//       alert('no');
//       // do nothing
//     } else {
//       postDataToExternalURL(auth0Data);
//       console.log("The auth0Data is ", auth0Data);
//     }
//   }, []);

//   return (
//     <iframe id="responseIframe" frameBorder="0" width="100%" height="400"></iframe>
//   );
// }





export default function Iframe({ url }) {
  return (
    <iframe name="dsmiframe" frameBorder="0" className="h-[100%] w-[100%]" src={url} ></iframe>
  );
}
