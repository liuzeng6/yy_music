const axios = require('axios')
axios.post("http://www.2t58.com/js/play.php", "id=bW53ZGRk&type=music", {
    headers: {
        'Accept': 'application / json, text/ javascript, */*; q=0.01',
        'Accept-Encoding':
            'gzip, deflate',
        'Accept-Language':
            'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Connection':
            'keep-alive',
        'Content-Length':
            '22',
        "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie:
            "201182467=1.527922; Hm_lvt_b8f2e33447143b75e7e4463e224d6b7f=1701668003,1701833339,1702353634,1703425849; mode=1; songIndex=0; coin_screen=1494*934; Hm_lpvt_b8f2e33447143b75e7e4463e224d6b7f=1703445105",
        Host: "www.2t58.com",
        Origin:
            "http://www.2t58.com",
        Referer:
            "http://www.2t58.com/song/bW53ZGRk.html",
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
        'X-Requested-With':
            'XMLHttpRequest',

    }
}).then(res=>{
    console.log(res.data);
})
axios('https://api.44h4.com/lc.php?cid=271333').then(({data})=>{
    const parse = (lyrics) => {
        let arr = [];
        // console.log(lyrics);
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
    console.log(parse(data.lrc));
})