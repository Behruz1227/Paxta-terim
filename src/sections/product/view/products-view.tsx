import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Button, IconButton } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Modals } from 'src/components/modal/modal';
import { Inputs } from 'src/components/input/input';
import useGet from 'src/hooks/get';
import { deleteDist, districtAdd, editDistrict, getDistirct } from 'src/hooks/api/url';
import useDelete from 'src/hooks/delete';
import usePut from 'src/hooks/put';
import usePost from 'src/hooks/post';

export function ProductsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false); 
  const [firstname, setFirsName] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openModal = () => setIsModalOpen(true);
  const { data, error, get: getDistircts, isLoading } = useGet();
  const { data: deleteDs, remove: deleteDistircts } = useDelete();
  const {data:edited,put:edites} = usePut();
  const {data:addDis,post:addDisk} = usePost();

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalEdit(false);
    setIsModalDelete(false); 
    setFirsName('');
  };

  useEffect(() => {
    getDistircts(`${getDistirct}`);
  }, []);

  const postDiskt = async () => {
     addDisk(`${districtAdd}?district=${firstname}`, `?district=${firstname}`);
      console.log(addDis);
      closeModal(); 
  };
  const del = () => {
    deleteDistircts(`${deleteDist}/`, `${selectedId}`)
    console.log("data", deleteDs);
    closeModal()
  }


 


  const handleFormSubmit = () => {
    if (selectedId) {
      const requestData = {
        district: firstname, 
        selectedId
      };
      console.log(`Editing district with ID: ${selectedId}`, requestData);
      edites(`${editDistrict}`, `${selectedId}?district=${firstname}`, '');
    }
    
    closeModal();
  };
  

  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setFirsName(item.name);
    setSelectedId(item.id);
    setIsModalEdit(true);
  };

  const handleDeleteClick = (item: any) => {
    setSelectedItem(item);
    setSelectedId(item.id);
    setIsModalDelete(true); 
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Tumanlar
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={openModal}
        >
          Tuman qo'shish
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">T/r</TableCell>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((item: any, index: number) => (
                <TableRow key={index} style={{ cursor: 'pointer' }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <Typography variant="h6" fontWeight="bold">
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEditClick(item)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                    <IconButton sx={{ color: 'error.main' }} onClick={() => handleDeleteClick(item)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">No districts found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Modal for Adding a New District */}
        <Modals title="Tuman qo'shish" open={isModalOpen} onClose={closeModal}>
          <Inputs label="Tuman nomini kiriting" value={firstname} onChange={e => setFirsName(e.target.value)} />
          <Box mt={2}>
            <Button variant="contained" color="error" onClick={closeModal}>
              Bekor qilish
            </Button>
            <Button variant="contained" color="success" onClick={postDiskt} sx={{ ml: 2 }}>
              Saqlash
            </Button>
          </Box>
        </Modals>

        {/* Modal for Editing a District */}
        <Modals title="Tuman o'zgartirish" open={isModalEdit} onClose={closeModal}>
          <Inputs label="Tuman nomini kiriting" value={firstname} onChange={e => setFirsName(e.target.value)} />
          <Box mt={2}>
            <Button variant="contained" color="error" onClick={closeModal}>
              Bekor qilish
            </Button>
            <Button variant="contained" color="success" onClick={handleFormSubmit} sx={{ ml: 2 }}>
              Saqlash
            </Button>
          </Box>
        </Modals>

        {/* Modal for Delete Confirmation */}
        <Modals title="O'chirish tasdiqlash" open={isModalDelete} onClose={closeModal}>
          <Typography>O'chirishni tasdiqlaysizmi?</Typography>
          <Box mt={2}>
            <Button variant="contained" color="error" onClick={closeModal}>
            Bekor qilish
            </Button>
            <Button variant="contained" color="primary" onClick={del} sx={{ ml: 2 }}>
            O'chirish
            </Button>
          </Box>
        </Modals>
        
      </TableContainer>
    </DashboardContent>
  );
}
