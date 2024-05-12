const { configureStore } = require("@reduxjs/toolkit");
import notificationShow from "./notificationShow/notificationShow";
import loadingShow from "./loadingShow/loadingShow";
export const store=configureStore({
    reducer:{
        notificationShow,
        loadingShow
    }
})