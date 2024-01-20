const fs = require("fs").promises;
const convert = require("../util/convert");
const axios = require("axios");
const pathlib = require("path");
const { playList, playListLength, staticDir } = require("../config");

module.exports = (app) => {
    playList.forEach(el => {
        let frequency = 86400 * 1000 / 2;
        async function write() {
            let { data } = await axios.get(`https://m.kugou.com/rank/info/${el}/`);
            let re = /\<span class="song_name"\>[^\<\>]*?\<\/span\>/g;
            data = data.match(re).map(el => el.substring(el.indexOf('>') + 2, el.lastIndexOf('<'))).splice(0, playListLength);
            data = await convert(data);
            fs.writeFile(pathlib.resolve(__dirname, "../", staticDir, `json/${el}.json`), JSON.stringify(data));
        }
        setInterval(write, frequency);
        write();
        app.get(`/search/${el}`, (req, res) => {
            res.sendFile(pathlib.resolve(__dirname, "../", staticDir, `json/${el}.json`));
        })
    });
}
