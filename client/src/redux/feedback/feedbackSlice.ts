import { createSlice } from '@reduxjs/toolkit';
import type { FeedbackTypeDb } from '../../types/feedbackTypes';
import {
  addFeedbackThunk,
  deleteFeedbackThunk,
  getFeedbackByIdThunk,
  getFeedbackThunk,
  updateFeedbackThunk,
} from './feedbackAsyncThunk';

type InitialStateType = {
  feedbacks: FeedbackTypeDb[];
  oneFeedback: FeedbackTypeDb | null;
  currentFeedback: FeedbackTypeDb | null;
};

const initialState: InitialStateType = {
  feedbacks: [],
  oneFeedback: null,
  currentFeedback: null,
};

export const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    setModalFeedback: (state, { payload }: { payload: FeedbackTypeDb | null }) => {
      state.currentFeedback = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedbackThunk.fulfilled, (state, { payload }) => {
      state.feedbacks = payload;
    });
    builder.addCase(addFeedbackThunk.fulfilled, (state, { payload }) => {
      state.feedbacks.push(payload);
    });
    builder.addCase(deleteFeedbackThunk.fulfilled, (state, { payload }) => {
      const index = state.feedbacks.findIndex((el) => el.id === payload);
      state.feedbacks.splice(index, 1);
    });
    builder.addCase(updateFeedbackThunk.fulfilled, (state, { payload }) => {
      const index = state.feedbacks.findIndex((el) => el.id === payload.id);
      if (index >= 0) state.feedbacks[index] = payload;
    });

    builder.addCase(getFeedbackByIdThunk.fulfilled, (state, {payload}) => {
      state.oneFeedback = payload;
    });
  },
});
export const { setModalFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
