// MyInput.tsx
import React from "react";
import TextField from "@mui/material/TextField";

interface MyInputProps {
  label: string;
  value: string | number;
  error?: any;
  helperText?: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Inputs: React.FC<MyInputProps> = ({
  label,
  value,
  error,
  onChange,
  helperText
}) => (
  <div>
    <TextField
      className="border-slate-900"
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      error={error}
      margin="normal"
    />
    <p className="text-red-600 ">{helperText ? helperText : "" }</p>
  </div>
);
