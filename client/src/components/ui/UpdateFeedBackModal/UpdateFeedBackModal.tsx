import React, { useState } from 'react';
import { Button, Modal, Box, Typography, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import useFeedback from '../../../hooks/useFeedback';
import { setModalFeedback } from '../../../redux/feedback/feedbackSlice';
import { updateFeedbackThunk } from '../../../redux/feedback/feedbackAsyncThunk';
import type { FeedbackTypeForm } from '../../../types/feedbackTypes';
import styles from './UpdateFeedBackModal.module.css';

export default function UpdateFeedBackModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentFeedback = useAppSelector((store) => store.feedbacks.currentFeedback);
  const handleClose = () => dispatch(setModalFeedback(null));
  const { deleteHandler } = useFeedback();
  const [status, setStatus] = useState(currentFeedback?.status || false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value === 'true');
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataForm = Object.fromEntries(formData) as unknown as FeedbackTypeForm;
    if (currentFeedback) {
      await dispatch(updateFeedbackThunk({ id: currentFeedback.id, dataForm }));
      handleClose();
    }
  };

  const handleDelete = () => {
    if (currentFeedback) {
      deleteHandler(currentFeedback.id);
      handleClose();
    }
  };

  return (
    <Modal open={!!currentFeedback} onClose={handleClose}>
      <Box className={styles.modalContainer}>
        <Box className={styles.header}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Изменить
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Имя"
            name="name"
            defaultValue={currentFeedback?.name}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="EMAIL"
            name="email"
            defaultValue={currentFeedback?.email}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Телефон"
            name="phone"
            defaultValue={currentFeedback?.phone}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Сообщение"
            name="message"
            defaultValue={currentFeedback?.message}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
            Статус
          </Typography>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="status"
                value="true"
                checked={status === true}
                onChange={handleStatusChange}
              />
              Дозвонились
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="status"
                value="false"
                checked={status === false}
                onChange={handleStatusChange}
              />
              Позвонить
            </label>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" className={styles.button}>
              Сохранить
            </Button>
          </Box>
        </form>

        <Box className={styles.buttonContainer}>
          {!showDeleteConfirmation ? (
            <Button
              variant="contained"
              onClick={() => setShowDeleteConfirmation(true)}
              className={styles.buttonDelete}
            >
              Удалить
            </Button>
          ) : (
            <div className={styles.deleteConfirmation}>
              <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
                Да, удалить
              </Button>
              <Button
                variant="contained"
                onClick={() => setShowDeleteConfirmation(false)}
                className={styles.buttonClose}
              >
                Отменить
              </Button>
            </div>
          )}
          <Button variant="contained" onClick={() => [handleClose(), setShowDeleteConfirmation(false)]} className={styles.buttonClose}>
            Закрыть
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
