import React from 'react';

import { Box, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';

import type { SelectChangeEvent } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { RootState } from '../../../redux/store';
import { setBlocks, resetFilters } from '../../../redux/floorType/floorTypeFiltersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import styles from './CommercyFilter.module.css';

export default function CommercyFilter(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { block } = useAppSelector((state: RootState) => state.floorTypeFilters);

  const handleBlockChange = (event: SelectChangeEvent<string>) => {

    dispatch(setBlocks(event.target.value as string));

  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <Box className={styles.container}>
      <Box>
        <FormControl fullWidth className={styles.selectControl}>
          <InputLabel id="demo-simple-select-label" className={styles.selectLabel}>
            Выбрать блок
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={block ?? ''}
            label="Выбрать блок"
            onChange={handleBlockChange}

            className={styles.customSelect}

          >
            <MenuItem value="А1" className={styles.menuItem}>
              А1
            </MenuItem>
            <MenuItem value="А2" className={styles.menuItem}>
              А2
            </MenuItem>
            <MenuItem value="Б1" className={styles.menuItem}>
              Б1
            </MenuItem>
            <MenuItem value="Б2" className={styles.menuItem}>
              Б2
            </MenuItem>
            <MenuItem value="Б3" className={styles.menuItem}>
              Б3
            </MenuItem>
            <MenuItem value="Г1" className={styles.menuItem}>
              Г1
            </MenuItem>
            <MenuItem value="Г2" className={styles.menuItem}>
              Г2
            </MenuItem>
            <MenuItem value="Г3" className={styles.menuItem}>
              Г3
            </MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginTop: '20px', marginBottom: '20px', transition: 'color 0.3s, transform 0.3s', width: '200px', '&:hover': {
      color: '#a1978a',  // Цвет текста при наведении
      transform: 'scale(1.1)' }} }>
          {/* <Button sx={{backgroundColor: 'white', color: 'black', fontWeight: 600, fontSize: '12px'}}> */}
          <RefreshIcon fontSize="large" className={styles.icon} onClick={handleResetFilters} /> 
          <Typography onClick={handleResetFilters} sx={{cursor: 'pointer'}}>СБРОСИТЬ ФИЛЬТРЫ</Typography>
          {/* </Button> */}
        </Box>
      </Box>
      <Typography variant="h6" gutterBottom className={styles.contactInfo}>
        Свяжитесь с нами для получения дополнительной информации:
        <Typography variant="h6" className={styles.phoneNumber}>
          <a href="tel:+79287233353" style={{ textDecoration: 'none', color: 'white', fontSize:'20px' }}>
            +7 (928) 717-88-83
          </a>
        </Typography>
      </Typography>
    </Box>
  );
}
