export default async function handler(req, res) {
  try {
    const { tin } = req.query
    if (!tin)
      return res.status(200).json({
        success: false,
        error: "Company TIN is required",
        data: null,
      })
    const response = await fetch(process.env.BLUSALT_TIN_URL, {
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
        criteria: "TIN",
        criteriaValue: tin,
      }),
    }).catch((err) => {
      return "Something went wrong"
    })
    const result = await response.json()
    if (!result)
      return res.status(200).json({
        success: false,
        error:
          "We could not verify your TIN at this time. Please try again later",
        data: null,
      })
    if (!result.TIN)
      return res.status(200).json({
        success: false,
        error:
          "Your TIN may be invalid or cannot be verified. Please try again with a valid TIN",
        data: null,
      })

    res.status(200).json({ success: true, error: null, data: result })
  } catch (error) {
    console.log({ error })
    res.status(200).json({ success: false, error: "Something went wrong" })
    return
  }
}
