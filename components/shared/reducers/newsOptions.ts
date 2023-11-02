import store, { RootState } from '@/lib/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NewsOptions } from './types';

const initialState: NewsOptions = {
  categories: [],
  languages: [],
  countries: [],
};

const slice = createSlice({
  name: 'newsOptions',
  initialState,
  reducers: {
    changeNewsOption(
      state,
      {
        payload: { field, action, value },
      }: PayloadAction<{
        field: 'categories' | 'languages' | 'countries';
        action: 'add' | 'remove';
        value: string;
      }>
    ) {
      if (action === 'add') state = { ...state, [field]: [...(state?.[field] || []), value] };
      else if (action === 'remove')
        state = { ...state, [field]: (state?.[field] || []).filter((el) => el !== value) };
      return state;
    },
  },
});

export default slice.reducer;
export const { changeNewsOption } = slice.actions;
export const selectNewsOptions = (state: RootState) => state.newsOptions;
