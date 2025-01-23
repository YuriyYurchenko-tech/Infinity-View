import type { ChangeEvent } from 'react';
import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Box,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import type { RootState } from '../../../redux/store';
import {
  setPriceRange,
  setAreaRange,
  setFloor,
  setRooms,
  resetAppartmentFilters,
} from '../../../redux/appartment/appartmentFiltersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import styles from './ApartmentFilter.module.css';

export default function ApartmentFilter(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { priceRange, areaRange, floor, roomsQuantity } = useAppSelector(
    (state: RootState) => state.apartmentFilters,
  );

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    dispatch(setPriceRange(newValue as [number, number]));
  };

  const handleAreaChange = (_: Event, newValue: number | number[]) => {
    dispatch(setAreaRange(newValue as [number, number]));
  };

  const handleFloorChange = (_: Event, newValue: number | number[]) => {
    dispatch(setFloor(newValue as [number, number]));
  };

  const handleRoomsChange = (event: any) => {
    dispatch(setRooms(event.target.value as number));
  };

  const handleResetFilters = () => {
    dispatch(resetAppartmentFilters());
  };

  const handleManualInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: 'priceRange' | 'areaRange' | 'floor',
    index: number,
  ) => {
    const value = Number(event.target.value);
    if (field === 'priceRange') {
      const updatedRange = [...priceRange] as [number, number];
      updatedRange[index] = value;
      dispatch(setPriceRange(updatedRange));
    } else if (field === 'areaRange') {
      const updatedRange = [...areaRange] as [number, number];
      updatedRange[index] = value;
      dispatch(setAreaRange(updatedRange));
    } else if (field === 'floor') {
      const updatedRange = [...floor] as [number, number];
      updatedRange[index] = value;
      dispatch(setFloor(updatedRange));
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5" gutterBottom className={styles.title}>
        Фильтры
      </Typography>

      <Box className={styles.rows}>

      <Box className={styles.firstRow}>

      <Box className={styles.sliderContainer}>
        <Typography variant="subtitle1">Цена</Typography>
        <Slider
          className={styles.slider}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={40000000}
          valueLabelFormat={(value) => `${value.toLocaleString()} ₽`}
          classes={{
            thumb: styles.sliderThumb,
            track: styles.sliderTrack,
            rail: styles.sliderRail,
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <TextField
            value={priceRange[0]}

            onChange={(e: ChangeEvent<HTMLInputElement>) => handleManualInputChange(e, 'priceRange', 0)}

            label="От"
            variant="outlined"
            type="number"
            slotProps={{
              input: {
                className: styles.textFieldInput,
                classes: {
                  notchedOutline: styles.outline,
                },
              },
              inputLabel: {
                className: styles.textFieldLabel,
              },
            }}
          />
          <TextField
            value={priceRange[1]}

            onChange={(e: ChangeEvent<HTMLInputElement>) => handleManualInputChange(e, 'priceRange', 1)}

            label="До"
            variant="outlined"
            type="number"
            slotProps={{
              input: {
                className: styles.textFieldInput,
                classes: {
                  notchedOutline: styles.outline,
                },
              },
              inputLabel: {
                className: styles.textFieldLabel,
              },
            }}
          />
        </Box>
      </Box>

      <Box className={styles.sliderContainer}>
        <Typography variant="subtitle1">
          Площадь (м<sup>2</sup>)
        </Typography>
        <Slider
          className={styles.slider}
          value={areaRange}
          onChange={handleAreaChange}
          valueLabelDisplay="auto"
          min={30}
          max={140}
          classes={{
            thumb: styles.sliderThumb,
            track: styles.sliderTrack,
            rail: styles.sliderRail,
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <TextField
            value={areaRange[0]}

            onChange={(e: ChangeEvent<HTMLInputElement>) => handleManualInputChange(e, 'areaRange', 0)}

            label="От"
            variant="outlined"
            type="number"
            slotProps={{
              input: {
                className: styles.textFieldInput,
                classes: {
                  notchedOutline: styles.outline,
                },
              },
              inputLabel: {
                className: styles.textFieldLabel,
              },
            }}
          />
          <TextField
            value={areaRange[1]}

            onChange={(e: ChangeEvent<HTMLInputElement>) => handleManualInputChange(e, 'areaRange', 1)}

            label="До"
            variant="outlined"
            type="number"
            slotProps={{
              input: {
                className: styles.textFieldInput,
                classes: {
                  notchedOutline: styles.outline,
                },
              },
              inputLabel: {
                className: styles.textFieldLabel,
              },
            }}
          />
        </Box>
      </Box>
      </Box>

      <Box className={styles.secondRow}>

      <Box className={styles.sliderContainer}>
        <Typography variant="subtitle1">Этаж</Typography>
        <Slider
          className={styles.slider}
          value={floor}
          onChange={handleFloorChange}
          valueLabelDisplay="auto"
          min={1}
          max={17}
          classes={{
            thumb: styles.sliderThumb,
            track: styles.sliderTrack,
            rail: styles.sliderRail,
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <TextField
            value={floor[0]}

            onChange={(e: ChangeEvent<HTMLInputElement>) => handleManualInputChange(e, 'floor', 0)}

            label="От"
            variant="outlined"
            type="number"
            slotProps={{
              input: {
                className: styles.textFieldInput,
                classes: {
                  notchedOutline: styles.outline,
                },
              },
              inputLabel: {
                className: styles.textFieldLabel,
              },
            }}
          />
          <TextField
            value={floor[1]}

            onChange={(e: ChangeEvent<HTMLInputElement>) => handleManualInputChange(e, 'floor', 1)}

            label="До"
            variant="outlined"
            type="number"
            slotProps={{
              input: {
                className: styles.textFieldInput,
                classes: {
                  notchedOutline: styles.outline,
                },
              },
              inputLabel: {
                className: styles.textFieldLabel,
              },
            }}
          />
        </Box>
      </Box>

      <Box className={styles.sliderContainer}>
        <FormControl fullWidth className={styles.selectControl}>
          <InputLabel className={styles.selectLabel}>Количество комнат</InputLabel>
          <Select
            value={roomsQuantity}
            onChange={handleRoomsChange}
            className={styles.selectOutline}
            label="Количество комнат"
          >
            <MenuItem value={1} className={styles.menuItem}>
              1
            </MenuItem>
            <MenuItem value={2} className={styles.menuItem}>
              2
            </MenuItem>
            <MenuItem value={3} className={styles.menuItem}>
              3+
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      </Box>
      </Box>
        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '20px', marginBottom: '20px', transition: 'color 0.3s, transform 0.3s', '&:hover': {
      color: '#a1978a', 
      fontSize: '40px',
      transform: 'scale(1.1)' }} }>
          <RefreshIcon fontSize="large" className={styles.icon} onClick={handleResetFilters} /> 
          <Typography onClick={handleResetFilters} sx={{cursor: 'pointer'}}>СБРОСИТЬ ФИЛЬТРЫ</Typography>
        </Typography>
    </Box>
  );
}
