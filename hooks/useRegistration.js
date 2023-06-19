"use client";

import useProcessing from "@/hooks/useProcessing";
import Axios from "@/app/modules/axios";
import RemoteEndpoints from "@/app/modules/endpoints";
import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { isArray } from "@/app/modules/utilities";

const useRegistration = () => {
  const { setProcessing } = useProcessing();
  const { partners } = useStoreActions((action) => action);

  const [response, setResponse] = useState({
    success: false,
    error: null,
    data: null,
  });

  const register = async (url, userdata) => {
    setProcessing(true);

    const formData = new FormData();

    for (const field in userdata) {
      if (isArray(userdata[field])) {
        userdata[field].map((d, i) => formData.append([field][i], d));
      } else {
        formData.append(field, userdata[field]);
      }
    }
    formData.append("_method", "PUT");

    const result = await Axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: process.env.NEXT_PUBLIC_TIMEOUT,
    }).catch((e) => {
      return {
        success: false,
        error: `${e.message}. Please check you connection`,
        data: null,
      };
    });
    if (!result) {
      setProcessing(false);
      return {
        success: false,
        error:
          "Something went wrong. Please check your connection and try again",
        data: null,
      };
    }
    const { success, data } = result;
    if (!success) {
      setProcessing(false);
      return { success: false, error: data.message, data: null };
    }
    return { success: true, error: null, data };
  };

  const updateCategory = async (section, userdata) => {
    const CONFIG = {
      // setpassword: { url: RemoteEndpoints.RESETPASSWORD, method: "PUT" },
      // userinfo: { url: RemoteEndpoints.USERINFO, method: "POST" },
      category: { url: RemoteEndpoints.CATEGORY, method: "POST" },
      companydetail: { url: RemoteEndpoints.COMPANYDETAIL, method: "PUT" },
      compliance: { url: RemoteEndpoints.COMPLIANCE, method: "PUT" },
      ncclicense: { url: RemoteEndpoints.NCCLICENSE, method: "PUT" },
      nlrclicense: { url: RemoteEndpoints.NLRCLICENSE, method: "PUT" },
      shortcode: { url: RemoteEndpoints.SHORTCODE, method: "PUT" },
      indemnity: { url: RemoteEndpoints.INDEMNITY, method: "PUT" },
      accountinfo: { url: RemoteEndpoints.ACCOUNTINFO, method: "PUT" },
    };
    setProcessing(true);
    if (CONFIG[section].method === "PUT") userdata["_method"] = "PUT";
    const response = await Axios.post(CONFIG[section].url, userdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: process.env.NEXT_PUBLIC_TIMEOUT,
    }).catch((e) => {
      setProcessing(false);
      return {
        success: false,
        error: `${e.message}. Please check you connection`,
        data: null,
      };
    });
    if (!response) {
      setProcessing(false);
      return {
        success: false,
        error:
          "Something went wrong. Please check your connection and try again",
        data: null,
      };
    }
    const { success, data } = response;

    if (!success) {
      setProcessing(false);
      return { success: false, error: data.message, data: null };
    }
    return { success: true, error: null, data: data };
  };
  return { register, updateCategory };
};

export default useRegistration;
