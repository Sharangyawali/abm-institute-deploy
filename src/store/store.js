const { configureStore } = require("@reduxjs/toolkit");
import notificationShow from "./notificationShow/notificationShow";
import loadingShow from "./loadingShow/loadingShow";
import  attendanceDetail  from "./attendanceDetails/attendanceDetails";
export const store=configureStore({
    reducer:{
        notificationShow,
        loadingShow,
        attendanceDetail
    }
})