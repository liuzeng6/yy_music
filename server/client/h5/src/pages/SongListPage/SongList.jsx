import { Alert, CircularProgress, ListItem, Snackbar } from "@mui/material";
import axios from "axios";
import config from "../../config.js";
import playerSlice from "../../store/player/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import logoImg from "../../assets/logo.png"
let { setURL } = playerSlice.actions;
export default (props) => {
    let player = useSelector(state => state.player);
    let dispatch = useDispatch();
    let { data } = props;
    let [open, setOpen] = useState(false);
    let handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "center", horizontal: 'center' }} style={{ width: "100%" }} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    加载中请稍后!
                </Alert>
            </Snackbar>

            <ul className="list">
                {
                    data.length ? data.map((el, index) => {
                        return (
                            <ListItem button className="item" key={el.id} onClick={async () => {
                                setOpen(true)
                                let { data } = await axios(`${config.baseURL}/play_url/${el.id}`);
                                dispatch(setURL(data.url));
                                // alert(data.url)
                            }}>
                                <div className="left">
                                    <img src={logoImg} style={{ width: "100%", height: "100%" }} alt="封面" />
                                </div>
                                <div className="flex">
                                    <div className="song">{el.song}</div>
                                    <div className="singer">{el.singer}</div>
                                </div>
                            </ListItem>
                        )
                    }) : <div style={{ textAlign: "center", marginTop: "calc((100vh - 108px - 60px) / 2)" }}><CircularProgress style={{ color: "#C72928" }} /></div>
                }

            </ul>
        </>
    )
}