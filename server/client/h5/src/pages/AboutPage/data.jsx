import EmailOutlined from "@mui/icons-material/EmailOutlined"
import InfoOutlined from "@mui/icons-material/InfoOutlined"
import MessageOutlined from "@mui/icons-material/MessageOutlined"
import logoImg from "../../assets/logo.png"
import copyText from "../../utils/copyText";

export default [
    {
        icon: logoImg,
        nodes: [
            {
                text: "QMD",
                styles: {
                    fontSize: "16px"
                }
            },
            {
                text: "Version 1.7.2",
            },
        ],
        handleClick: () => {
            console.log('a');
        }
    },
    {
        icon: <InfoOutlined style={{ color: "#666666" }} ></InfoOutlined>,
        nodes: [
            {
                text: "简介、实用的音乐下载APP",
            },
            {
                text: "提供下载/试听音乐功能",
            },
            {
                text: "程序数据来源于kuwo.com",
            },
            {
                text: "程序会收集下载和搜索数据用于数据分析。在权限和隐私上严格遵守谷歌开发文档的最佳实现，绝不滥用权限，绝不收集包含任何隐私信息。"
            },
            {
                text: "QMD为本人学习之用，如果QMD侵犯了您的权益，请第一时间发邮件告知。"
            }
        ],
        handleClick: null
    },
    {
        icon: <MessageOutlined style={{ color: "#666666" }} ></MessageOutlined>,
        nodes: [
            {
                text: "QQ交流群：2186184487",
            },
        ],
        handleClick: () => {
            copyText("2186184487");
        }
    },
    {
        icon: <MessageOutlined style={{ color: "#666666" }} ></MessageOutlined>,
        nodes: [
            {
                text: "公众号：曼禾源代工作室",
            },
        ],
        handleClick: () => {
            copyText("曼禾源代工作室");
        }
    },
    {
        icon: <EmailOutlined style={{ color: "#666666" }} ></EmailOutlined>,
        nodes: [
            {
                text: "邮箱：2186184487@qq.com",
            },
        ],
        handleClick: () => {
            copyText("2186184487@qq.com");
        }
    },
]