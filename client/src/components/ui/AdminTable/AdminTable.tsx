import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { useAppDispatch } from '../../../hooks/hooks';
import { setModal } from '../../../redux/appartment/appartmentSlice';
import styles from './AdminTable.module.css';
import type { AppartmentTypeDb } from '../../../types/appartmentTypes';

type Data = {
  id: number;
  square: number;
  floor: number;
  roomsQuantity: number;
  deadline: string;
  price: number;
  reservation: boolean;
};

function createData(
  id: number,
  square: number,
  floor: number,
  roomsQuantity: number,
  deadline: string,
  price: number,
  reservation: boolean,
): Data {
  return {
    id,
    square,
    floor,
    roomsQuantity,
    deadline,
    price,
    reservation,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
type Order = 'asc' | 'desc';

const getComparator = (order: Order, orderBy: keyof Data) => 
  order === 'desc'
    ? (a: Data, b: Data) => descendingComparator(a, b, orderBy)
    : (a: Data, b: Data) => 
        orderBy === 'reservation'
          ? descendingComparator(
              { ...a, reservation: a.reservation ? 1 : 0 },
              { ...b, reservation: b.reservation ? 1 : 0 },
              orderBy
            )
          : -descendingComparator(a, b, orderBy);

type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'Номер квартиры',
  },
  {
    id: 'square',
    numeric: true,
    disablePadding: false,
    label: 'Площадь',
  },
  {
    id: 'floor',
    numeric: true,
    disablePadding: false,
    label: 'Этаж',
  },
  {
    id: 'roomsQuantity',
    numeric: true,
    disablePadding: false,
    label: 'Комнаты',
  },
  {
    id: 'deadline',
    numeric: true,
    disablePadding: false,
    label: 'Срок сдачи',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Цена за м²',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Цена',
  },
  {
    id: 'reservation',
    numeric: true,
    disablePadding: false,
    label: 'Бронь',
  },
];

type EnhancedTableProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
};

function EnhancedTableHead(props: EnhancedTableProps): React.JSX.Element {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
// Component implementation

type EnhancedTablePropsTypes = {
  appartments: AppartmentTypeDb[];
};

export default function EnhancedTable({ appartments }: EnhancedTablePropsTypes): React.JSX.Element {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useAppDispatch();

  const rows = appartments.map((el) =>
    createData(
      el?.id,
      el?.square,
      el?.floor,
      el?.roomsQuantity,
      el?.deadline,
      el?.price,
      el?.reservation,
    ),
  );

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, appartments],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper className={styles.tableContainer}>
        <TableContainer>
          <Table
            className={styles.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => void dispatch(setModal({ ...row, img: 'default_image.jpg', buildingId: 1 }))}
                    key={row?.id}
                    className={styles.tableRow}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="right"
                      className={styles.tableCell}
                    >
                      {row?.id}
                    </TableCell>
                    <TableCell align="right" className={styles.tableCell}>{row?.square}</TableCell>
                    <TableCell align="right" className={styles.tableCell}>{row?.floor}</TableCell>
                    <TableCell align="right" className={styles.tableCell}>{row?.roomsQuantity}</TableCell>
                    <TableCell align="right" className={styles.tableCell}>{row?.deadline}</TableCell>
                    <TableCell align="right" className={styles.tableCell}>{row?.price.toLocaleString()}</TableCell>
                    <TableCell align="right" className={styles.tableCell}>
                      {Math.round(row?.price * row?.square).toLocaleString()}
                    </TableCell>
                    <TableCell align="right" className={styles.tableCell}>
                      {row?.reservation ? 'Да' : 'Нет'}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={styles.tablePagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Количество строк на странице"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Изменить отступы"
      />
    </Box>
  );
}
