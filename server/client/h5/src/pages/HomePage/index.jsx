import "./index.less"
import { Link } from "react-router-dom"
import Tools from "./Tools.jsx"


import imgUrl1 from "../../assets/icons/playlist.png"
import imgUrl2 from "../../assets/icons/collect.png"
import imgUrl3 from "../../assets/icons/download.png"
import imgUrl4 from "../../assets/icons/setting.png"
import imgUrl5 from "../../assets/icons/reward.png"
import imgUrl6 from "../../assets/icons/about.png"
export default function () {
    return (
        <div className="home-page">
            <div className="header">
                <div className="left">
                    QMD
                </div>
                <div className="space"></div>
                <div className="right">
                    <Link style={{ display: "block" }} to={"/search"}>
                        <div className="search"></div>
                    </Link>
                </div>
            </div>
            <div className="main">
                <Tools data={[
                    {
                        icon: imgUrl1,
                        title: "歌单",
                        to: "/playList"
                    },
                    {
                        icon: imgUrl2,
                        title: "收藏",
                        to: "/collect"
                    },
                    {
                        icon: imgUrl3,
                        title: "下载",
                        to: "/download"
                    },
                    {
                        icon: imgUrl4,
                        title: "设置",
                        to: "/settings"
                    },
                    {
                        icon: imgUrl5,
                        title: "打赏",
                        to: "/reward"
                    },
                    {
                        icon: imgUrl6,
                        title: "关于",
                        to: "/about"
                    },
                ]} />
                
            </div>
        </div>
    )
}