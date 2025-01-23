import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider,  CircularProgress, Stack, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import ContactFormModal from '../ContactFormModal/ContactFormModal';
import useBuildings from '../../../hooks/useBuildings';
import styles from './OneApartmentCard.module.css'; 

export default function OneApartmentCard(): React.JSX.Element {
  const oneApartment = useAppSelector((store) => store.appartments.oneAppartment);
  const { buildings } = useBuildings();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [condit, setCondit] = useState(oneApartment?.reservation);
  const [loading, setLoading] = useState(true)
  const oneBuilding = buildings.find((building) => building.id === oneApartment?.buildingId);

  const images = [
    `http://localhost:3000/img/${oneApartment?.img}`,
    `http://localhost:3000/img/${oneBuilding?.img}`,
    `http://localhost:3000/img/img191.jpg`,
    `http://localhost:3000/img/img321.jpg`,
    `http://localhost:3000/img/img37.jpg`,
  ];

  useEffect(() => {
    if (oneApartment) setLoading(false); 
  }, [oneApartment]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCondit(oneApartment?.reservation);
  }, [oneApartment]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="inherit" />
    </Stack>
      </Box>
    );
  }

return (
    <Box>
      <Box className={styles.cardContainer}>
        <Box className={styles.apartmentImageContainer}>
          <Button
            onClick={() => navigate('/apartments')}
            className={styles.backButton}
          >
            <ArrowBackIcon sx={{ mr: 1 }} />
            Выбрать квартиру
          </Button>

          <Box className={styles.mediaBox} >
          <Carousel
              className={styles.carouselFadeIn}
              animation="slide"
              autoPlay={false}
              indicators={false}
              navButtonsAlwaysVisible
            >
              {images.map((src) => (
                <Paper className={styles.carouselImage}
                >
                  <Box className={styles.boxInCarousel}
                    component="img"
                    src={src}
                    alt="Apartment Image"
                  />
                </Paper>
              ))}
            </Carousel>
 </Box>
        </Box>
        <Box className={styles.detailsContainer}>
          <Box className={styles.detailsText}>
          {oneBuilding && (
  <Typography variant="h5" className={styles.title}>
    {oneBuilding.name} / ЭТАЖ {oneApartment?.floor} из {oneBuilding.floorQuantity}
  </Typography>
)}

          <Divider sx={{ my: 2 }} />

          <Typography  className={styles.price}>
            {oneApartment?.square} м²
          </Typography>

          <Box className={styles.dedlineContainer} >
            <Box className={styles.dedlineContainer}>
              <Typography className={styles.dedlineText} >
                CРОК СДАЧИ
              </Typography>
              <Typography className={styles.dedlineText2} variant="h4">{oneApartment?.deadline}</Typography>
            </Box>
            <Box className={styles.roomsQuantity} >
              <Typography className={styles.roomsQuantityText} >
                <br />
                КОЛИЧЕСТВО КОМНАТ
              </Typography>
              <Typography className={styles.roomsQuantityText2} variant="h4">{oneApartment?.roomsQuantity}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box className={styles.priceContainer} >
            <Box className={styles.price} >
              <Typography className={styles.priceText}>{(Number(oneApartment?.price) * Number(oneApartment?.square)).toLocaleString('ru-RU')} ₽</Typography>

            </Box>

            <Box className={styles.pricePerM2Container} >
              <Typography className={styles.pricePerM2} >
                СТОИМОСТЬ ЗА М<sup style={{ fontSize: '0.8em' }}>2</sup>
              </Typography>
              <Typography className={styles.pricePerM2Text} variant="h4">
                {oneApartment?.price.toLocaleString()} ₽
              </Typography>
            </Box>
          </Box>
          {condit ? (
            <Box className={styles.reservedButton}>
              ЗАБРОНИРОВАНО
            </Box>
          ) : (
            <Button
              className={styles.bookButton}
              onClick={() => setShowModal((prev) => !prev)}
            >
              ЗАБРОНИРОВАТЬ
            </Button>
          )}
        </Box>
        </Box>
      </Box>
      <ContactFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        oneApartment={oneApartment || undefined}
      />
    </Box>
  );
}

