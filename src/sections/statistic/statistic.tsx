import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
} from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';

const tableData = [
  { district: 'Gʻuzor', available: 4, involved: 1, harvested: 5, ce220: [1, 1], johnDeere: [1, 3.5], boshiran: [14, 120], fmWorld: [2, 13], dongFeng: [2, 27] },
  { district: 'Qarshi', available: 17, involved: 15, harvested: 124, ce220: [3, 11.4], johnDeere: [3, 11], boshiran: [19, 144], fmWorld: [2, 37], dongFeng: [3, 56] },
  { district: 'Koson', available: 5, involved: 4, harvested: 133, ce220: [1, 9.1], johnDeere: [1, 3], boshiran: [11, 92], fmWorld: [2, 10], dongFeng: [2, 12] },
  { district: 'Qamashi', available: 4, involved: 4, harvested: 48, ce220: [1, 1.5], johnDeere: [2, 3], boshiran: [6, 22], fmWorld: [2, 16], dongFeng: [1, 20] },
  { district: 'Mirishkor', available: 20, involved: 14, harvested: 298, ce220: [2, 12.8], johnDeere: [3, 18], boshiran: [16, 188], fmWorld: [2, 25], dongFeng: [2, 33] },
  { district: 'Mirishkor', available: 20, involved: 14, harvested: 298, ce220: [2, 12.8], johnDeere: [3, 18], boshiran: [16, 188], fmWorld: [2, 25], dongFeng: [2, 33] },
  { district: 'Mirishkor', available: 20, involved: 14, harvested: 298, ce220: [2, 12.8], johnDeere: [3, 18], boshiran: [16, 188], fmWorld: [2, 25], dongFeng: [2, 33] },
  { district: 'Mirishkor', available: 20, involved: 14, harvested: 298, ce220: [2, 12.8], johnDeere: [3, 18], boshiran: [16, 188], fmWorld: [2, 25], dongFeng: [2, 33] },
  { district: 'Mirishkor', available: 20, involved: 14, harvested: 298, ce220: [2, 12.8], johnDeere: [3, 18], boshiran: [16, 188], fmWorld: [2, 25], dongFeng: [2, 33] },
];

const Statistic: React.FC = () => {
  return (
    <DashboardContent>
   <TableContainer component={Paper} className='p-3'>
      <Typography variant="h6" align="center" gutterBottom>
        Қашқадарё вилоятида мавсумда қатнашадиган пахта териш машиналарининг ишлаши тўғрисида
      </Typography>
      <Table 
        className='p-3'
        aria-label="cotton harvesting table"
        sx={{ borderCollapse: 'collapse' }} // Ensures lines join cleanly
      >
        <TableHead className='p-4'>
          <TableRow>
            <TableCell align="center" rowSpan={2} sx={{ border: 1 }}>Туманлар</TableCell>
            <TableCell align="center" colSpan={3} sx={{ border: 1 }}>Мавжуд сон</TableCell>
            <TableCell align="center" colSpan={2} sx={{ border: 1 }}>CE-220</TableCell>
            <TableCell align="center" colSpan={2} sx={{ border: 1 }}>John Deere</TableCell>
            <TableCell align="center" colSpan={2} sx={{ border: 1 }}>Boshiran</TableCell>
            <TableCell align="center" colSpan={2} sx={{ border: 1 }}>FM WORLD</TableCell>
            <TableCell align="center" colSpan={2} sx={{ border: 1 }}>Dong Feng</TableCell>
            <TableCell align="center" colSpan={2} sx={{ border: 1 }}>Dong Feng</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ border: 1 }}>Мавжуд сон</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Ишлаётгани</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Терилган пахта, тн</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Сон</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Бир кунда, тн</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Сон</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Бир кунда, тн</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Сон</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Бир кунда, тн</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Сон</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Бир кунда, тн</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Сон</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Бир кунда, тн</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Бир кунда, тн</TableCell>
            <TableCell align="center" sx={{ border: 1 }}>Бир кунда, тн</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='p-4'>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center" sx={{ border: 1 }}>{row.district}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.available}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.involved}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.harvested}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.ce220[0]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.ce220[1]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.johnDeere[0]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.johnDeere[1]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.boshiran[0]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.boshiran[1]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.fmWorld[0]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.fmWorld[1]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.dongFeng[0]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.dongFeng[1]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.dongFeng[0]}</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>{row.dongFeng[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </DashboardContent>
    
  );
};

export default Statistic;
