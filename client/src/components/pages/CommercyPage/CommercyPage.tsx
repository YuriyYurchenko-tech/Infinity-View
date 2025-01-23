import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import classNames from 'classnames';
import type { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../hooks/hooks';
import useFloors from '../../../hooks/useFloorTypes';
import CommercyFilter from '../../ui/CommercyFilter/CommercyFilter';
import FloorCard from '../../ui/FloorCard/FloorCard';
import styles from './CommercyPage.module.css';

export default function CommercyPage(): React.JSX.Element {
  const { floors } = useFloors();

  const { block } = useAppSelector((state: RootState) => state.floorTypeFilters);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFloors = floors.filter((el) => {
    const isFloorMatch = block === null || el.building === block;

    return isFloorMatch;
  });

  return (
    <Box
      className={classNames(
        styles.filterContainer,
      )}
    >
      <Box className={styles.commercyFilter}>
        <CommercyFilter />
      </Box>
      <Box>
        <Box className={styles.apartmentsContainer}>
          {filteredFloors.map((el) => (
            <FloorCard key={el.id} floor={el} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
