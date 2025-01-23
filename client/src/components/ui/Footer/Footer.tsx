import React from 'react';
import { Box, Typography, Grid2 } from '@mui/material';
import styles from './Footer.module.css';

function Footer(): React.JSX.Element {
  return (
    <Box className={styles.footer}>
      {' '}
      <Grid2 className={styles.footerLeft}>
        <Typography className={styles.footerLogo}  >
          Infinity View
        </Typography>
        <Typography className={styles.footerText} >
          © 2024 

        </Typography>
      </Grid2>
      <Grid2 className={styles.footerRight}>
        <Typography  >
          <a  className={styles.footerPhone} href="tel:+79287178883" >
          +7 (928) 717-88-83
          </a>
        </Typography>
        <Typography className={styles.footerText} >
          г. Нальчик, ул. Тарчокова, д. 135
        </Typography>

      </Grid2>
    </Box>
  );
}

export default Footer;
