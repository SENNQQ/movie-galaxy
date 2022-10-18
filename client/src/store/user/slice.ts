import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorType, LoginForm, UserType} from "./types";

interface userDataType {
    userData:UserType | null
}

const initialState:userDataType = {
    userData: null,
};

export const fetchUser = createAsyncThunk<UserType, LoginForm, { rejectValue: ErrorType }>('user/fetchUser', async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post('/api/auth/login', userData) as AxiosResponse<{ success: boolean, data: UserType }>;

        if (response.data) {
            return response.data.data;
        }
        else {
            return rejectWithValue({code: response.status, message: response.data});
        }
    }
    catch (err) {
        let error = err as AxiosError<{ message: string }>;
        if (!error.response) {
            throw err;
        }
        return rejectWithValue({code: error.response.status, message: error.response.data.message});
    }
});

export const fetchAuth = createAsyncThunk<UserType, void, { rejectValue: ErrorType }>('user/fetchAuth', async (_arg, {rejectWithValue}) => {
    try {
        const response = await axios.get('/api/auth') as AxiosResponse<{ success: boolean, data: UserType}>;
        if (response.data) {
            return response.data.data;
        } else {
            return rejectWithValue({code: response.status, message: response.data});
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
            state.userData = payload;
        });
        builder.addCase(fetchUser.rejected, (state, {payload}) => {
            state.userData = null;
        });
        builder.addCase(fetchAuth.pending, (state) => {
            state.userData = null;
        });
        builder.addCase(fetchAuth.fulfilled, (state, {payload}) => {
            state.userData = payload;
        });
        builder.addCase(fetchAuth.rejected, (state, {payload}) => {
            state.userData = null;
        });
    }
})

// export const {addDownloadFile} = userSlice.actions;

export default userSlice.reducer;