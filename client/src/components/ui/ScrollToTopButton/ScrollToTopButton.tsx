import React, { useState, useEffect } from 'react';
import { Box, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './scrollToTopButton.module.css';

export default function ScrollToTopButton(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = (): void => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box>
    {isVisible && (
      <Fab
        onClick={scrollToTop}
        color="primary"
        size="large"
        aria-label="scroll back to top"
        className={styles.scrollToTopButton}
      >
        <KeyboardArrowUpIcon className={styles.arrowUpIcon}/>
      </Fab>
    )}
    </Box>
  );
};
