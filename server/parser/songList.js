
const axios = require("axios");
const { JSDOM } = require("jsdom");
module.exports = async (q, len) => {
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

    return len == 1 ? music_list[0] || {} : music_list.splice(0, len);
}
// 搜索结果的歌曲