// // UserTableRow.tsx

// import { TableRow, TableCell } from '@mui/material';

// type UserTableRowProps = {
//   row: {
//     district: string;
//     farmName: string;
//     ownerFullName: string;
//     ownerPhoneNumber: string;
//     machineId: string;
//     machineModel: string;
//     year: number;
//     firstName: string;
//     lastName: string;
//     lavozimi: string;
//     phoneNumber: string;
//   };
//   selected: boolean;
//   onSelectRow: () => void;
// };

// export const MachineTableRow: React.FC<UserTableRowProps> = ({ row, selected, onSelectRow }) => {
//   return (
//     <TableRow hover selected={selected} onClick={onSelectRow}>
//       <TableCell>{row.district}</TableCell>
//       <TableCell>{row.farmName}</TableCell>
//       <TableCell>{row.ownerFullName}</TableCell>
//       <TableCell>{row.ownerPhoneNumber}</TableCell>
//       <TableCell>{row.machineId}</TableCell>
//       <TableCell>{row.machineModel}</TableCell>
//       <TableCell>{row.year}</TableCell>
//       <TableCell>{row.firstName}</TableCell>
//       <TableCell>{row.lastName}</TableCell>
//       <TableCell>{row.lavozimi}</TableCell>
//       <TableCell>{row.phoneNumber}</TableCell>
//       {/* Add any action buttons or other elements in this row if needed */}
//     </TableRow>
//   );
// };
