import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QuerySearch = {
  query: string;
};

const initialState: QuerySearch = {
  query: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload.trim();
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
