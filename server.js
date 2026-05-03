const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/submit", (req, res) => {
    const newMessage = req.body;

    let data = [];
    if (fs.existsSync("messages.json")) {
        data = JSON.parse(fs.readFileSync("messages.json"));
    }

    data.push(newMessage);

    fs.writeFileSync("messages.json", JSON.stringify(data, null, 2));

    res.json({ success: true, message: "Zapisano!" });
});


app.listen(PORT, () => {
    console.log(`Server działa na http://localhost:${PORT}`);
});