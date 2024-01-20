window.onkeydown = keydown
function keydown(ev) {

    let rules = [
        {
            rule: ev.key == ' ',
            operate: () => {
                play();
            }
        },
        {
            rule: ev.key == "ArrowRight" && (ev.ctrlKey || ev.altKey),
            operate: () => {
                nextSong()
            }
        },
        {
            rule: ev.key == "ArrowLeft" && (ev.ctrlKey || ev.altKey),
            operate: () => {
                lastSong()
            }
        },
        {
            rule: ev.key == "Escape",
            operate: () => {
                oAlbumImg.onclick();
            }
        },
        {
            rule: ev.key == "k" && ev.ctrlKey,
            operate: () => {
                byId('search').focus();
            }
        }
    ];
    for (let i = 0; i < rules.length; i++) {
        const el = rules[i];
        if (el.rule) {
            el.operate();
            return false;
        }
    }
}