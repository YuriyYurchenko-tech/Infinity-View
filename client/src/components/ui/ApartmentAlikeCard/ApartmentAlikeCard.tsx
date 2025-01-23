import React from 'react';
import { Box, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';
import { getAppartmentByIdThunk } from '../../../redux/appartment/appartmentAsyncThunk';
import type { AppartmentTypeDb } from '../../../types/appartmentTypes';
import styles from './ApartmentAlikeCard.module.css';

type AppartmentCardPropsTypes = {
  appartment: AppartmentTypeDb;
};

export default function ApartmentAlikeCard({ appartment }: AppartmentCardPropsTypes): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Card
      className={styles.card}
      onClick={() => {
        void dispatch(getAppartmentByIdThunk(appartment.id));
        navigate(`/apartments/${appartment.id}`);
      }}
    >
      <CardContent className={styles.cardContent}>
        <Box className={styles.square}>
          {appartment?.square} м<sup style={{ fontSize: '0.4em', verticalAlign: 'middle' }}>2</sup>
        </Box>
        <Box className={styles.infoContainer}>
          <Box className={styles.labelBox}>
            <Box>ЭТАЖ</Box>
            <Box>КОМНАТЫ</Box>
          </Box>
          <Box>
            <Box>{appartment?.floor}</Box>
            <Box>{appartment?.roomsQuantity}</Box>
          </Box>
        </Box>
      </CardContent>
      <Box className={styles.imageBox}>
        <CardMedia
          component="img"
          image={`http://localhost:3000/img/${appartment?.img}`}
          alt="Apartment image"
          className={styles.image}
        />
      </Box>
      <CardContent className={styles.apartment_one_card_price}>
        <Box className={styles.priceContainer}>{(Number(appartment?.price) * Number(appartment?.square)).toLocaleString('ru-RU')} ₽</Box>
        <Box className={styles.pricePerMeter}>
          {Number(appartment?.price).toLocaleString('ru-RU')} ₽ за м<sup style={{ fontSize: '0.6em' }}>2</sup>
        </Box>
      </CardContent>
    </Card>
  );
}
