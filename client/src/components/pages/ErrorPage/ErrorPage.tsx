import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img 
        src="http://localhost:3000/img/404.jpg" 
        alt="Error" 
        className={styles.image}
      />
      
      <Button 
        variant="contained" 
        color="primary"
        className={styles.button}
        onClick={() => navigate('/')}
      >
        Назад на главную
      </Button>
    </div>
  );
}
