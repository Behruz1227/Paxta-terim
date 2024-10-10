// // AddUserModal.tsx
// import React from 'react';
// import { Box, Button } from '@mui/material';
// import { Inputs } from '../../components/input/input';
// import { Modals } from '../../components/modal/modal';

// interface AddUserModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (userData: { name: string; lastName: string; phone: string; password: string; position: string; }) => void;
//   formValues: { name: string; lastName: string; phone: string; password: string; position: string; };
//   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose, onSubmit, formValues, handleInputChange }) => {
//   const handleFormSubmit = () => {
//     onSubmit(formValues);
//     onClose();
//   };

//   return (
//     <Modals
//       title="Foydalanuvchi qo'shish"
//       open={open}
//       onClose={onClose}
//     >
//       <Inputs 
//         label="Ism kiriting" 
//         value={formValues.name} 
//         onChange={handleInputChange} 
//       />
//       <Inputs 
//         label="Familiya kiriting" 
//         value={formValues.lastName} 
//         onChange={handleInputChange} 
//       />
//       <Inputs 
//         label="Telefon raqam kiriting" 
//         value={formValues.phone} 
//         onChange={handleInputChange} 
//       />
//       <Inputs 
//         label="Parol kiriting" 
//         value={formValues.password} 
//         onChange={handleInputChange} 
//       />
//       <Inputs 
//         label="Lavozim kiriting"  
//         value={formValues.position} 
//         onChange={handleInputChange} 
//       />
//       <Box mt={2}>
//         <Button variant="contained" color="error" onClick={onClose}>
//           Bekor qilish
//         </Button>
//         <Button variant="contained" color="success" onClick={handleFormSubmit} sx={{ ml: 2 }}>
//           Foydalanuvchi qo'shish
//         </Button>
//       </Box>
//     </Modals>
//   );
// };
