import { useNavigate } from "react-router";
import imgUrl1 from "../../assets/icons/back.png"
import { Button } from "@mui/material";
import "./index.less"
export default function (props) {
    let { title, actions } = props;
    let navigate = useNavigate();
    return (
        <>
            <div className="appBar">
                <div className="header">
                    <div className="left">
                        <Button onClick={() => {
                            navigate(-1);
                        }}>
                            <img src={imgUrl1} style={{ width: "21px", height: "21px", margin: "14px 0px" }} alt="返回" />
                        </Button>
                    </div>
                    <div className="center">
                        {title}
                    </div>
                    <div className="right">
                        {actions}
                    </div>
                </div>
            </div>
            {/* <div className="space">

            </div> */}
        </>
    )
}