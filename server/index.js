const express = require("express");
const axios = require("axios");
const static = require("express-static");
const { JSDOM } = require("jsdom");

let app = express();
let port = process.argv[2] || 8080;

app.all("*", async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Headers", "*");
    res.header("Access-Control-Request-Method", "*");
    await next();
})

app.get('/search/', async (req, res) => {

    let q = req.params.q;
    let { data } = await axios(`http://www.2t58.com/`);
    let { document } = (new JSDOM(data)).window;
    music_list = Array.from(document.querySelectorAll(".ilingkuplay_list ul li div.name a"))
    music_list = music_list.map(el => {
        let url = el.href;
        let start = url.lastIndexOf("/") + 1;
        let end = url.lastIndexOf('.');
        let id = url.substring(start, end)
        return {
            song: el.innerHTML.split("_")?.[1].replace(/\s/g, ''),
            singer: el.innerHTML.split("_")[0].replace(/\s/g, ''),
            id
        }
    });
    res.send(music_list);
})
app.get("/search/:q", async (req, res) => {

    let { token, user } = req.query;
    let tokenList = [];

    let offset = 5;
    for (let i = offset - 1; i >= -1; i--) {
        let time = (new Date(Date.now() - 1000 * i)).toGMTString();
        // console.log(time);
        tokenList.push(Buffer.from(time + 'liu').toString('base64'))
    }
    if (!tokenList.includes(token)) {
        if (user != 'liu') {
            res.send("你小子是不是想偷数据");
            console.log("有人偷数据了");
            console.log(Buffer.from(token, 'base64').toString(), (new Date()).toGMTString());
            return false;
        }
    }
    // console.log(str, token, str == token);

    let q = req.params.q;
    let { data } = await axios(`http://www.2t58.com/so/${q}.html`);
    let { document } = (new JSDOM(data)).window;
    music_list = Array.from(document.querySelectorAll(".play_list ul li div.name a"))
    music_list = music_list.map(el => {
        let url = el.href;
        let start = url.lastIndexOf("/") + 1;
        let end = url.lastIndexOf('.');
        let id = url.substring(start, end)
        return {
            song: el.innerHTML.split("-")[1].replace(/\s/g, ''),
            singer: el.innerHTML.split("-")[0].replace(/\s/g, ''),
            id
        }
    });
    res.send(music_list)

});
app.get("/play_url/:id", async (req, res) => {
    let id = req.params.id;
    let { data } = await axios.post(`http://www.2t58.com/js/play.php`, { id, 'type': 'music' }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            'Referer': `http://www.2t58.com/song/${id}.html`,
        }
    });

    // let parseLrc = req.query.parseLrc || true;
    // if (parseLrc == true) {
    //     let { lkid } = data;
    //     let { data: lrc } = await axios(`http://localhost:${port}/lrc/${lkid}`);
    //     data.lrc = lrc
    // }
    //是否加载歌词

    data.data = {}
    data.data.url = data.url;
    data.code = data.msg;

    res.send(data);
});
app.get('/lrc/:lkid', async (req, res) => {
    let lkid = req.params.lkid;
    let { data: { lrc: lyrics } } = await axios(`https://api.44h4.com/lc.php?cid=${lkid}`);

    const parse = (lyrics) => {
        let arr = [];
        lyrics.replace(/ /g, '').split("\n").filter(el => el).map(el => {
            el.replace(/\[.*?\]/g, str => {
                let res = str.split('')
                res.shift()
                res.pop()
                res = res.join('')
                minute = res.substring(0, res.indexOf(":"))
                second = res.substring(res.indexOf(":") + 1, res.indexOf("."))
                millisecond = res.substring(res.indexOf(".") + 1)
                if (millisecond.length > 3) {
                    millisecond = millisecond.substring(0, 3)
                }
                // console.log(minute, second, millisecond, el.substring(el.indexOf("]") + 1));
                second = parseFloat(minute * 60 + second * 1 + millisecond * 0.001)
                ly = el.substring(el.indexOf("]") + 1)
                arr.push({ second, ly });
            })
        });
        arr.shift()
        return arr;
    }
    lyrics = parse(lyrics);
    res.send(lyrics)
});
app.get('/', (req, res) => {
    if (req.headers['user-agent'].includes('Windows')) {
        res.sendFile(__dirname + "/client/" + "pc.html")
    } else {
        res.sendFile(__dirname + "/client/" + "index.html")
    }
})



app.use(static("./client"))
app.listen(port, () => {
    console.log(`你的服务开启在${port}上`);
})
