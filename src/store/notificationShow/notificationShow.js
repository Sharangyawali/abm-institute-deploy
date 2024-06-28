const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    show:false
}

export const notificationShow=createSlice({
    name:'notificationShow',
    initialState,
    reducers:{
        showNotification:(state,action)=>{
            state.show=true
        },
        hideNotification:(state,action)=>{
            state.show=false
        }
    }
})

export const{showNotification,hideNotification}=notificationShow.actions

export default notificationShow.reducer