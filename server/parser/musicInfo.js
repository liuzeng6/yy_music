const axios = require("axios");
module.exports = async (id) => {
    let { data } = await axios.get(`http://www.wxmp3.com/mp3/${id}.html`);
    data.match(/APlayer(.*)?;/);
    let meta = RegExp.$1.replace(';aplay.play()', '').replace('element: document.getElementById("player"),', '');
    try {
        meta = eval(meta).music;
        let { url, pic, author, name } = meta;
        let res = {
            "msg": 1,
            "lkid": id,
            "title": name + '-' + author,
            pic,
            url,
            data: {
                url
            },
            "code": 1
        }
        return res;
    } catch (e) {
        let res = { "msg": 0 }
        return res;
    }


}



({
    narrow: false, autoplay: true, showlrc: true,
    music: {
        name: "天地龙鳞",
        author: "王力宏",
        url: "https://ws.stream.qqmusic.qq.com/M800001bvgPu1ss42p.mp3?fromtag=8&guid=wxmp3&trace=04f3450b9dd86824&uin=0&vkey=C2ECD527A34DBDF18782239794C047763B5B625F47D85E7915CC7A3443E501EC3AF0C4C84BF2F2BD0D87A077E480DCABBE228EF948BB34FA",
        pic: "http://imge.kugou.com/stdmusic/400/20211126/20211126151507932163.jpg"
    }
})




// (async () => {
//     let id = "8713d87a910907aa125cb9ac95e36270"
//     let { data } = await axios.get(`http://www.wxmp3.com/mp3/${id}.html`);
//     let { document } = (new JSDOM(data)).window;
//     let res = document.querySelectorAll("meta");
//     res.forEach(el=>{
//         console.log(el.content);
//     })


// })()

