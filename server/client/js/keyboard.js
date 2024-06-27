window.onkeydown = function(ev) { const keyMap = {
    ' ': play,
    'ArrowRight': nextSong,
    'ArrowLeft': lastSong,
    'Escape': () => oAlbumImg.onclick(),
    'k': () => byId('search').focus()
};

const ctrlOrAltPressed = ev.ctrlKey || ev.altKey;
const keyAction = keyMap[ev.key];

if (keyAction) {
    if ((ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') && ctrlOrAltPressed) {
        keyAction();
    } else if (ev.key === 'k' && ctrlOrAltPressed) { keyAction();
    } else if (ev.key === 'Escape') {
        keyAction();
    } else if (ev.key === ' ') {
        keyAction();
    }
    return false;
}
};