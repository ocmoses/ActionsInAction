import RemoteEndPoints from "@/app/modules/endpoints";
import {suspended_categories} from "@/app/modules/constants";

export const getCategories = async (apikey) => {
  try {
    const response = await fetch(RemoteEndPoints.CATEGORIES, {
      method: "GET",
      headers: {
        apikey: apikey,
        "Content-Type": "application/json",
      },
      redirect: "follow",
      next: { revalidate: 60 * 60 * 24 },
    }).catch(() => {
      return {
        success: false,
        error:
          "Error reaching the server. Please check your connection and try again",
        error:
          "Error reaching the server. Please check your connection and try again",
        data: null,
      };
    });
    if (!response)
      return {
        success: false,
        error:
          "Error reaching the server. Please check your connection and try again",
        data: null,
      };
    let result = null;
    if (!(result = await response?.json()))
      return {
        success: false,
        error:
          "Error reaching the server. Please check your connection and try again",
        error:
          "Error reaching the server. Please check your connection and try again",
        data: null,
      };

    const { data, success } = result;
    
    //This line sorts the data by showing active categories first
    let sortedData = data.sort((a,b) => suspended_categories.includes(a.category_name) ? 1 :(suspended_categories.includes(b.category_name) ? -1 : 0));

    if (success) {
      return { success, error: null, data: sortedData };
    } else {
      if (data) {
        return { success, error: data.message, data: null };
      } else {
        return {
          success: false,
          error: `${response.status} ${response.statusText}`,
        };
      }
    }
  } catch (err) {
    console.log({ err });
    // throw new Error("Something went wrong. Please check your connection")
    return {
      success: false,
      error: `Something went wrong. Please check your connection`,
      error: `Something went wrong. Please check your connection`,
      data: null,
    };
  }
};
