import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AddApartmentModal.module.css';
import useAppatments from '../../../hooks/useAppartment';

interface AddApartmentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddApartmentModal({ open, onClose }: AddApartmentModalProps): React.JSX.Element {
  const { submitHandler } = useAppatments();

  return (
    <Dialog open={open} onClose={onClose}>
      <Box className={styles.header}>
        <DialogTitle>Добавить</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <form onSubmit={submitHandler}>
          <TextField name="img" type="file" fullWidth sx={{ mb: 2 }} />
          <TextField name="square" label="Площадь" fullWidth sx={{ mb: 2 }} />
          <TextField name="floor" label="Этаж" fullWidth sx={{ mb: 2 }} />
          <TextField name="roomsQuantity" label="Количество комнат" fullWidth sx={{ mb: 2 }} />
          <TextField name="buildingId" label="Номер корпуса" fullWidth sx={{ mb: 2 }} />
          <TextField name="deadline" label="Срок сдачи" InputLabelProps={{ shrink: true }} fullWidth sx={{ mb: 2 }} />
          <TextField name="price" label="Цена за м²" fullWidth sx={{ mb: 2 }} />
          <DialogActions className={styles.buttonContainer}>
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" className={styles.saveButton} sx={{ mb: 2 }} onClick={onClose}>
                Сохранить
              </Button>
            </Box>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
