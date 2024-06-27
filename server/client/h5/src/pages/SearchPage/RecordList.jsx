import { Button } from "@mui/material";
import imgUrl from "../../assets/icons/del.png";
import AlertDialog from "../../components/AlertDialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import playerSlice from "../../store/player/index";
let { add_search_record, remove_search_record } = playerSlice.actions
export default function (props) {
    let { data } = props;
    let [open, setOpne] = useState(false);
    let player = useSelector(state => state.player);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    return (
        <>
            <AlertDialog content="是否清空所有记录？" open={open} onPressed={() => {
                setOpne(false);
                dispatch(remove_search_record())
            }} handleClose={() => { setOpne(false) }}></AlertDialog>
            {
                data?.length ? <ul className="list">
                    {
                        data.map((el, index) => {
                            return (
                                <li className="item" key={index}>
                                    <Button style={{ display: "flex", width: "100%", color: "#6E6E6E" }} onClick={(() => {
                                        dispatch(add_search_record(el));
                                        navigate(`/search/${el}`)
                                    })}>
                                        <div>{el}</div>
                                        <div className="space"></div>
                                        <div className="icon">
                                            <img src={imgUrl} alt="删除" style={{ width: "24px", height: "24px", marginTop: "13px" }} onClick={((ev) => {
                                                ev.stopPropagation();
                                                dispatch(remove_search_record(index));
                                            })} />
                                        </div>
                                    </Button>
                                </li>
                            )
                        })
                    }
                    <div className="clear" onClick={(() => {
                        setOpne(true);
                    })}>
                        <Button style={{ width: "100%", color: "#6E6E6E" }}>
                            清空所有记录
                        </Button>
                    </div>
                </ul> : ""
            }
        </>
    )
}