// MyInput.tsx
import React from 'react';
import TextField from '@mui/material/TextField';

interface MyInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Inputs: React.FC<MyInputProps> = ({ label, value, onChange }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    variant="outlined"
    fullWidth
    margin="normal"
  />
);
