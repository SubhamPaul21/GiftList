const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name, root } = req.body;

  const isInTheList = verifyProof(proof, name, root);
  if (isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
