export default async function handler(req, res) {
  try {
    const { cac, type } = req.query
    if (!cac)
      return res.status(200).json({
        success: false,
        error: "Company CAC number is required",
        data: null,
      })

    const response = await fetch(process.env.BLUSALT_CAC_URL, {
      method: "POST",
      headers: {
        clientid: process.env.BLUSALT_CLIENTID,
        appname: process.env.BLUSALT_APPNAME,
        apikey: process.env.BLUSALT_APIKEY,
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        registration_number: cac,
        type: type, // co, bn, it
        class: "basic",
        country_code: "NG",
      }),
    }).catch((err) => {
      return "Something went wrong. Please check your connection and try again"
    })
    console.log({
      clientid: process.env.BLUSALT_CLIENTID,
      appname: process.env.BLUSALT_APPNAME,
      apikey: process.env.BLUSALT_APIKEY,
    })
    const result = await response.json()
    console.log({ result })
    if (!result)
      return res.status(200).json({
        success: false,
        error:
          "We could not verify your CAC number at this time. Please try again later",
        data: null,
      })
    if (result.status_code !== 200 && result.message !== "CAC retrieved")
      return res.status(200).json({
        success: false,
        error:
          "Your CAC number may be invalid or could not be retrieved at this time. Please try again with a valid CAC number",
        data: null,
      })

    res.status(200).json({ success: true, error: null, data: result.data })
  } catch (error) {
    console.log({ error })
    res.status(200).json({
      success: false,
      error: "Something went wrong. Please check your connection and try again",
    })
    return
  }
}
