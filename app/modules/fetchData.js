export const fetchData = async (url, opt) => {
  const Opts = opt ?? {};
  const defaultHeaders = {
    apikey: "t7286gyfe987ffey87*Zzzht45334DSWTU",
    "content-type": "application/json",
  };
  const defaultOptions = {
    method: Opts?.method ?? "GET",
    headers: { ...defaultHeaders, ...Opts?.headers },
  };
  const options = { ...defaultOptions, ...Opts };
  try {
    const result = await fetch(url, options);
    if (result) {
      const { data, success } = await result?.json();
      if (result?.ok) {
        if (success) {
          return { success, error: null, data };
        } else {
          return {
            success: false,
            error:
              "Sorry! Something went wrong. Please check your connection and try again",
            data: null,
          };
        }
      } else if (data?.message) {
        return { success: false, error: data?.message, data: null };
      }
    } else {
      return {
        success: false,
        error:
          "Sorry! We could not reach the server. Please check your connection.",
        data: null,
      };
    }
  } catch (e) {
    return {
      success: false,
      error:
        "Sorry! We could not reach the server. Please check your connection.",
      data: null,
    };
  }
  return {
    success: false,
    error: "Something went wrong. Please check your connection and try again",
    data: null,
  };
};

export const getRejectionReasons = async (setRejectionReasons) => {
  const result = {
    success: true,
    data: [
      {
        id: 1,
        uuid: "27cc7734-d479-11ed-ba7c-acde48001122",
        rejection_reason: "Incomplete Information",
        created_at: "2023-04-06T13:46:00.000000Z",
        updated_at: "2023-04-06T13:46:00.000000Z",
      },
      {
        id: 2,
        uuid: "27cc905c-d479-11ed-ba7c-acde48001122",
        rejection_reason: "Incorrect Information",
        created_at: "2023-04-06T13:46:00.000000Z",
        updated_at: "2023-04-06T13:46:00.000000Z",
      },
      {
        id: 3,
        uuid: "4b9f8002-d479-11ed-ba7c-acde48001122",
        rejection_reason: "Inconsistent Information",
        created_at: "2023-04-06T13:47:17.000000Z",
        updated_at: "2023-04-06T13:47:17.000000Z",
      },
      {
        id: 4,
        uuid: "252ac1ba-d939-11ed-ba7c-acde48001122",
        rejection_reason: "Invalid, Near Expiry or Expired Document",
        created_at: "2023-04-12T14:48:25.000000Z",
        updated_at: "2023-04-12T14:48:25.000000Z",
      },
      {
        id: 12,
        uuid: "252ad0a6-d939-11ed-ba7c-acde48001122",
        created_at: "2023-04-12T14:48:25.000000Z",
        updated_at: "2023-04-12T14:48:25.000000Z",
        rejection_reason: "Invalid or incorrect date"
      },
      {
        id: 5,
        uuid: "252ad0a6-d939-11ed-ba7c-acde48001122",
        rejection_reason: "Poor Quality (Contents Not Clear)",
        created_at: "2023-04-12T14:48:25.000000Z",
        updated_at: "2023-04-12T14:48:25.000000Z",
      },
      {
        id: 6,
        uuid: "252ad98e-d939-11ed-ba7c-acde48001122",
        rejection_reason: "Non-Compliance with Guidelines",
        created_at: "2023-04-12T14:49:42.000000Z",
        updated_at: "2023-04-12T14:49:42.000000Z",
      },
      {
        id: 7,
        uuid: "252ae172-d939-11ed-ba7c-acde48001122",
        rejection_reason: "Suspected Fraud",
        created_at: "2023-04-12T14:50:16.000000Z",
        updated_at: "2023-04-12T14:50:16.000000Z",
      },
      {
        id: 8,
        uuid: "252aec26-d939-11ed-ba7c-acde48001122",
        rejection_reason: "Inappropriate Content",
        created_at: "2023-04-12T14:50:41.000000Z",
        updated_at: "2023-04-12T14:50:41.000000Z",
      },
      {
        id: 9,
        uuid: "75cfb5b2-d939-11ed-ba7c-acde48001122",
        rejection_reason: "Failure to meet legal & regulatory requirements.",
        created_at: "2023-04-12T14:51:44.000000Z",
        updated_at: "2023-04-12T14:51:44.000000Z",
      },
      {
        id: 10,
        uuid: "75cfbf12-d939-11ed-ba7c-acde48001122",
        rejection_reason:
          "No signature, date, contact name and position provided by the signatory to the document.",
        created_at: "2023-04-12T14:51:44.000000Z",
        updated_at: "2023-04-12T14:51:44.000000Z",
      },
      {
        id: 11,
        uuid: "75cfc6a6-d939-11ed-ba7c-acde48001122",
        rejection_reason: "Others",
        created_at: "2023-04-12T14:53:26.000000Z",
        updated_at: "2023-04-12T14:53:26.000000Z",
      },
    ],
  };
  // const response = await fetch(RemoteEndpoints.REJECTION_RESONS, {
  //   cache: "no-store",
  //   next: { revalidate: 86400 },
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  // const result = await response.json()
  if (result?.success) {
    const reasons = result?.data;
    setRejectionReasons(reasons);
    return { reasons };
  }
  return {
    error:
      result?.data?.message ??
      "Something went wrong. Please check your connection and try again",
  };
};
