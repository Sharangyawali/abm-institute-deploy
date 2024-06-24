const { configureStore } = require("@reduxjs/toolkit");
import notificationShow from "./notificationShow/notificationShow";
import loadingShow from "./loadingShow/loadingShow";
import  attendanceDetail  from "./attendanceDetails/attendanceDetails";
import  employeeDetails  from "./employeesDetails/employeesDetails";
export const store=configureStore({
    reducer:{
        notificationShow,
        loadingShow,
        attendanceDetail,
        employeeDetails
    }
})