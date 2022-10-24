import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios";
import {AxiosError, AxiosResponse} from "axios";
import {catalogType, ErrorType} from "./types";


interface catalogDataType {
    catalogData: catalogType[] | null
    error: string | null
    load: boolean
}

const initialState: catalogDataType = {
    catalogData: null,
    error: null,
    load: false
};


export const fetchCatalog = createAsyncThunk<catalogType[], void, { rejectValue: ErrorType }>(
    'catalog/fetchCatalog', async (_arg, {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/profile/get') as AxiosResponse<{ success: boolean, data: catalogType[] }>;
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


const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCatalog.pending, (state) => {
            state.catalogData = null;
        });
        builder.addCase(fetchCatalog.fulfilled, (state, {payload}) => {
            state.catalogData = payload;
            state.load = true;
            state.error = null;
        });
        builder.addMatcher(isError, (state, action: PayloadAction<ErrorType>) => {
            state.load = false
            console.log(action);
            state.error = action.payload.message
        });
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

// export const {setAvatar} = catalogSlice.actions;
export default catalogSlice.reducer;