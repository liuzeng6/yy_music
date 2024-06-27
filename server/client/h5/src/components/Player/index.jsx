import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import playerSlice from "../../store/player/index.js";
import "./index.less";


export default function () {
    useEffect(() => {
        dispatch(init(audio.current));
    }, [])
    let { init } = playerSlice.actions
    let dispatch = useDispatch();
    // let player = useSelector(state => state.player);
    let audio = useRef();
    return (
        <>
            <audio src="" className="player-controls" controls ref={audio} autoPlay loop></audio>
        </>
    )
}