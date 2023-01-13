export default function handler(req, res) {
  res.status(200).json({ message: 'Post created successfully' })
  //   if (req.method === 'POST') {
  //     const body = JSON.parse(req.body)
  //     res.status(200).json({
  //       data: {
  //         body: body ?? {},
  //         message: 'Post created successfully'
  //       }
  //     })
  //   } else {
  //     const query = JSON.parse(req.query)
  //     res.status(200).json({
  //       data: {
  //         query: query ?? {},
  //         message: 'Post created successfully'
  //       }
  //     })
  //   }
}
