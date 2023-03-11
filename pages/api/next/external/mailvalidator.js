export default async function handler(req, res) {
  try {
    const { email } = req.query
    const url =
      process.env.VALIDATOR === "MAILBOX"
        ? `https://api.mailboxvalidator.com/v1/email/free?email=${email}&key=${process.env.MAILBOX_VALIDATOR_API_KEY}`
        : `https://api.hunter.io/v2/email-verifier?email==${email}&api_key=${process.env.HUNTER_API_KEY}`
    const response = await fetch(url).catch((err) => {
      console.log({ err })
      return "An error occured"
    })
    const result = await response.json()
    console.log("process.env.VALIDATOR", process.env.VALIDATOR)
    if (!result)
      return res.status(200).json({
        success: false,
        error: "We could not verify your email address at this time",
        data: null,
      })
    switch (process.env.VALIDATOR) {
      case "MAILBOX":
        console.log({ result })
        if (result.error_code)
          return res.status(200).json({
            success: false,
            error: result.error_message,
          })
        return res.status(200).json({
          success: true,
          error: null,
          is_free: result.is_free === "True",
        })
      case "HUNTER":
        const { data, errors } = result
        console.log({ errors })
        console.log({ data })
        if (errors)
          return res.status(200).json({
            success: false,
            error: errors[0]?.details ?? "Something went wrong",
          })
        if (data.status !== "valid")
          return res.status(200).json({
            success: false,
            error: "Your email is invalid",
          })
        return res
          .status(200)
          .json({ success: true, error: null, is_free: !data.webmail })
    }

    res.status(200).json({ success: true, error: null, data: result })
  } catch (error) {
    console.log({ error })
    res.status(200).json({ success: false, error: error })
    return
  }
}
