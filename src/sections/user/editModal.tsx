// EditUserModal.tsx

import React from 'react';
import { Box, Button } from '@mui/material';
import { Inputs } from '../../components/input/input';
import { Modals } from '../../components/modal/modal';

interface EditUserModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  userData: {
    name: string;
    lastName: string;
    phone: string;
    password: string;
    position: string;
  };
  onClose: () => void;
  onSubmit: (user: any) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  isEditMode,
  userData,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = React.useState(userData.name);
  const [lastName, setLastName] = React.useState(userData.lastName);
  const [phone, setPhone] = React.useState(userData.phone);
  const [password, setPassword] = React.useState(userData.password);
  const [position, setPosition] = React.useState(userData.position);

  React.useEffect(() => {
    setName(userData.name);
    setLastName(userData.lastName);
    setPhone(userData.phone);
    setPassword(userData.password);
    setPosition(userData.position);
  }, [userData]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);

  const handleFormSubmit = () => {
    const updatedUser = {
      name,
      lastName,
      phone,
      password,
      position,
    };
    onSubmit(updatedUser);
    onClose(); 
  };

  return (
    <Modals
      title={isEditMode ? 'Foydalanuvchini tahrirlash' : "Foydalanuvchi qo'shish"}
      open={isOpen}
      onClose={onClose}
    >
      <Inputs label="Ism kiriting" value={name} onChange={handleInputChange(setName)} />
      <Inputs label="Familiya kiriting" value={lastName} onChange={handleInputChange(setLastName)} />
      <Inputs label="Telefon no'mer kiriting" value={phone} onChange={handleInputChange(setPhone)} />
      <Inputs label="Parol kiriting" value={password} onChange={handleInputChange(setPassword)} />
      <Inputs label="Lavozim kiriting" value={position} onChange={handleInputChange(setPosition)} />
      <Box mt={2}>
        <Button variant="contained" color="error" onClick={onClose}>
          Bekor qilish
        </Button>
        <Button variant="contained" color="success" onClick={handleFormSubmit} sx={{ ml: 2 }}>
          {isEditMode ? 'O\'zgartirishni saqlash' : "Foydalanuvchi qo'shish"}
        </Button>
      </Box>
    </Modals>
  );
};

export default EditUserModal;
