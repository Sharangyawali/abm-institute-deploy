const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    detail:[]
}
export const attendanceDetail=createSlice({
    name:'attendanceDetail',
    initialState,
    reducers:{
        setAttendanceDetails:(state,action)=>{
            state.detail=[action.payload]
        }
    }
})

export const {setAttendanceDetails}=attendanceDetail.actions
export default attendanceDetail.reducer