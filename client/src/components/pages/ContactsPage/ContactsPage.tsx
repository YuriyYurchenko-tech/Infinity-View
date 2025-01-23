import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Carousel from 'react-material-ui-carousel';
import InstagramIcon from '@mui/icons-material/Instagram';
import ContactFormModal from '../../ui/ContactFormModal/ContactFormModal';
import styles from './ContactsPage.module.css';

export default function ContactsPage(): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(window.innerWidth >= 600);

  const images = [
    {
      src: 'https://sun9-30.userapi.com/impg/dCP68CAKdKabIGcfFsL4FwLqTYOtLJil-jIhbQ/W9dmlgY1_1Y.jpg?size=2560x1440&quality=96&sign=07bdb105f97d6419390860ae71c37824&type=album',
      alt: 'Описание картинки 1',
    },
    {
      src: 'https://sun9-60.userapi.com/impg/w8jcMGBbF3mnmIE3gM_yRSH1NmiUF-9KeKVBtg/V2H7N7Vkwss.jpg?size=2560x1440&quality=96&sign=77e542cfe5a9999babb0ff721b3251eb&type=album',
      alt: 'Описание картинки 2',
    },
    {
      src: 'https://sun9-13.userapi.com/impg/nj6rOFI0bFP2_-gKwboH8U9C85x37xuIcdhWJA/TOdOAVBLvso.jpg?size=2560x1440&quality=96&sign=51e2c9be7083eceb0b7cbd9227f2a532&type=album',
      alt: 'Описание картинки 3',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const mapContainer = document.querySelector(`.${styles.mapContainer}`);
      if (mapContainer && !isMapLoaded) {
        const rect = mapContainer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsMapLoaded(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMapLoaded]);

  return (
    <Box className={styles.container}>
      <Box className={styles.leftPanel}>
        <Carousel
          className={styles.carousel}
          animation="slide"
          interval={10000}
          indicators={false}
          navButtonsAlwaysVisible
        >
          {images.map((item) => (
            <Paper key={item.alt} className={styles.carouselItem}>
              <Box component="img" src={item.src} alt={item.alt} className={styles.carouselImage} />
            </Paper>
          ))}
        </Carousel>

        <Box className={styles.contactDetails}>
          <Box className={styles.iconContainer}>
            <a
              href="https://www.instagram.com/garantstroy_kbr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Открыть профиль в Instagram в новой вкладке"
            >
              <InstagramIcon fontSize="large" className={styles.icon} />
            </a>
          </Box>

          <Typography variant="h6" className={styles.phoneLink}>
            <a className={styles.phone} href="tel:+79287178883">
              +7 (928) 717-88-83
            </a>
          </Typography>
          <Typography className={styles.divider} />
          <Typography variant="h6" className={styles.hours}>
            <Typography color="textSecondary">Часы работы офиса продаж</Typography> Пн - Сб 9:00 -
            18:00
          </Typography>
          <Typography variant="h6" className={styles.address}>
            г. Нальчик, ул. Тарчокова, д. 135
          </Typography>
          <Typography variant="h6" className={styles.email}>
            garant.stroy.07@mail.ru
          </Typography>
          <Button className={styles.button} onClick={() => setShowModal((prev) => !prev)}>
            ЗАКАЗАТЬ ЗВОНОК
          </Button>
        </Box>
      </Box>

      <Box className={styles.mapContainer}>
        <YMaps>
          <Map defaultState={{ center: [43.488032, 43.574085], zoom: 14 }}className={styles.map}>

            <Placemark geometry={[43.488032, 43.574085]} />
          </Map>
        </YMaps>
      </Box>

      <ContactFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        oneApartment={undefined}
      />
    </Box>
  );
}