import { createAsyncThunk } from '@reduxjs/toolkit';

// Define multiple async thunks for each API call
export const fetchTeacherData = createAsyncThunk('employeeDetails/fetchTeacherData', async () => {
  let response = await fetch('/api/admin/getTeachers');
  response=await response.json()
  if (response.success===false) {
    throw new Error('Network response was not ok');
  }
  const data=response.teachers
  return data;
});

export const fetchAccountantData = createAsyncThunk('employeeDetails/fetchAccountantData', async () => {
  let response = await fetch('/api/admin/accountant');
  response=await response.json()
  if (response.success===false) {
    throw new Error('Network response was not ok');
  }
  const data=response.accountant
  return data;
});

export const fetchFrontDeskData = createAsyncThunk('employeeDetails/fetchFrontDeskData', async () => {
  let response = await fetch('/api/admin/frontDesk');
  response=await response.json()
  if (response.success===false) {
    throw new Error('Network response was not ok');
  }
  const data=response.frontDesk
  return data;
});
export const fetchStudentData = createAsyncThunk('employeeDetails/fetchStudentData', async () => {
  let response = await fetch('/api/admin/student');
  response=await response.json()
  if (response.success===false) {
    throw new Error('Network response was not ok');
  }
  const data=response.students
  return data;
});
export const fetchVisitorsData = createAsyncThunk('employeeDetails/fetchVisitorsData', async () => {
  let response = await fetch('/api/admin/visitors');
  response=await response.json()
  if (response.success===false) {
    throw new Error('Network response was not ok');
  }
  const data=response.visitors
  return data;
});
