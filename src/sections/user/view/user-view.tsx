import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { Inputs } from '../../../components/input/input';
import { Modals } from '../../../components/modal/modal'; // Update the import path if necessary
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { UserProps } from '../user-table-row';
import { getAllUser } from '../../../hooks/logic/user/user';
import { useUserAll } from '../../../hooks/logic/state-managment/user';


// ----------------------------------------------------------------------

export function UserView() {
  const { userData, setUserData } = useUserAll();
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setName('');
    setLastName('');
    setPhone('');
    setPassword('');
    setPosition('');
  };
  const handleFormSubmit = () => {
    const newUser = {
      name,
      lastName,
      phone,
      password,
      position,
    };
    console.log('New User:', newUser);
    closeModal();
  };

  // const dataFiltered: UserProps[] = applyFilter({
  //   inputData: _users,
  //   comparator: getComparator(table.order, table.orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    getAllUser(setUserData)
    console.log(userData);
  }, [setUserData]);

  console.log(userData);
  

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={openModal}
        >
          New user
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Ism' },
                  { id: 'company', label: 'Familiya' },
                  { id: 'role', label: 'Telefon raqam' },
                  { id: 'isVerified', label: 'Lavozimi', align: 'center' },
                  { id: 'status', label: 'Active' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {userData.length === 0 ? (
                  <TableNoData searchQuery={filterName} /> 
                ) : (
                  userData
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((item: any, idx: number) => (
                      <UserTableRow
                        key={item.id}
                        row={item}
                        selected={table.selected.includes(item.id)}
                        onSelectRow={() => table.onSelectRow(item.id)}
                      />
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {/* <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        /> */}
      </Card>

      <Modals title="Foydalanuvchi qo'shish" open={isModalOpen} onClose={closeModal}>
        <Inputs
          label=" Ism kiriting"
          value={name}
          onChange={handleInputChange(setName)}
        />
        <Inputs
          label=" Familiya kiriting"
          value={lastName}
          onChange={handleInputChange(setLastName)}
        />
        <Inputs
          label=" Telefon no'mer kiriting"
          value={phone}
          onChange={handleInputChange(setPhone)}
        />
        <Inputs
          label="Parol kiriting"
          value={password}
          onChange={handleInputChange(setPassword)}
        />
        <Inputs
          label="Lavozim kiriting"
          value={position}
          onChange={handleInputChange(setPosition)}
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="error"
            onClick={closeModal}
          >
            Bekor qilish
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleFormSubmit}
            sx={{ ml: 2 }}
          >
            Foydalanuvchi qoshish
          </Button>
        </Box>
      </Modals>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
