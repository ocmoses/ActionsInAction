import EndPoints from "@/app/modules/endpoints";
import { fetchData } from "@/app/modules/fetchData";
import { createHttpOnlyCookie } from "@/app/modules/utilities";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(200).json({ success: false, error: "Invalid request method" });
      return;
    }
    const user_uuid = JSON.parse(req.body);
    const response = await fetchData(
      `${EndPoints.GET_USER_INFO_VALIDATED}/${user_uuid}`,
      {
        cache: "no-store",
        headers: {
        apikey: `${process.env.APIKEY}`,
          "Content-Type": "application/json",
          redirect: "follow",
          referrerPolicy: "no-referrer",
        },
      }
    );
    if (response?.success) {
      const { data, success } = response;
      const { User, authToken } = createHttpOnlyCookie(data, req, res);
      if (!authToken)
        return res
          .status(200)
          .json({ success, error: "Invalid request", data: User });
      res.status(200).json({ success, error: null, data: User });
      return;
    } else {
      if (response?.error) {
        const { error, success } = response;
        res.status(200).json({ success, error: error, data: null });
        return;
      } else {
        res.status(200).json({
          success: false,
          error: `${response.status} ${response.statusText}`,
        });
        return;
      }
    }
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
    return;
  }
}
