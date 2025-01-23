import React from 'react';
import { Container, Box, TextField, Typography, Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import styles from './LoginAdminPage.module.css'; 

export default function LoginPage(): JSX.Element {
  const { loginHandler } = useAuth();

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Box 
        component="form" 
        onSubmit={loginHandler} 
        className={styles.form}
      >
        <Typography variant="h5" component="h2" className={styles.heading}>
          Вход
        </Typography>
        <TextField 
          label="Email" 
          name="email" 
          type="email" 
          placeholder="name@example.com" 
          className={styles.textField}
          required 
          variant="outlined" 
        />
        <TextField 
          label="Пароль" 
          name="password" 
          type="password" 
          placeholder="Пароль" 
          className={styles.textField}
          required 
          variant="outlined" 
        />
        <Button 
          type="submit" 
          variant="contained" 
          className={styles.button}
        >
          Войти
        </Button>
      </Box>
    </Container>
  );
}
