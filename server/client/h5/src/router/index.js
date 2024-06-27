import { createHashRouter as Router } from "react-router-dom";
import UserPage from "../pages/UserPage/index.jsx";
import HomePage from "../pages/HomePage/index.jsx";
import SearchPage from '../pages/SearchPage/index.jsx';
import AboutPage from '../pages/AboutPage/index.jsx';
import SettingPage from '../pages/SettingPage/index.jsx';
import CollectPage from '../pages/CollectPage/index.jsx';
import PlayListPage from '../pages/PlayListPage/index.jsx';
import RewardPage from '../pages/RewardPage/index.jsx';
import DownloadPage from '../pages/DownloadPage/index.jsx';
import SongListPage from "../pages/SongListPage/index.jsx";


export default Router([
    {
        path: "/",
        Component: HomePage
    }, {
        path: "/user",
        Component: UserPage
    },
    {
        path: "/search",
        Component: SearchPage,
    }, {
        path: "/about",
        Component: AboutPage,

    },
    {
        path: "/settings",
        Component: SettingPage
    },
    {
        path: "/collect",
        Component: CollectPage
    },
    {
        path: "/playList",
        Component: PlayListPage
    },
    {
        path: "/reward",
        Component: RewardPage
    },
    {
        path: "/download",
        Component: DownloadPage
    },
    {
        path: "/search/:q",
        Component: SongListPage,
    }
])


