import React, { useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
} from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import useGet from 'src/hooks/get';
import { statistic } from 'src/hooks/api/url';

const Statistic: React.FC = () => {
  const { data, error, get: getDistricts, isLoading } = useGet();

  useEffect(() => {
    getDistricts(`${statistic}?date=2024-10-12&hour=1&minute=0`);
  }, []);

  const getMachineData = (resReportCarList: any[], type: string) => {
    const machine = resReportCarList.find((machine: any) => machine.rusumi === type);
    return machine ? [machine.ishlayotgani, machine.terilganPaxtaBirKunda] : [0, 0];
  };

  return (
    <DashboardContent>
      <TableContainer component={Paper} className="p-3" sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            color: '#2c3e50',
            marginBottom: 3,
          }}
        >
          Қашқадарё вилоятида мавсумда қатнашадиган пахта териш машиналарининг ишлаши тўғрисида
        </Typography>
        <Table
          aria-label="cotton harvesting table"
          sx={{
            borderCollapse: 'collapse',
            borderRadius: '8px',
            overflow: 'hidden',
            '& th, & td': {
              padding: '8px 16px',
              borderBottom: '1px solid #ddd',
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell align="center" rowSpan={2} sx={{ border: 1, boxShadow: 2 }}>
                Туманлар
              </TableCell>
              <TableCell align="center" colSpan={3} sx={{ border: 1, boxShadow: 2 }}>
                Мавжуд сон
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2 }}>
                CE-220
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2 }}>
                John Deere
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2 }}>
                Boshiran
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2 }}>
                FM WORLD
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2 }}>
                Dong Feng
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Мавжуд сон</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Ишлаётгани</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Терилган пахта, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сон</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сон</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сон</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сон</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сон</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any, index: any) => {
              const ce220Data = getMachineData(row.resReportCarList, 'CE_220');
              const johnDeereData = getMachineData(row.resReportCarList, 'JOHN_DEERE');
              const boshiranData = getMachineData(row.resReportCarList, 'BOSHIRAN');
              const fmWorldData = getMachineData(row.resReportCarList, 'FM_WORLD');
              const dongFengData = getMachineData(row.resReportCarList, 'DONG_FENG');

              return (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(even)': {
                      backgroundColor: '#f2f2f2',
                    },
                    '&:hover': {
                      backgroundColor: '#e0f7fa',
                    },
                  }}
                >
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {row.districtName}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {row.cambaySoni}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {row.ishlayotgani}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {row.terilganPaxtaMavsumBoshidan}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {ce220Data[0]}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {ce220Data[1]}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {johnDeereData[0]}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {johnDeereData[1]}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {boshiranData[0]}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {boshiranData[1]}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {fmWorldData[0]}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {fmWorldData[1]}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {dongFengData[0]}
                  </TableCell>
                  <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                    {dongFengData[1]}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardContent>
  );
};

export default Statistic;
