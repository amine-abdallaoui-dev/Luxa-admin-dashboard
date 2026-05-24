import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const Admin_login = createAsyncThunk(
    "auth/AdminLogin",
    async (info,{rejectWithValue,fulfillWithValue})=>{
        console.log(info)
        try {
            const {data} = await api.post("/admin/login",info,{withCredentials : true})
            const acceesstoken = data.token;
            localStorage.setItem("accessToken",acceesstoken)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
       
)


export const get_admin = createAsyncThunk(
    "auth/getAdmin",
    async (_, {rejectWithValue,fulfillWithValue})=>{
        try {
            const {data} = await api.get("/get-admin",{withCredentials : true})
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const admin_logout = createAsyncThunk(
    "auth/adminLogout",
    async (_, {rejectWithValue,fulfillWithValue})=>{
        try {
            const {data} = await api.get("/admin/logout",{withCredentials : true})
            localStorage.removeItem("accessToken")
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const authReducer = createSlice({
    name : "auth",
    initialState : {
        errorMessage : "",
        successMessage : "",
        loader : false,
        userInfo : ""
    },
    reducers : {
        clearMessage : (state)=>{
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers : (builder)=>{

        builder
        .addCase(Admin_login.pending,(state)=>{
            state.loader = true
        })
        .addCase(Admin_login.fulfilled,(state,{payload})=>{
            state.loader = false;
            state.successMessage = payload.message
        })
        .addCase(Admin_login.rejected,(state,{payload})=>{
            state.loader = false;
            state.errorMessage = payload.error
        })

        .addCase(get_admin.fulfilled,(state,{payload})=>{
            state.userInfo = payload.admin
        })

        .addCase(admin_logout.fulfilled,(state,{payload})=>{
            state.userInfo = ""
            state.successMessage = payload.message
        })
    }
})



export const {clearMessage} =  authReducer.actions
export default authReducer.reducer