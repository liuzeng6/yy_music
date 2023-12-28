window.onkeydown = keydown
function keydown(ev) {
    if (ev.key == ' ') {
        play()
        return false
    }
}