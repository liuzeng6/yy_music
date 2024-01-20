const axios = require("axios");
module.exports = async (id) => {
    let { data } = await axios.post(`http://www.2t58.com/js/play.php`, { id, 'type': 'music' }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            'Referer': `http://www.2t58.com/song/${id}.html`,
        }
    });
    data.data = {}
    data.data.url = data.url;
    data.code = data.msg;
    return data;
}