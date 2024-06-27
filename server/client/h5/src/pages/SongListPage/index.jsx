import { useNavigate, useParams } from "react-router"
import { Button, Tabs, Tab } from "@mui/material";
import imgUrl3 from "../../assets/icons/search.png"
import "./index.less"
import AppBar from "../../components/AppBar"

import SongList from "./SongList";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
export default function () {
    let { q } = useParams();
    useEffect(() => {
        axios(`${config.baseURL}/search/${q}`).then(res => {
            setData(res.data);
            console.log(data);
        });
    }, []);
    let [data, setData] = useState([]);
    let [select, setSelect] = useState(0);
    let navigate = useNavigate();

    return (
        <>
            <div className="song-list-page">
                <AppBar title={q} actions={<Button onClick={() => {
                    navigate(-1)
                }}>
                    <img src={imgUrl3} style={{ width: "17px", height: "17px", margin: "16px 0px" }} alt="搜索" />
                </Button>} />

                <Tabs
                    value={select}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="scrollable"
                    onChange={(ev, newValue) => {
                        setSelect(newValue);
                    }}
                    aria-label="disabled tabs example"
                >
                    {
                        ["音乐平台1", "音乐平台2", "音乐平台3", "音乐平台4"].map((el, index) => {
                            return <Tab key={index} label={el} disabled={index != 0}></Tab>
                        })
                    }
                </Tabs>
                <SongList data={data} />
            </div>
        </>
    )
}