import React, { useState } from 'react';
import { Button, Modal, Box, Typography, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import type { AppartmentTypeForm } from '../../../types/appartmentTypes';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { updateAppartmentThunk } from '../../../redux/appartment/appartmentAsyncThunk';
import { setModal } from '../../../redux/appartment/appartmentSlice';
import useAppatments from '../../../hooks/useAppartment';
import styles from './UpdateModal.module.css';

export default function UpdateModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentAppartment = useAppSelector((store) => store.appartments.currentAppartment);
  const handleClose = () => dispatch(setModal(null));
  const { deleteHandler } = useAppatments();
  const [reservation, setReservation] = useState(currentAppartment?.reservation || false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleReservationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReservation(event.target.value === 'true');
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataForm = Object.fromEntries(formData) as unknown as AppartmentTypeForm;
    dataForm.reservation = reservation;
    if (currentAppartment) {
      await dispatch(updateAppartmentThunk({ id: currentAppartment?.id, dataForm }));
      handleClose();
    }
  };

  const handleDelete = () => {
    if (currentAppartment) {
      deleteHandler(currentAppartment.id);
      handleClose();
    }
  };

  return (
    <Modal open={!!currentAppartment} onClose={() => [handleClose(), setShowDeleteConfirmation(false)]}>
      <Box className={styles.modalContainer}>
        <Box className={styles.modalHeader}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Изменить
          </Typography>
          <IconButton onClick={() => [handleClose(), setShowDeleteConfirmation(false)]}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form className={styles.modalForm} onSubmit={handleUpdate}>
          <TextField
            label="Площадь"
            name="square"
            defaultValue={currentAppartment?.square}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Этаж"
            name="floor"
            defaultValue={currentAppartment?.floor}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Количество комнат"
            name="roomsQuantity"
            defaultValue={currentAppartment?.roomsQuantity}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Срок сдачи"
            name="deadline"
            defaultValue={currentAppartment?.deadline}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Цена за м²"
            name="price"
            defaultValue={currentAppartment?.price}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
            Бронь
          </Typography>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="reservation"
                value="true"
                checked={reservation === true}
                onChange={handleReservationChange}
              />
              Да
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="reservation"
                value="false"
                checked={reservation === false}
                onChange={handleReservationChange}
              />
              Нет
            </label>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ mb: 2, backgroundColor: "#0e2536" }}>
              Сохранить
            </Button>
          </Box>
        </form>

        <Box className={styles.buttonContainer}>
          {!showDeleteConfirmation ? (
            <Button
              variant="contained"
              onClick={() => setShowDeleteConfirmation(true)}
              sx={{ mt: 2, ml: 2, backgroundColor: '#ce5c5c' }}
            >
              Удалить
            </Button>
          ) : (
            <div className={styles.confirmationContainer}>
              <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
                Да, удалить
              </Button>
              <Button
                variant="contained"
                onClick={() => setShowDeleteConfirmation(false)}
                sx={{ mt: 2, backgroundColor: 'grey' }}
              >
                Отменить
              </Button>
            </div>
          )}

          <Button variant="contained" onClick={() => [handleClose(), setShowDeleteConfirmation(false)]} sx={{ mt: 2, mr: 2, backgroundColor: 'grey' }}>
            Закрыть
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
