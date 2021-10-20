const express = require("express");
var cors = require("cors");
const app = express();
const port = 3001;
const axios = require("axios");

app.use(cors());

app.get("/properties/:id", async (req, res) => {
  const { id: propertyId } = req.params;
  let finalResult = await axios.get(
    `https://odrx4hmnq6.execute-api.us-west-2.amazonaws.com/default/interview_api_endpoint_1?propertyId=${propertyId}`
  );

  // Use this var for letting us know from which result we are sending the response
  let fromEndpoint = "e1";
  if (
    !finalResult ||
    !finalResult.data ||
    finalResult.data.status !== "success"
  ) {
    finalResult = await axios.get(
      `https://ry1jrxwgeg.execute-api.us-west-2.amazonaws.com/default/interview_api_endpoint_2?propertyId=${propertyId}`
    );
    fromEndpoint = "e2";
  }
  res.json({ ...finalResult.data, fromEndpoint });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
