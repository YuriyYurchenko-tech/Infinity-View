import React, { useEffect, useRef, useCallback  } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom';
import OneApartmentCard from '../../ui/OneApartmentCard/OneApartmentCard';
import type { AppartmentTypeDb } from '../../../types/appartmentTypes';
import useAppatments from '../../../hooks/useAppartment';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { getAppartmentByIdThunk } from '../../../redux/appartment/appartmentAsyncThunk';
import ApartmentAlikeCard from '../../ui/ApartmentAlikeCard/ApartmentAlikeCard';
import styles from './OneApartmentPage.module.css';

export default function OneApartmentPage(): React.JSX.Element {
  const oneApartment = useAppSelector((store) => store.appartments.oneAppartment);
  const { appartments } = useAppatments();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const apartmentId = id ? parseInt(id, 10) : undefined;
    if (apartmentId) {
      void dispatch(getAppartmentByIdThunk(apartmentId));
    }
    window.scrollTo(0, 0);
  }, [id]);

  const shuffleArray = (array: AppartmentTypeDb[]) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const filteredApartments = appartments.filter((el) => {
    const price = oneApartment?.price ?? 0;
    const square = oneApartment?.square ?? 0;
  
    return (
      (el.price >= price * square - 2000000 &&
        el.price <= price * square + 2000000 &&
        el.id !== oneApartment?.id) ||
      (el.square >= square - 5 && el.square <= square + 5 && el.id !== oneApartment?.id)
    );
  });
  
  

  const randomApartments = shuffleArray(filteredApartments);

  const scrollLeft = useCallback(() => {
    const scrollAmount = window.innerWidth <= 850 ? -265 : -600;
    if (scrollRef.current) scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  const scrollRight = useCallback(() => {
    const scrollAmount = window.innerWidth <= 850 ? 265 : 600;
    if (scrollRef.current) scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  return (
    <>
      <OneApartmentCard />
      <Box className={styles.similarApartmentsContainer}>
        <Box className={styles.similarAnimation}>
          <Box className={styles.similarTitle}>Похожие объявления</Box>
          <Box className={styles.carouselContainer}>
            <IconButton onClick={scrollLeft} className={styles.iconButtonLeft}>
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>

            <Box ref={scrollRef} className={styles.scrollWrapper}>
              {randomApartments.slice(0, 30).map((el) => (
                <ApartmentAlikeCard key={el.id} appartment={el}/>
              ))}
            </Box>

            <IconButton onClick={scrollRight} className={styles.iconButtonRight}>
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
