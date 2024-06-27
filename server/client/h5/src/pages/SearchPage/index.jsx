import { Link, useNavigate, useParams } from "react-router-dom"
import './index.less';
import { Button } from "@mui/material";
import imgUrl1 from "../../assets/icons/back.png"
import imgUrl2 from "../../assets/icons/right.png"
import imgUrl3 from "../../assets/icons/search.png"
import RecordList from "./RecordList";
import { useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import  playerSlice from "../../store/player/index"
let { add_search_record } = playerSlice.actions;
export default function () {
    let input = useRef();
    let query = ""
    let player = useSelector((state) => state.player);
    let dispatch = useDispatch();
    useEffect(() => {
        // input.current
    }, [])
    let navigate = useNavigate();
    let handleClick = () => {
        if (query) {
            dispatch(add_search_record(query));
            navigate(`/search/${query}`)
        }
    }
    return (
        <div className="search-page">
            <div className="header">
                <div className="left">
                    <Button onClick={() => {
                        navigate(-1)
                    }}>
                        <img src={imgUrl1} style={{ width: "21px", height: "21px", margin: "14px 0px" }} alt="返回" />
                    </Button>
                </div>
                <div className="center">
                    <img src={imgUrl3} alt="搜索图标" style={{ width: "20px", height: "20px", margin: "20px 0px" }} />
                    <div className="input-box">
                        <input type="text" placeholder="请输入歌曲、歌手" ref={input} autoFocus="autofocus" onKeyDown={(ev)=>{
                            if(ev.key=='Enter'){
                                handleClick();
                            }
                        }} onInput={(() => {
                            query = input.current.value;
                        })} />
                    </div>
                </div>
                <div className="right">
                    <Button onClick={handleClick}>
                        <img src={imgUrl2} style={{ width: "15px", height: "15px", margin: "18px 0px" }} alt="搜索" />
                    </Button>
                </div>
            </div>
            <RecordList data={player.search_record} />
        </div>
    )
}