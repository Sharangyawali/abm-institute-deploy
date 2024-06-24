import { createSlice } from "@reduxjs/toolkit";
import { fetchAccountantData, fetchFrontDeskData, fetchStudentData, fetchTeacherData, fetchVisitorsData } from "./employeesDetailsThunk";

export const employeeDetails=createSlice({
    name:'employeeDetails',
    initialState:{
        teachers:[],
        frontDesks:[],
        accountants:[],
        students:[],
        visitors:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTeacherData.fulfilled,(state,action)=>{
            state.teachers=action.payload
        })
        .addCase(fetchTeacherData.rejected,(state)=>{
            state.teachers=[]
        })
        .addCase(fetchAccountantData.fulfilled,(state,action)=>{
            state.accountants=action.payload
        })
        .addCase(fetchAccountantData.rejected,(state)=>{
            state.accountants=[]
        })
        .addCase(fetchFrontDeskData.fulfilled,(state,action)=>{
            state.frontDesks=action.payload
        })
        .addCase(fetchFrontDeskData.rejected,(state)=>{
            state.frontDesks=[]
        })
        .addCase(fetchStudentData.fulfilled,(state,action)=>{
            state.students=action.payload
        })
        .addCase(fetchStudentData.rejected,(state)=>{
            state.students=[]
        })
        .addCase(fetchVisitorsData.fulfilled,(state,action)=>{
            state.visitors=action.payload
        })
        .addCase(fetchVisitorsData.rejected,(state)=>{
            state.visitors=[]
        })
    }
})

export default employeeDetails.reducer