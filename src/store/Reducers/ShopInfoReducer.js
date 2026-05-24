import { createSlice } from "@reduxjs/toolkit";

const ShopInfoReducer = createSlice({
    name : 'shopInfo',
    initialState : {
        imagesPath : "http://localhost:5173/images"
    },
    reducers : {

    },
    extraReducers : (builder)=>{

    }
})



export default ShopInfoReducer.reducer