const axios = require("axios");
module.exports = async (lkid) => {
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
    return parse(lyrics);
}