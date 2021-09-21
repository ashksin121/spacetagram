import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export interface DataItemState {
    copyright: string | null;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
    thumbnail_url: string | null;
    isFavourite: boolean | null;
}

interface DashboardState {
    isLoading: boolean;
    data: DataItemState[];
    isError: boolean;
}

const initialState: DashboardState = {
    isLoading: false,
    data: [],
    isError: false,
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        getData: (state) => {
            state.isLoading = true;
        },
        getDataSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.data = payload;
            state.isError = false;
        },
        getDataError: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        toggleFav: (state, { payload }) => {
            state.data[payload].isFavourite = !state.data[payload].isFavourite;
        },
    },
});

export const { getData, getDataSuccess, getDataError, toggleFav } =
    dashboardSlice.actions;

export default dashboardSlice.reducer;

export function fetchData() {
    return async (dispatch: any) => {
        dispatch(getData());
        // const dateTo = moment().format("YYYY-MM-DD");
        const dateFrom = moment().subtract(9, "d").format("YYYY-MM-DD");
        try {
            const response = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=cjCXYMhOBoS84eDFj2hQc7A3yhmilH6vAutIG04Y&start_date=${dateFrom}&thumbs=true`
            );
            const data = (await response.json()) as DataItemState[];
            const reversedData = data.reverse();
            const dataList = reversedData.map((dataObj) => ({
                ...dataObj,
                isFavourite: false,
            }));
            dispatch(getDataSuccess(dataList));
        } catch (error) {
            dispatch(getDataError());
        }
    };
}

export function toggleFavourite(date: string) {
    return async (dispatch: any, getState: any) => {
        let data = getState().dashboard.data as DataItemState[];
        const idx = data.findIndex((obj) => obj.date === date);
        dispatch(toggleFav(idx));
    };
}
