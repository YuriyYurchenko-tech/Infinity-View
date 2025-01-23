import type { SxProps } from '@mui/material';

const styles = {
  root: {
    width: '100%',
  } as SxProps,

  paper: {
    width: '100%',
    marginBottom: 2,
    maxHeight: '68vh',
    overflowY: 'auto',
  } as SxProps,

  table: {
    minWidth: 750,
  } as SxProps,

  tableRow: {
    cursor: 'pointer',
  } as SxProps,

  denseTableRow: (isDense: boolean, emptyRows: number) => ({
    height: (isDense ? 33 : 53) * emptyRows,
  }) as SxProps,

  labelRowsPerPage: {
    rowsPerPageOptions: [5, 10, 25],
    component: 'div',
  } as SxProps,
};

export default styles