import React from 'react';
import { Button, DialogContent, DialogTitle, TextField } from '@mui/material';
import useAppartments from '../../../hooks/useAppartment';
import styles from './AddForm.module.css';

export default function AddForm(): JSX.Element {
  const { updateAllPricesHandler } = useAppartments();

  return (
    <>
      <DialogTitle className={styles.submitButtonText}>
        Изменить цену за м<sup style={{ fontSize: '0.6em' }}>2</sup>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={updateAllPricesHandler}>
          <TextField name="newPrice" type="number" label="Новая цена" fullWidth sx={{ mb: 2 }} />
          <Button
            className={styles.submitButton}
            type="submit"
          >
            Обновить цену
          </Button>
        </form>
      </DialogContent>
    </>
  );
}

