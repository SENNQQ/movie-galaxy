import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorType, LoginForm, registerForm, updateForm, UserType} from "./types";


interface userDataType {
    userData: UserType | null
    error: string | null
    load: boolean
}

const initialState: userDataType = {
    userData: null,
    error: null,
    load: false
};

export const loginUser = createAsyncThunk<UserType, LoginForm, { rejectValue: ErrorType }>(
    'user/loginUser', async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/auth/login', userData) as AxiosResponse<{ success: boolean, data: UserType }>;
            if (!response.data.success) {
                return rejectWithValue({code: response.status, message: response.statusText});
            }
            return response.data.data;
        } catch (err) {
            let error = err as AxiosError<{ message: string }>;
            return rejectWithValue({code: error.response!.status, message: error.response!.data.message});
        }
    });

export const fetchAuth = createAsyncThunk<UserType, void, { rejectValue: ErrorType }>(
    'user/fetchAuth', async (_arg, {rejectWithValue}) => {
    try {
        const response = await axios.get('/api/auth') as AxiosResponse<{ success: boolean, data: UserType }>;
        if (!response.data.success) {
            return rejectWithValue({code: response.status, message: response.statusText});
        }
        return response.data.data;
    } catch (err) {
        let error = err as AxiosError<{ message: string }>;
        console.log(error);
        return rejectWithValue({code: error.response!.status, message: error.response!.data.message});
    }
});

export const registerUser = createAsyncThunk<UserType, registerForm, { rejectValue: ErrorType }>(
    'user/register', async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post('/api/auth/register', userData) as AxiosResponse<{ success: boolean, data: UserType }>;
        if (!response.data.success) {
            return rejectWithValue({code: response.status, message: response.statusText});
        }
        return response.data.data;
    }
    catch (err) {
        let error = err as AxiosError<{ message: string }>;
        return rejectWithValue({code: error.response!.status, message: error.response!.data.message});
    }
});

export const updateUser = createAsyncThunk<UserType, updateForm, { rejectValue: ErrorType }>(
    'user/update', async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.patch('/api/auth/update', userData) as AxiosResponse<{ success: boolean, data: UserType }>;
            if (!response.data.success) {
                return rejectWithValue({code: response.status, message: response.statusText});
            }
            return response.data.data;
        }
        catch (err) {
            let error = err as AxiosError<{ message: string }>;
            return rejectWithValue({code: error.response!.status, message: error.response!.data.message});
        }
    });


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.load = false
            state.userData = null;
            state.error = null;
        },
        setAvatar(state, {payload}: PayloadAction<string>) {
            state.userData!.avatar = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, (state) => {
            state.userData = null;
        });
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.userData = payload;
            state.load = true;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, {payload}) => {
            state.load = false
            state.error = payload!.message || null
            state.userData = null;
        });
        builder.addCase(fetchAuth.pending, (state) => {
            state.userData = null;
        });
        builder.addCase(fetchAuth.fulfilled, (state, {payload}) => {
            state.userData = payload;
            state.load = true;
            state.error = null;
        });
        builder.addCase(fetchAuth.rejected, (state, {payload}) => {
            state.load = false
            state.error = payload!.message || null
            state.userData = null;
        });
        builder.addCase(registerUser.pending, (state) => {
            state.userData = null;
        });
        builder.addCase(registerUser.fulfilled, (state, {payload}) => {
            state.userData = payload;
            state.load = true;
            state.error = null;
        });
        builder.addCase(registerUser.rejected, (state, {payload}) => {
            state.load = false
            state.error = payload!.message || null
            state.userData = null;
        });
        builder.addCase(updateUser.fulfilled, (state, {payload}) => {
            state.userData = payload;
            state.load = true;
            state.error = null;
        });
        builder.addCase(updateUser.rejected, (state, {payload}) => {
            state.load = false
            state.error = payload!.message || null
            state.userData = null;
        });

        // builder.addMatcher(isError, (state, action: PayloadAction<ErrorType>) => {
        //     state.load = false
        //     state.error = action.payload.message
        // });
    }
})

// function isError(action: AnyAction) {
//     return action.type.endsWith('rejected');
// }

export const {setAvatar, logout} = userSlice.actions;
export default userSlice.reducer;