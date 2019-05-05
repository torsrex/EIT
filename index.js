const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/public/index.html', 'utf8', (err, text) => {
        res.send(text);
    });
});

app.use("/public", express.static(__dirname + "/public"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))