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
import { allUserGet, postUsers } from 'src/hooks/api/url';
import useGet from 'src/hooks/get';
import usePost from 'src/hooks/post';
import EditUserModal from '../editModal';
import useDelete from 'src/hooks/delete';

export function UserView() {
  const { userData, setUserData } = useUserAll();
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [firstname, setFirsName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lavozimi,setLavozimi] = useState('')
  const [password,setPassword] = useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const {data, error, get: getUser, isLoading} = useGet()
  const {data:usersPost ,  post: postUser} = usePost()

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);

  const openModal = () => setIsModalOpen(true);
  const editModal = () => setIsEditModal(true);
  const deleteModal = () => setIsDelete(true);
  const closeDelete = () =>{
    setIsDelete(false)
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setFirsName('');
    setLastName('');
    setPhoneNumber('');
    setPassword('');
    setLavozimi('');
  };

  const handleFormSubmit = () => {
    postUser(`${postUsers}`,{
      firstname,
      lastName,
      phoneNumber,
      password,
      lavozimi,
    })
    console.log("userrrrr",usersPost);
    closeModal();
  };

  useEffect(() => {
    getUser(`${allUserGet}?page=${currentPage}&size=${pageSize}`);
  }, [setUserData, currentPage, pageSize]);

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
        

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={userData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    userData.map((user) => user.id)
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
                {data && data.length === 0 ? (
                  <TableNoData searchQuery={filterName} />
                ) : (
                  Array.isArray(data?.object) &&
                  data?.object?.map((item: any) => (
                      <UserTableRow
                        key={item.id}
                        row={item}
                        selected={table.selected.includes(item.id)}
                        onSelectRow={() => table.onSelectRow(item.id)}
                        onDelete={() => deleteModal()}
                        onEdit={() => editModal()}
                      />
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          count={userData.length}
          page={table.page}
          onPageChange={table.onChangePage}
          rowsPerPage={table.rowsPerPage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      {/* <Modals title="Foydalanuvchi qo'shish" open={isModalOpen} onClose={closeModal}>
        <Inputs label="Ism kiriting" value={firstname} onChange={handleInputChange(setFirsName)} />
        <Inputs label="Familiya kiriting" value={lastName} onChange={handleInputChange(setLastName)} />
        <Inputs label="Telefon no'mer kiriting" value={phoneNumber} onChange={handleInputChange(setPhoneNumber)} />
        <Inputs label="Parol kiriting" value={password} onChange={handleInputChange(setPassword)} />
        <Inputs label="Lavozim kiriting" value={lavozimi} onChange={handleInputChange(setLavozimi)} />
        <Box mt={2}>
          <Button variant="contained" color="error" onClick={closeModal}>
            Bekor qilish
          </Button>
          <Button variant="contained" color="success" onClick={handleFormSubmit} sx={{ ml: 2 }}>
            Foydalanuvchi qo'shish
          </Button>
        </Box>
      </Modals> */}
      <Modals title="Foydalanuvchi o'chirish" open={isDelete} onClose={closeDelete}>
        Siz haqiqatdan ham shu foddalanuvchini tizimdan o'chirmoqchimisiz ?
        <Box mt={2}>
          <Button variant="contained" color="error" onClick={closeModal}>
            Yo'q
          </Button>
          <Button variant="contained" color="success" onClick={closeDelete} sx={{ ml: 6 }}>
            Ha 
          </Button>
        </Box>
      </Modals>
    </DashboardContent>
  );
}
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
