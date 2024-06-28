const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    loading:false
}

export const loadingShow=createSlice({
    name:'loadingShow',
    initialState,
    reducers:{
        setLoadingTrue:(state,action)=>{
            state.loading=true
        },
        setLoadingFalse:(state,action)=>{
            state.loading=false
        }
    }
})

export const {setLoadingTrue,setLoadingFalse}=loadingShow.actions

export default loadingShow.reducer