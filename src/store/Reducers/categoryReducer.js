import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api"



export const addCategory = createAsyncThunk(
    "category/AddCategory",
    async(info,{fulfillWithValue,rejectWithValue}) =>{

        try {
            const {data} = await api.post("/category-add",info,{withCredentials : true,headers: {
                    "Content-Type": "multipart/form-data"
                }})
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCategory = createAsyncThunk(
    "category/getCategories",
    async(_,{fulfillWithValue,rejectWithValue}) =>{
        try {
          
            const {data} = await api.get("/category-get",{withCredentials : true})
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const deleteCategory = createAsyncThunk(
    "categoey/categoryDelete" ,
    async(id,{fulfillWithValue,rejectWithValue})=>{
        console.log(id)
        try{
            const {data} = await api.post("/category-delete",id,{withCredentials : true})
            console.log(data)
            return fulfillWithValue(data) 
        }catch(err){
            console.log(err.message)
            return rejectWithValue(err.response.data)
        }
    }
)

const categoryReducer = createSlice({
    name : "category",
    initialState : {
        successMessage : "",
        errorMessage : "",
        loader : "",
        categories : []
    },
    reducers : {
        clearMessage : (state)=>{
            state.successMessage = "";
            state.errorMessage = "";
        }
    },
    extraReducers : (builder)=>{
        builder

        .addCase(addCategory.pending,(state,{payload})=>{
            state.loader = true;
        })
        .addCase(addCategory.rejected,(state,{payload})=>{
            state.loader = false;
            state.errorMessage = payload.error
        })
        .addCase(addCategory.fulfilled,(state,{payload})=>{
            state.loader = false;
            state.successMessage = payload.message
            state.categories = [...state.categories,payload.cat]

        })
         .addCase(getCategory.fulfilled,(state,{payload})=>{
            state.categories = payload.categories
        })
        
        .addCase(deleteCategory.fulfilled,(state,{payload})=>{
            state.successMessage = payload.message
            state.categories = payload.allCategories;
        })

    }
})

export const {clearMessage} = categoryReducer.actions
export default categoryReducer.reducer
