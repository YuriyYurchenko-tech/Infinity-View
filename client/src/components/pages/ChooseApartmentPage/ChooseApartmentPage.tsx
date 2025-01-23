import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import { useAppSelector } from '../../../hooks/hooks';
import type { RootState } from '../../../redux/store';
import ApartmentCard from '../../ui/ApartmentCard/ApartmentCard';
import useAppartments from '../../../hooks/useAppartment';
import ApartmentFilter from '../../ui/ApartmentFilter/ApartmentFilter';
import styles from './ChooseApartmentPage.module.css';

export default function ChooseApartmentPage(): React.JSX.Element {
  const { appartments } = useAppartments();
  const [visibleCount, setVisibleCount] = useState(30);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 30);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { priceRange, areaRange, floor, roomsQuantity } = useAppSelector(
    (state: RootState) => state.apartmentFilters,
  );

  const filteredApartments = appartments.filter((el) => {
    const isPriceInRange = el.price * el.square >= priceRange[0] && el.price * el.square <= priceRange[1];
    const isAreaInRange = el.square >= areaRange[0] && el.square <= areaRange[1];
    const isFloorInRange = el.floor >= floor[0] && el.floor <= floor[1];
    
    const isRoomsQuantityMatch = roomsQuantity === null || 
                                  (roomsQuantity >= 3 ? el.roomsQuantity >= 3 : el.roomsQuantity === roomsQuantity);

    return isPriceInRange && isAreaInRange && isFloorInRange && isRoomsQuantityMatch;
  });

  return (
    <Box className={styles.container}>
      <ApartmentFilter />
      <Box className={classNames(
        styles.filterContainer,
        filteredApartments.length < 5 ? styles.fullHeight : styles.autoHeight
      )}>
        <div className={styles.apartments_cards}>
          {filteredApartments.length > 0 ? (
            filteredApartments.slice(0, visibleCount).map((el) => (
              <ApartmentCard key={el.id} appartment={el}/>
            ))
          ) : (
            <div className={styles.notFoundText}>
              <h2>Квартиры не найдены</h2>
              <p>К сожалению, по вашему запросу подходящих квартир не найдено.</p>
            </div>
          )}
        </div>
        {filteredApartments.length > 0 && visibleCount < filteredApartments.length && (
          <Button onClick={loadMore} className={styles.loadMoreButton}>
            Загрузить ещё
          </Button>
        )}
      </Box>
    </Box>
  );
}
