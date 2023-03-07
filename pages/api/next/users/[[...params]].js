export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const body = JSON.parse(req.body)
    } else {
      const { params } = req.query
    }
    return res.status(200).json({ success: false, data: "Params" })
  } catch (error) {
    res.status(200).json({ success: false, error: error.message })
  }
}
