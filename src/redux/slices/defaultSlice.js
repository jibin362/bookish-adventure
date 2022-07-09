import { createSlice } from '@reduxjs/toolkit';
import { toLower } from 'lodash';
import { fetchDataByPage } from '../thunks/fetchData';

const initialState = {
  search: '',
  title: '',
  data: [],
  dataBackup: [],
  page: 1
};

export const defaultSlide = createSlice({
  name: 'default',
  initialState,
  reducers: {
    searchData: (state, action) => {
      state.search = action.payload;
      const data = state.dataBackup.filter((elem) => {
        return toLower(elem.name).includes(toLower(action.payload));
      });
      state.data = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataByPage.fulfilled, (state, action) => {
        if (action.payload) {
          state.title = action.payload.title;
          state.data = [...state.data, ...action.payload.data];
          state.dataBackup = [...state.data, ...action.payload.data];
          state.page += 1;
        }
      })
      .addCase(fetchDataByPage.rejected, () => {
        console.log('api req failed');
      });
  }
});

// Action creators are generated for each case reducer function
export const { searchData } = defaultSlide.actions;

export default defaultSlide.reducer;
