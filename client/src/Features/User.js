import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { UserData } from "../ExampleData";
//import { act } from "react";
import axios from "axios";
//const initialState = {value: UserData};


const initialState = {
    user: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
  };

export const registerUser = createAsyncThunk("users/registerUser",
    async(UserData)=>{
        try{
            const response = await axios.post("http://localhost:3001/registerUser",{
                name: UserData.name,
                email: UserData.email,
                password: UserData.password,
            });
            console.log(response);
            const user= response.data.user;
            return user;

        }catch(error){
            console.log(error);
        }
    });

export const login = createAsyncThunk("users/login", async (UserData) => {
    try{
        const response = await axios.post("http://localhost:3001/login", {
            email: UserData.email,
            password: UserData.password,
        });
        const user = response.data.user;
        console.log(response);
        return user;
    }catch(error) {
        const errorMessage = "Invalid credentials";
        alert(errorMessage);
        throw new Error(errorMessage);
    }
});
export const logout = createAsyncThunk("/users/logout", async() => {
    try{
        const response = await axios.post("http://localhost:3001/logout");
    }catch(error){}
});

export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async (UserData) => {
    try{

        const response = await axios.put(
            `http://localhost:3001/updateUserProfile/${UserData.email}`, 
             {
                email: UserData.email,
                name: UserData.name,
                password: UserData.password,
                profilePic: UserData.profilePic,
             },
             {
                headers: {
                    "Content-Type": "multipart/form-data", 
                },
             }

        );

        const user = response.data.user;
        return user;
    }catch (error){
        console.log(error);
    }
});

export const userSlice= createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser:(state, action)=>{
            state.value.push(action.payload);
        },
        deleteUser:(state, action)=>{
            state.value= state.value.filter((user)=>user.email!==action.payload);
        },
        updateUser:(state, action)=>{
            state.value.map((user)=>{
                if(user.email===action.payload.email)
                {
                    user.name= action.payload.name;
                    user.password=action.payload.password;
                }
            });
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = true;
        })
        .addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
        .addCase(logout.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = {};
            state.isLoading = false;
            state.isSuccess = false;
        })
        .addCase(logout.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
        .addCase(updateUserProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        })
        .addCase(updateUserProfile.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    },

});
export const {addUser, deleteUser, updateUser}= userSlice.actions;
export const usersReducer=userSlice.reducer;
export default userSlice.reducer;