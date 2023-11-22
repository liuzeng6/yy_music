const fs = require("fs/promises");
const { JSDOM } = require("jsdom");

module.exports = (data) => {
    let { document } = (new JSDOM(data)).window;
    music_list = Array.from(document.querySelectorAll(".card-text .row"))
    music_list.shift();
    result = music_list.map(el => {
        return {
            song: el.children[0].children[0].innerHTML.replace(/\s/g, ''),
            id: el.children[0].children[0].href.match(/\d+/g)[0],
            singer: el.children[1].innerHTML.replace(/\s/g, '')
        }
    })
    // console.log(result);
    return result;
}