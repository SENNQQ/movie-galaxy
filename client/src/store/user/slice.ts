import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorType, LoginForm, UserType} from "./types";

interface zxcslice {
    userData:UserType | null
}

const initialState:zxcslice = {
    userData: null,
};

export const fetchUser = createAsyncThunk<UserType, LoginForm, { rejectValue: ErrorType }>('user/fetchUser', async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post('/api/auth/register', userData) as AxiosResponse<{ success: boolean, data: UserType, message: string }>;
        if (response.data.success) {
            return response.data.data;
        } else {
            return rejectWithValue({code: response.status, message: response.data.message});
        }
    } catch (err) {
        let error = err as AxiosError<{ message: string }>;
        if (!error.response) {
            throw err;
        }
        return rejectWithValue({code: error.response.status, message: error.response.data.message});
    }
});

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state) => {
            state.userData = null;
        });
        builder.addCase(fetchUser.fulfilled, (state, {payload}) => {
            console.log(payload)
            state.userData = payload;
        });
        builder.addCase(fetchUser.rejected, (state, {payload}) => {
            console.log(payload)
            state.userData = null;
        });
    }
})

// export const {addDownloadFile} = userSlice.actions;

export default userSlice.reducer;