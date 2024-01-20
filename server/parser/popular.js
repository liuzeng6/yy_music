const axios = require("axios");
const { JSDOM } = require("jsdom");
module.exports = async () => {
    let { data } = await axios(`http://www.2t58.com/`);
    let { document } = (new JSDOM(data)).window;
    let music_list = Array.from(document.querySelectorAll(".ilingkuplay_list ul li div.name a"))
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
    return music_list;
}

// 2t58的首页歌曲飙升榜