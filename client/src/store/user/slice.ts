import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData: null,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

    }
})

// export const {addDownloadFile} = userSlice.actions;

export default userSlice.reducer;