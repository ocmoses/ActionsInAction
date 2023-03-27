import freeemails from "@/app/modules/freeemails.json"
export default async function handler(req, res) {
  try {
    const { email } = req.query

    const freeEmail = await freeemails.includes(email)
    if (freeEmail)
      return res.status(200).json({
        success: false,
        error: "We could not verify your email address at this time",
        data: null,
      })

    return res
      .status(200)
      .json({ success: true, error: null, is_free: !data.webmail })
  } catch (error) {
    console.log({ error })
    res.status(200).json({
      success: false,
      error: "Something went wrong",
    })
    return
  }
}
