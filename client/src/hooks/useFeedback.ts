import type React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  addFeedbackThunk,
  deleteFeedbackThunk,
  getFeedbackThunk,
} from '../redux/feedback/feedbackAsyncThunk';
import type { FeedbackTypeDb, FeedbackTypeForm } from '../types/feedbackTypes';

type UseFeedbackTypes = {
  feedbacks: FeedbackTypeDb[];
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: FeedbackTypeDb['id']) => void;
};

export default function useAppatments(): UseFeedbackTypes {
  const feedbacks = useAppSelector((store) => store.feedbacks.feedbacks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getFeedbackThunk());
  }, []);

  const deleteHandler = (id: FeedbackTypeDb['id']): void => {
    void dispatch(deleteFeedbackThunk(id));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const dataForm: FeedbackTypeForm = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        message: formData.get('message') as string,
    };

    void dispatch(addFeedbackThunk(dataForm));
    e.currentTarget.reset();
};
  return { feedbacks, submitHandler, deleteHandler };
}
