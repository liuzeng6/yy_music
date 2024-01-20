const axios = require("axios");
const convert = require("./convert");
const fs = require("fs").promises;
const { staticDir, playListLength } = require("../config");

async function write() {
    let { data } = await axios.get("https://m.kugou.com/rank/info/8888/");
    const len = playListLength;
    let re = /\<span class="song_name"\>[^\<\>]*?\<\/span\>/g;
    data = data.match(re).map(el => el.substring(el.indexOf('>') + 2, el.lastIndexOf('<'))).splice(0, len);
    data = await convert(data);
    fs.writeFile(staticDir + "/json/top.json", JSON.stringify(data));
}
setInterval(write, 86400 * 1000 / 2);
write();