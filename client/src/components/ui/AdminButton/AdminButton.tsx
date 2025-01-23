import React from 'react';
import Button from '@mui/material/Button';
import type { BuildingType } from '../../../types/buildingTypes';
import styles from './AdminButton.module.css';

type AdminButtonPropsTypes = {
  build: BuildingType;
};

export default function AdminButton({ build }: AdminButtonPropsTypes): React.JSX.Element {
  return (
    <Button className={styles.adminButton} sx={{ my: 2 }}>
      {build.name}
    </Button>
  );
}
