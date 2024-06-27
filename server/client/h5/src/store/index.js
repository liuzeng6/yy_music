import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./player/index.js";
export default configureStore({
    reducer: {
        player: playerSlice.reducer
    }
})