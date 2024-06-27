import { Link } from "react-router-dom";
export default function (props) {
    let { data } = props
    return (
        <>
            <div className="box">
                {
                    data.map((el, index) => {
                        return (
                            <Link className="item" to={el.to} key={index}>
                                <div className="icon">
                                    <img src={el.icon} alt="图标" style={{ width: "100%", height: "100%" }} />
                                </div>
                                <div className="title">{el.title}</div>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}

