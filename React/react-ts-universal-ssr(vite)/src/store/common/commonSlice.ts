import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateType {
  loading: boolean;
}

const initialState: StateType = {
  loading: false,
};

const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    setLoadingStatus(state, action: PayloadAction<{status: boolean}>){
      state.loading = action.payload.status;
    },
  },
});

export const { setLoadingStatus } = commonSlice.actions;

export default commonSlice.reducer;
