import RemoteEndpoints from '@/app/modules/endpoints';


export default async function handler(req, res) {

  
    try {
      const { partner_uuid } = req.query;
      // if (!partner_uuid)
      //   return res.status(200).json({
      //     success: false,
      //     error: "Partner UUID is required",
      //     data: null,
      //   });
      const endpoint = RemoteEndpoints.GET_NOTIFICATIONS;
      console.log('Calling notifications endpoint', endpoint);
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          'X-API-KEY': process.env.APIKEY,
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        
      }).catch((err) => {
        // console.log('Notification Err...', err);
        return "Something went wrong. Please check your connection and try again";
      });
      const result = await response.json();
      if (!result)
        return res.status(400).json({
          success: false,
          error:
            "We could not get notifications at this time. Please try again later",
          data: null,
        });
      if (!result.data)
        return res.status(200).json({
          success: false,
          error:
            "Your notifications could not be retrieved.",
          data: null,
        });

        // console.log('Notification...', result);
  
      res.status(200).json({ success: true, error: null, data: result });
    } catch (error) {
      // console.log('The error', { error });
      res.status(400).json({
        success: false,
        error: "Something went wrong. Please check your connection and try again",
      });
      return;
    }
  }
  