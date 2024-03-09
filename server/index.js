const express = require("express");
const static = require("express-static");

let popular = require("./parser/popular");
let songList = require("./parser/songList");
const lyrics = require("./parser/lyrics");
const musicInfo = require("./parser/musicInfo");

const searchRecord = require("./util/searchRecord");

let { port: _port, attest, staticDir, cors } = require("./config");

let app = express();
let port = process.argv[2] || _port;

app.all("*", async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", cors);
    res.header("Access-Control-Request-Headers", cors);
    res.header("Access-Control-Request-Method", cors);
    await next();
});

app.get("/searchRecord", async (req, res) => {
    res.send(searchRecord);
})

app.get('/search/', async (req, res) => {

    let music_list = await popular();
    res.send(music_list);
})
// 空值搜索返回2t58的热门歌单;

require("./middleware/playList")(app);

app.get("/search/:q", async (req, res) => {

    if (attest) {
        let { token, user } = req.query;
        let tokenList = [];

        let offset = 5;
        for (let i = offset - 1; i >= -1; i--) {
            let time = (new Date(Date.now() - 1000 * i)).toGMTString();
            tokenList.push(Buffer.from(time + 'liu').toString('base64'))
        }
        if (!tokenList.includes(token)) {
            if (user != 'liu') {
                res.send("你小子是不是想偷数据");
                console.log("有人偷数据了");
                console.log(Buffer.from(token || "", 'base64').toString(), (new Date()).toGMTString());
                return false;
            }
        }
    }
    let q = req.params.q;
    searchRecord.push(q);
    let music_list = await songList(q, 100);
    res.send(music_list)
});
// 搜索接口

app.get("/play_url/:id", async (req, res) => {
    let id = req.params.id;
    let data = await musicInfo(id);
    res.send(data);
});
// 获取播放信息

app.get('/lrc/:lkid', async (req, res) => {
    let lkid = req.params.lkid;
    let arr = await lyrics(lkid);
    res.send(arr)
});
// 获取歌词

app.get('/', (req, res) => {
    if (req.headers['user-agent'].includes('Windows')) {
        res.sendFile(__dirname + "/client/" + "pc.html")
    } else {
        res.sendFile(__dirname + "/client/" + "index.html")
    }
});
// 访问主界面



app.use(static(staticDir));

app.listen(port, () => {
    console.log(`你的服务开启在${port}上`);
})
