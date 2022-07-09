import { createAsyncThunk } from '@reduxjs/toolkit';

const loadJson = (num) => {
  return new Promise((res, rej) => {
    import(`../../API/CONTENTLISTINGPAGE-PAGE${num}.json`)
      .then((data) => {
        res(data?.default);
      })
      .catch((e) => {
        rej(e);
      });
  });
};

export const fetchDataByPage = createAsyncThunk(
  'api/fetchDataByPage',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const num = state.default.page;
    try {
      const { page } = await loadJson(num);
      const responseData = page['content-items']?.content ?? [];
      const data = responseData.map((elem) => {
        return {
          name: elem.name,
          image: elem['poster-image']
        };
      });
      return { title: page?.title, data: data };
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);
