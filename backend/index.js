const bodyParser = require('body-parser');
const cors = require('cors');
const execSync = require('child_process').execSync;
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CODE_FOLDER = "code";
function testCode(req, res) {
  let code = req.body["code"];
  try {
    fs.writeFileSync(path.join(__dirname, CODE_FOLDER, "input_code.py"), code);
    const proc = execSync("python " + path.join(CODE_FOLDER, "tests.py"));
    const results = proc.toString();
    
    return res.send(results);
  } catch (error) {
    console.log("An error occurred");
    console.log(error);
    return res.send("No result was returned by user");
  }
}

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.post('/test/', testCode);

app.listen(5000, () =>
    console.log(`Listening on port 5000.`),
);