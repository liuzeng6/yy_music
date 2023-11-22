const express = require("express");
const axios = require("axios");
const parse = require("./parse");
const static = require("express-static")
let app = express();
let port = process.env[2] || 8080;

app.all("*", async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    await next();
})
app.get("/search/:q", async (req, res) => {
    let q = req.params.q;
    let { data } = await axios(`https://www.gequbao.com/s/${q}`);
    let list = await parse(data);
    res.send(list);
});
app.get("/play_url/:id", async (req, res) => {
    let id = req.params.id;
    let { data } = await axios(`https://www.gequbao.com/api/play_url`, {
        data: {
            json: 1, id
        }
    });
    res.send(data)
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/client/"+"index.html")
})
app.use(static("./client"))
app.listen(port, () => {
    console.log(`你的服务开启在${port}上`);
})