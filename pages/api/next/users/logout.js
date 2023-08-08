import RemoteEndPoints from "@/app/modules/endpoints";

import { Decrypt } from "@/app/modules/utilities";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";

export default async function handler(req, res) {
  try {
    const token = getCookie("auth-token", { req, res });
    const decrypted = token ? Decrypt(token) : null;

    const response = await fetch(RemoteEndPoints.LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${decrypted}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    const result = await response.json();
    if (hasCookie("token", { req, res })) deleteCookie("token", { req, res });
    if (hasCookie("uuid", { req, res })) deleteCookie("uuid", { req, res });

    if (hasCookie("auth-token", { req, res }))
      deleteCookie("auth-token", { req, res });

    if (hasCookie("user_id", { req, res }))
      deleteCookie("user_id", { req, res });

    if (hasCookie("partnerid", { req, res }))
      deleteCookie("partnerid", { req, res });

      //claer localStorage
      localStorage.clear();
    res.status(200).json({ success: true, error: null, data: null });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
    return;
  }
}
