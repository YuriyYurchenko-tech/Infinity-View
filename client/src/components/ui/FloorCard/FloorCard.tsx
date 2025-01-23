import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, CardMedia, Modal } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Paper from '@mui/material/Paper';
import type { FloorTypeDb } from '../../../types/floorTypes';
import styles from './FloorCard.module.css';

type FloorCardPropsTypes = {
  floor: FloorTypeDb;
};

export default function FloorCard({ floor }: FloorCardPropsTypes): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className={styles.card}>
      <CardContent>
        <Box className={styles.infoBox}>
          <Box className={styles.headerBox}>
            <Box sx={{ padding: '10px' }}>
              <Box>ЭТАЖ</Box>
              <Box>Блок</Box>
            </Box>
            <Box className={styles.commercyCard}>
              <Box>{floor?.floorDiapason}</Box>
              <Box>{floor?.building}</Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Box className={styles.imageBox}>
        <CardMedia
          component="img"
          image={`http://localhost:3000/img/${floor?.img}`}
          alt="Floor image"
          className={styles.cardImage}
          onClick={handleOpen}
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={styles.modal}
      >
        <Box className={styles.modalStyle}>
          <Box onClick={handleClose} className={styles.closeButton}>
            &#10006;
          </Box>
          <Carousel
            className={styles.carousel}
            animation="slide"
            autoPlay={false}
            indicators={false}
            navButtonsAlwaysVisible
          >
            <Paper className={styles.carouselImage}>
              <Box
                component="img"
                src={`http://localhost:3000/img/${floor?.img}`}
                alt="Apartment Image"
                className={styles.modalImage}
              />
            </Paper>
            <Paper className={styles.carouselImage}>
              <Box
                component="img"
                src={`http://localhost:3000/img/${floor?.img2}`}
                alt="Apartment Image"
                className={styles.modalImage}
              />
            </Paper>
          </Carousel>
        </Box>
      </Modal>
    </Card>
  );
}
