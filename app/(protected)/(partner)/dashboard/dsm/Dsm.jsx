"use client";
import React from 'react';
import { useEffect } from 'react';

export default function RegistrationForm() {
  const auth0Data = JSON.parse(sessionStorage.getItem("auth0Data"));
  const submitFormOnLoad = () => {
    document.getElementById('submitService').submit();
};
  useEffect(() => {
    // The function to submit the form on page load
    submitFormOnLoad();
  }, []);

  return (
    <form
      id="submitService"
      action="https://smdev.mtn.com.ng/DSDP/PartnerPortalLoginApi"
      method="POST"
      target='dsmiframe'
    >
        <input type="hidden" id="access_token" name="access_token" required value={auth0Data.access_token} />
        <input type="hidden" id="refresh_token" name="refresh_token" required value={auth0Data.refresh_token} />
        <input type="hidden" id="id_token" name="id_token" required value={auth0Data.id_token} />
        <input type="hidden" id="scope" name="scope" required value={auth0Data.scope} />
        <input type="hidden" id="expires_in" name="expires_in" required value={auth0Data.expires_in} />
        <input type="hidden" id="token_type" name="token_type" required value={auth0Data.token_type} />
    </form>
  );
};


