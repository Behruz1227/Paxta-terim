import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import useDelete from 'src/hooks/delete';
import { useDeletes } from 'src/hooks/logic/state-managment/user';

// ----------------------------------------------------------------------

export type UserProps = {
  index:number;
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  lavozimi: string;
  avatarUrl: string;
  active: boolean;
  isVerified: boolean;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function UserTableRow({ row, selected, onSelectRow, onEdit, onDelete }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const { setId } = useDeletes()

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);



  const handleDelete = () => {
    setId(row.id)
    onDelete(row.id);

  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row">
          {row.firstName}
        </TableCell>
        <TableCell>{row.lastName}</TableCell>

        <TableCell>{row.phoneNumber}</TableCell>

        <TableCell align="center">
          {row.lavozimi ? row.lavozimi : "Lavozim yuq"}
        </TableCell>

        <TableCell>
          <Label color={row.active ? 'success' : 'error'}>
            {row.active ? 'Active' : 'Inactive'}
          </Label>
        </TableCell>

        <TableCell align="center">
          <IconButton onClick={() => onEdit(row.id)}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
          <IconButton onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
