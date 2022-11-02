import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface searchDataType {
    searchOpen: boolean
    load: boolean
    fromPage: string
}

const initialState: searchDataType = {
    searchOpen: false,
    load: false,
    fromPage: '/'
};

const searchSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSearch(state) {
            state.searchOpen = !state.searchOpen;
        },
        closeSearch(state) {
            state.searchOpen = false;
        },
        setFromPage(state, {payload}:PayloadAction<string>) {
            state.fromPage = payload;
        },
    },
})



export const {toggleSearch,closeSearch,setFromPage} = searchSlice.actions;
export default searchSlice.reducer;