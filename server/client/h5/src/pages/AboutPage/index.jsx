import AppBar from '../../components/AppBar';
import { ListItem, Card, ListItemIcon, Snackbar, } from '@mui/material';
import data from "./data.jsx"
import "./index.less"
export default function () {
    return (
        <div className='about-page'>
            <AppBar title="关于" />
            <Snackbar autoHideDuration={3000} message="消息提示" />
            {
                data.map((el, index) => <Card className='card' onClick={el.handleClick}>
                    <ListItem button className="item">
                        <ListItemIcon>
                            {((typeof el.icon) == "string") ? <img src={el.icon} className="icon" alt="图标" /> : el.icon}
                        </ListItemIcon>
                        <div className='flex'>
                            {el.nodes.map(el => <div style={el.style} className='text'>
                                {el.text}
                            </div>)}
                        </div>
                    </ListItem>
                </Card>)
            }

        </div>
    )
}