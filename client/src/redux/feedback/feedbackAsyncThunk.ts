import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FeedbackTypeDb, FeedbackTypeForm } from '../../types/feedbackTypes';
import feedbackService from '../../services/feedbackService';

export const getFeedbackThunk = createAsyncThunk<FeedbackTypeDb[]>('feedbacks/getAll', async () => {
  const dataArr = await feedbackService.getFeedbacks();
  return dataArr;
});

export const addFeedbackThunk = createAsyncThunk<FeedbackTypeDb, FeedbackTypeForm>(
  'feedbacks/addFeedback',
  async (dataform) => {
    const newFeedback = await feedbackService.addFeedback(dataform);
    return newFeedback;
  },
);

export const deleteFeedbackThunk = createAsyncThunk<FeedbackTypeDb['id'], FeedbackTypeDb['id']>(
  'feedbacks/delete',
  async (id) => {
    await feedbackService.deleteFeedback(id);
    return id;
  },
);

export const updateFeedbackThunk = createAsyncThunk<
  FeedbackTypeDb,
  { id: FeedbackTypeDb['id']; dataForm: FeedbackTypeForm }
>('feedbacks/update', async ({ id, dataForm }) => {
  const updateFeedback = await feedbackService.updateFeedback(id, dataForm);
  return updateFeedback;
});

export const getFeedbackByIdThunk = createAsyncThunk(
  'feedbacks/getFeedbackById',
  async (id: FeedbackTypeDb['id']) => {
    const result = await feedbackService.geteedbackById(id);
  return result
  },
);
