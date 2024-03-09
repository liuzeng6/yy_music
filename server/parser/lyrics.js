const axios = require("axios");

module.exports = async (lkid) => {
    let { data: lyrics } = await axios(`http://www.wxmp3.com/mp3/${lkid}.html`);
    lyrics.match(/<pre class="aplayer-lrc-content">(.*)?<\/pre>/)
    lyrics = RegExp.$1.split(' ');
    const parse = (lyrics) => {
        lyrics = lyrics.filter(el => el);
        lyrics.shift();
        lyrics.shift();
        // console.log(lyrics);
        let arr = [];
        lyrics.map(el => {
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
        // arr.shift()
        return arr;
    }
    return parse(lyrics);
}