import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Button, IconButton } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Modals } from 'src/components/modal/modal';
import { Inputs } from 'src/components/input/input';
import useGet from 'src/hooks/get';
import { deleteDistirctes, getDistirct } from 'src/hooks/api/url';
import useDelete from 'src/hooks/delete';

export function ProductsView() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [firstname, setFirsName] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);  
  const [selectedItem, setSelectedItem] = useState<any>(null); // Store selected item for edit

  const openModal = () => setIsModalOpen(true);
  const { data, error, get: getDistircts, isLoading } = useGet();
  const { data: deleteDs, remove: deleteDistircts } = useDelete();
  
  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalEdit(false);
    setFirsName('');
  };

  useEffect(() => {
    getDistircts(`${getDistirct}`);
  }, []);
  
  const handleFormSubmit = () => {
    console.log("Form submitted");
    closeModal();
  };

  const handleEditClick = (item: any) => {
    setSelectedItem(item);  
    setFirsName(item.name);   
    setSelectedId(item.id);   
    setIsModalEdit(true);    
  };

  const Deleted = () => {
    deleteDistircts(`${deleteDistirctes}/`, `${selectedId}?${firstname}`);
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
                <TableRow
                  key={index}
                  style={{ cursor: 'pointer' }} 
                >
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
                    <IconButton sx={{ color: 'error.main' }}>
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
            <Button variant="contained" color="success" onClick={handleFormSubmit} sx={{ ml: 2 }}>
              Saqlash
            </Button>
          </Box>
        </Modals>

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
        
      </TableContainer>
    </DashboardContent>
  );
}
