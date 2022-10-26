import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios";
import {AxiosError, AxiosResponse} from "axios";
import {catalogType, ErrorType} from "./types";


interface catalogDataType {
    catalogData: catalogType[] | null
    errorCatalog: string | null
    loadCatalog: boolean
}

const initialState: catalogDataType = {
    catalogData: null,
    errorCatalog: null,
    loadCatalog: false
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
    reducers: {
        addEntryCatalog(state, {payload}: PayloadAction<catalogType>) {
           if(state.catalogData === null){
               state.catalogData = []
               state.catalogData.push(payload);
           } else {
               state.catalogData.push(payload);
           }
        },
        updateEntryCatalog(state, {payload}: PayloadAction<catalogType>) {
            if(state.catalogData !== null){
                state.catalogData.forEach((item, index) => {
                    if(item.mt_id === payload.mt_id){
                        state.catalogData![index] = payload
                    }
                })
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchCatalog.pending, (state) => {
            state.catalogData = null;
        });
        builder.addCase(fetchCatalog.fulfilled, (state, {payload}) => {
            state.catalogData = payload;
            state.loadCatalog = true;
            state.errorCatalog = null;
        });
        builder.addCase(fetchCatalog.rejected, (state, {payload}) => {
                state.loadCatalog = false
                state.errorCatalog = payload!.message || null
                state.catalogData = null;
        });
        // builder.addMatcher(isError, (state, action: PayloadAction<ErrorType>) => {
        //     state.loadCatalog = false
        //     console.log(action);
        //     state.errorCatalog = action.payload.message
        // });
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export const {addEntryCatalog, updateEntryCatalog} = catalogSlice.actions;
export default catalogSlice.reducer;