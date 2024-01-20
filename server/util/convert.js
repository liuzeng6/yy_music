const songList = require("../parser/songList");

module.exports = async function getList(arr) {
    let list = [];
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        let res = await songList(el, 1);
        list.push(res);
    }
    return list
}